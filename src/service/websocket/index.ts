import socketIO from 'socket.io-client'
import * as store from '../../store/index'
import { message } from 'antd'

const SOCKETURL = 'http://127.0.0.1:7001/'
// 稍微封装一下socket.io， 然后暴露出去。
const socket = function() {
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
    io.on('message', (msg: IChatStore.ImessageItem) => {
        store.chatStore.pushMessage(msg)
    })
    return io
}

export default socket
