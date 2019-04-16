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
        const userInfoString = localStorage.getItem('chatroom_user_info')
        const { id } = JSON.parse(userInfoString)
        const { store } = this.props
        if (e.keyCode === 13) {
            e.preventDefault()
            socket.emit('sendMsg', {
                message: store.inputValue,
                from_user_id: id,
                to_group_id: store.currentChatId
            })
            store.save({
                inputValue: ''
            })
        }
    }

    handleInputChange = (value: string) => {
        this.props.store.save({
            inputValue: value
        })
    }

    render() {
        const {
            store: { messageList, inputValue }
        } = this.props
        return (
            <div className={styles.chatPanel}>
                <div className={styles.content}>
                    {messageList &&
                        messageList.map(item => {
                            const { id } = item
                            return (
                                <MessageItem
                                    key={id}
                                    content={item}
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
