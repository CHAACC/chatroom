import * as React from 'react'
import { observer, inject } from 'mobx-react'

import styles from './index.module.scss'
import Editor from './Editor'
import MessageItem from './MessageItem'

interface IStoreProps {
    store?: IChatStore.ChatStore
}

@inject(
    ({ chatStore }: IAllStore): IStoreProps => {
        return {
            store: chatStore
        }
    }
)
@observer
class ChatPanel extends React.Component<IStoreProps> {
    componentDidMount() {
        setTimeout(() => {
            this.listWrapper.children[
                this.listWrapper.children.length - 1
            ].scrollIntoView()
        }, 100)
    }

    listWrapper

    sendMsg = e => {
        const userInfoString = localStorage.getItem('chatroom_user_info')
        const { id } = JSON.parse(userInfoString)
        const { store } = this.props
        if (e.keyCode === 13) {
            e.preventDefault()
            window.socket.emit('sendMsg', {
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
                <div
                    className={styles.content}
                    ref={ref => (this.listWrapper = ref)}
                >
                    {messageList &&
                        messageList.map(item => {
                            const { id } = item
                            return <MessageItem key={id} content={item} />
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
