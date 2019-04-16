import * as React from 'react'
import { inject, observer } from 'mobx-react'
import classname from 'classname'
import uuid from 'uuid'

import styles from './index.module.scss'

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
export default class ChatList extends React.Component<IStoreProps> {
    async componentDidMount() {
        const { store } = this.props
        const userInfoString = localStorage.getItem('chatroom_user_info')
        const { id } = JSON.parse(userInfoString)
        await store.fetchChatList(id)
        store.save({
            currentChatId: store.chatList[0].id
        })
        // 获取历史消息
        store.fetchHistoryList()
    }
    render() {
        const {
            store: { chatList, changeCurrentChatId, currentChatId, lastMessage }
        } = this.props
        return (
            <div className={styles.chatList}>
                {chatList.map(item => {
                    const { id, name } = item
                    return (
                        <div
                            key={id || uuid()}
                            onClick={() => changeCurrentChatId(id)}
                            className={classname(styles.chatItem, {
                                [styles.current]: currentChatId === id
                            })}
                        >
                            <div />
                            <div>
                                <span>{name}</span>
                                <span>{lastMessage}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
