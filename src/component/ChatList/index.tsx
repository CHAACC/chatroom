import React, { useEffect } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import SearchHeader from './SearchHeader'
import ChatItem from './ChatItem'

function ChatList({ chatStore, userStore }: IAllStore) {
    const {
        groups,
        friends,
        onSelectChat,
        currentChatId,
        fetchChatListAndFirstMessageList
    } = chatStore
    const { isLogin } = userStore

    useEffect(() => {
        fetchChatListAndFirstMessageList()
    }, [])
    const chatList = [...groups, ...friends]
    return (
        <div className={styles.chatList}>
            {isLogin && <SearchHeader />}
            {chatList.map(item => {
                return (
                    <ChatItem
                        onSelectChat={onSelectChat}
                        currentChatId={currentChatId}
                        key={item.to_group_id || item.id}
                        item={item}
                    />
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
