import socketIO from 'socket.io-client'
import { message } from 'antd'

import * as store from '../store/index'
import { formatTime } from '../utils/time'

const SOCKETURL = 'http://127.0.0.1:7001/'

// 稍微封装一下socket.io， 然后暴露出去。
function socket() {
    const io = socketIO(`${SOCKETURL}?token=${localStorage.getItem('token')}`)
    io.on('connect', function() {
        message.success('socket连接成功,可接收默认群消息')
    })
    io.on('disconnect', function() {
        message.warning('socket断开连接')
    })
    io.on('error', err => {
        message.error(err)
    })
    io.on('warn', (msg: string) => {
        message.warning(msg)
    })
    io.on('auth', data => {
        const { login, userInfo = {} } = data
        store.userStore.setLoginStatus(login)
        store.userStore.setUserInfo(userInfo)
    })
    io.on('message', (msgItem: IChatStore.ImessageItem) => {
        const {
            pushMessage,
            currentChatId,
            setScrollBottomFlag,
            setChatList
        } = store.chatStore
        const { to_group_id, from_user_id, username, message: msg } = msgItem
        if (to_group_id === currentChatId) {
            // 当前会话，更新消息列表
            pushMessage({
                ...msgItem,
                created_at: formatTime(msgItem.created_at)
            })
            // 滚动置底
            setScrollBottomFlag()
        }
        // 更新左侧会话列表最新消息
        setChatList(to_group_id, {
            lastest_message_info: {
                from_user_id,
                from_user_name: username,
                last_message: msg
            }
        })
    })
    io.on('group_online_members', ({ list, group_id }) => {
        const { currentChatId } = store.chatStore
        if (group_id === currentChatId) {
            store.globalStore.setOnlineList(list)
        }
    })
    return io
}

export default socket
