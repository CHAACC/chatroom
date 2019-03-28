import * as React from 'react'
import { observer, inject } from 'mobx-react'

import styles from './index.module.scss'
import io from '../../service/websocket'
import Editor from './Editor'
const socket = io()

@inject(
    ({ chatStore }): IChat.IStoreProps => {
        const { messageList, pushMessage } = chatStore
        return { messageList, pushMessage }
    }
)
@observer
class ChatPanel extends React.Component<IChat.IStoreProps> {
    state = {
        inputValue: ''
    }
    componentDidMount() {
        // 监听broadcast事件， 获取 服务器 消息
        socket.on('broadcast', (message) => {
            const { pushMessage } = this.props
            if (pushMessage) {
                pushMessage(message)
            }
        })
    }

    sendMsg = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            socket.emit('sendMsg', this.state.inputValue)
            this.setState({
                inputValue: ''
            })
        }
    }

    handleInputChange = (value: string) => {
        this.setState({
            inputValue: value
        })
    }

    render() {
        const { messageList } = this.props
        const { inputValue } = this.state
        return (
            <div className={styles.chatPanel}>
                <div className={styles.content}>
                    {messageList &&
                        messageList.map(item => (
                            <div key={item.message_id}>{item.message}</div>
                        ))}
                </div>
                <div className={styles.editor}>
                    <Editor
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onKeyDown={this.sendMsg}
                    />
                </div>
            </div>
        )
    }
}

export default ChatPanel
