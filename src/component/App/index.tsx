import React, { Component } from 'react'

import ChatPanel from '../ChatPanel'
import styles from './index.module.scss'

class App extends Component {
    render() {
        return (
            <div className={styles.bg}>
                <div className={styles.app}>
                    <div className={styles.layout}>
                        <aside />
                        <ChatPanel />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
