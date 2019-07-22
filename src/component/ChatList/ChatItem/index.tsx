import React from 'react'
import classname from 'classname'
import { get } from 'lodash'

import styles from './index.module.scss'
import { formatChatTime } from '../../../utils/time'
import { QN_DOMAIN } from '../../../constants'

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

    return (
        <div
            onClick={() => onSelectChat(type === 0 ? to_group_id : id, type)}
            className={classname(styles.chatItem, {
                [styles.current]:
                    currentChatId === to_group_id || currentChatId === id
            })}
        >
            <div className={styles.avatar}>
                {avatar && <img src={`${QN_DOMAIN}/${avatar}`} alt="头像" />}
            </div>
            <div className={styles.center}>
                <span>{name}</span>
                {lastest_message_info && (
                    <span>
                        {type === 0 && (
                            <span>
                                {get(lastest_message_info, 'from_user_name')}：
                            </span>
                        )}
                        {get(lastest_message_info, 'last_message')}
                    </span>
                )}
            </div>
            <div className={styles.right}>
                <span>
                    {formatChatTime(get(lastest_message_info, 'created_at'))}
                </span>
                {unread > 0 && <span>{unread}</span>}
            </div>
        </div>
    )
}

export default ChatItem
