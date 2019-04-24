import React, { useEffect, useRef } from 'react'
import { inject } from 'mobx-react'
import classname from 'classname'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'

import styles from './index.module.scss'

interface IStoreProps {
    chatStore?: IChatStore.ChatStore
}

function ChatList({ chatStore }: IStoreProps) {
    const {
        save,
        fetchChatList,
        fetchHistoryList,
        chatList,
        onSelectChat,
        currentChatId
    } = chatStore

    async function fetchChatAndMessageList() {
        const data = await fetchChatList()
        save({
            currentChatId: get(data, '[0].id')
        })
        // 获取历史消息
        fetchHistoryList()
    }

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
    ({ chatStore }: IAllStore): IStoreProps => {
        return {
            chatStore
        }
    }
)(observer(ChatList))
