import React, { useEffect } from 'react'
import { inject } from 'mobx-react'
import classname from 'classname'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import SearchHeader from './SearchHeader'

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
    return (
        <div className={styles.chatList}>
            {isLogin && <SearchHeader />}
            {groups.map(item => {
                const {
                    to_group_id,
                    name,
                    lastest_message_info: { from_user_name, last_message }
                } = item
                return (
                    <div
                        key={to_group_id}
                        onClick={() => onSelectChat(to_group_id, 0)}
                        className={classname(styles.chatItem, {
                            [styles.current]: currentChatId === to_group_id
                        })}
                    >
                        <div />
                        <div>
                            <span>{name}</span>
                            <span>
                                {from_user_name}：{last_message}
                            </span>
                        </div>
                    </div>
                )
            })}
            {friends &&
                friends.map(item => {
                    const {
                        id,
                        avatar,
                        name,
                        lastest_message_info: { last_message }
                    } = item
                    return (
                        <div
                            key={id}
                            onClick={() => onSelectChat(id, 1)}
                            className={classname(styles.chatItem, {
                                [styles.current]: currentChatId === id
                            })}
                        >
                            <div className={styles.avatar}>
                                <img src={avatar} alt="头像" />
                            </div>
                            <div>
                                <span>{name}</span>
                                <span>{last_message}</span>
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
