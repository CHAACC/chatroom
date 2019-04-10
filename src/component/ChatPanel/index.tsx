import * as React from 'react'
import { observer, inject } from 'mobx-react'

import styles from './index.module.scss'
import io from '../../service/websocket'
import Editor from './Editor'
const socket = io()
import MessageItem from './MessageItem'

interface IStoreProps {
    store?: IChatStore.ChatStore
}

@inject(
    ({ chatStore }): IStoreProps => {
        return {
            store: chatStore
        }
    }
)
@observer
class ChatPanel extends React.Component<IStoreProps> {
    state = {
        inputValue: ''
    }
    componentDidMount() {
        const {
            store: { pushMessage }
        } = this.props
        // 监听broadcast事件， 获取 服务器 消息
        socket.on('broadcast', (message: IChatStore.ImessageItem) => {
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
        const {
            store: { messageList }
        } = this.props
        const { inputValue } = this.state
        return (
            <div className={styles.chatPanel}>
                <div className={styles.content}>
                    {messageList &&
                        messageList.map(item => {
                            const { id, message } = item
                            return (
                                <MessageItem
                                    key={id}
                                    message={message}
                                />
                            )
                        })}
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
