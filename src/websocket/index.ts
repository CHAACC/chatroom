import socketIO from 'socket.io-client'
import { message } from 'antd'
import moment from 'moment'

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
            setChatMsgInfo,
            setChatUnreadCount
        } = store.chatStore
        const { userInfo } = store.userStore
        const {
            is_private,
            to_user_id,
            to_group_id,
            from_user_id,
            username,
            message: msg
        } = msgItem
        // 私聊自己也会收到消息
        const tempId =
            is_private === 0
                ? to_group_id
                : from_user_id === userInfo.id
                ? to_user_id
                : from_user_id
        if (tempId === currentChatId) {
            // 当前会话，更新消息列表
            pushMessage({
                ...msgItem,
                created_at: formatTime(msgItem.created_at)
            })
            // 滚动置底
            setScrollBottomFlag()
        } else {
            setChatUnreadCount(tempId)
        }
        // 更新左侧会话列表最新消息
        setChatMsgInfo(tempId, {
            from_user_id,
            from_user_name: username,
            last_message: msg,
            created_at: moment().format()
        })
    })

    io.on('group_online_members', ({ onlineList, offlineList, group_id }) => {
        const { currentChatId } = store.chatStore
        if (group_id === currentChatId) {
            store.globalStore.setOnlineList(onlineList)
            store.globalStore.setOfflineList(offlineList)
        }
    })
    return io
}

export default socket
