import React, { Component } from 'react'

import ChatPanel from '../ChatPanel'
import ChatList from '../ChatList'
import styles from './index.module.scss'

class App extends Component {
    componentDidMount() {
        const key = 'chatroom_user_info'
        // 先直接把用户信息存到localStorage
        const userInfo = localStorage.getItem(key)
        if (!userInfo) {
            const mockUserInfo = {
                id: 1,
            }
            localStorage.setItem(key, JSON.stringify(mockUserInfo))
        }
    }
    render() {
        return (
            <div className={styles.bg}>
                <div className={styles.app}>
                    <div className={styles.layout}>
                        <div className={styles.sider}/>
                        <ChatList/>
                        <ChatPanel />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
