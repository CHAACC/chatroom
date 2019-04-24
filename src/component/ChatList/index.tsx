import React, { useEffect, useRef } from 'react'
import { inject } from 'mobx-react'
import classname from 'classname'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'

import styles from './index.module.scss'

function ChatList({ chatStore, userStore }: IAllStore) {
    const {
        save,
        fetchChatList,
        fetchHistoryList,
        chatList,
        onSelectChat,
        currentChatId,
        fetchChatAndMessageList
    } = chatStore
    const { isLogin } = userStore

    useEffect(() => {
        fetchChatAndMessageList()
    }, [])

    return (
        <div className={styles.chatList}>
            {chatList.map(item => {
                const { id, name } = item
                return (
                    <div
                        key={id}
                        onClick={() => onSelectChat(id)}
                        className={classname(styles.chatItem, {
                            [styles.current]: currentChatId === id
                        })}
                    >
                        <div />
                        <div>
                            <span>{name}</span>
                            <span>{item.last_message}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default inject(
    ({ chatStore, userStore }: IAllStore): IAllStore => {
        return {
            chatStore,
            userStore
        }
    }
)(observer(ChatList))
