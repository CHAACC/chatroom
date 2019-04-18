import io from 'socket.io-client'
// 稍微封装一下socket.io， 然后暴露出去。
const socket = function() {
    const _io = io('http://127.0.0.1:7001/')
    _io.on('connect', function() {
        console.log('连接成功')
    })
    _io.on('disconnect', function() {
        console.log('断开连级')
    })
    _io.on('online', (msg: string) => {
        console.log(msg)
    })
    return _io
}

export default socket
