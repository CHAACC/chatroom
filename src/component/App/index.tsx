import React, { useEffect } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import ChatPanel from '../ChatPanel'
import ChatList from '../ChatList'
import styles from './index.module.scss'
import io from '../../service/websocket'

declare global {
    interface Window {
        socket: any
    }
}

function App({ chatStore }: IAllStore) {

    useEffect(() => {
        init()
    }, [])

    function init() {
        // 挂载到window
        window.socket = io()
        // 先直接把用户信息存到localStorage
        const key = 'chatroom_user_info'
        const userInfo = localStorage.getItem(key)
        const mockUserInfo = {
            id: 1
        }
        if (!userInfo) {
            localStorage.setItem(key, JSON.stringify(mockUserInfo))
        }
        // 初始化socket信息
        window.socket.emit('init_socket', mockUserInfo.id)
        // 监听broadcast事件， 获取 服务器 消息
        const { pushMessage } = chatStore
        window.socket.on('broadcast', (message: IChatStore.ImessageItem) => {
            if (pushMessage) {
                pushMessage(message)
            }
        })
    }
    return (
        <div className={styles.bg}>
            <div className={styles.app}>
                <div className={styles.layout}>
                    <div className={styles.sider} />
                    <ChatList />
                    <ChatPanel />
                </div>
            </div>
        </div>
    )
}

export default inject(
    ({ chatStore }: IAllStore): IAllStore => {
        return {
            chatStore
        }
    }
)(observer(App))
