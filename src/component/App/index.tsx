import React, { Component } from 'react'
import io from '../../service/websocket'

import './index.scss'
const socket = io()

class App extends Component {
    sendMsg = (msg: string) => {
        socket.emit('sendMsg', msg)
    }
    componentDidMount() {
        // 监听online事件
        // socket.on('online', data => {
        //     this.msgList.push(data)
        // })
        // 监听broadcast事件， 获取 服务器 消息
        socket.on('broadcast', (data: any) => {
            // this.msgList.push(data)
            console.log(data)
        })
    }

    render() {
        return (
            <div className="app">
                <div className="layout">
                    <aside>侧边栏</aside>
                    <div className="content">内容</div>
                </div>
            </div>
        )
    }
}

export default App
