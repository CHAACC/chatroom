import React from 'react'
import classname from 'classname'

import styles from './index.module.scss'
import { formatChatTime } from '../../../utils/time'

interface IChatItem {
    item: IChatStore.IChat
    currentChatId: string | number
    onSelectChat: (id: number | string, type: number) => void
}

function ChatItem({ item, onSelectChat, currentChatId }: IChatItem) {
    const {
        type,
        id,
        avatar,
        to_group_id,
        name,
        lastest_message_info,
        unread
    } = item
    const { from_user_name, last_message, created_at } = lastest_message_info
    return (
        <div
            onClick={() => onSelectChat(type === 0 ? to_group_id : id, type)}
            className={classname(styles.chatItem, {
                [styles.current]:
                    currentChatId === to_group_id || currentChatId === id
            })}
        >
            <div className={styles.avatar}>
                {type === 1 && <img src={avatar} alt="头像" />}
            </div>
            <div className={styles.center}>
                <span>{name}</span>
                {lastest_message_info && (
                    <span>
                        {type === 0 && <span>{from_user_name}：</span>}
                        {last_message}
                    </span>
                )}
            </div>
            <div className={styles.right}>
                <span>{formatChatTime(created_at)}</span>
                {unread > 0 && <span>{unread}</span>}
            </div>
        </div>
    )
}

export default ChatItem
