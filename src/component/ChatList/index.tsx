import React, { useEffect } from 'react'
import { inject } from 'mobx-react'
import classname from 'classname'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'

import styles from './index.module.scss'

function ChatList({ chatStore }: IAllStore) {
    const {
        chatList,
        onSelectChat,
        currentChatId,
        fetchChatListAndFirstMessageList
    } = chatStore

    useEffect(() => {
        fetchChatListAndFirstMessageList()
    }, [])

    return (
        <div className={styles.chatList}>
            {chatList.map(item => {
                const {
                    id,
                    name,
                    lastest_message_info: { from_user_name, last_message }
                } = item
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
                            <span>
                                {from_user_name}:{last_message}
                            </span>
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
