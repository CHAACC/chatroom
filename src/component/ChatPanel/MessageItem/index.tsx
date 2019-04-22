import * as React from 'react'
import styles from './index.module.scss'
import classname from 'classname'

interface IProps {
    content?: IChatStore.ImessageItem
    currentUserId?: number
}

const MessageItem = ({ content, currentUserId }: IProps) => {
    const { from_user_id, message, username, created_at } = content
    const isSelf = from_user_id === currentUserId
    return (
        <div
            className={classname(styles.wrapper, {
                [styles.self]: isSelf
            })}
        >
            <div className={styles.item}>
                <div className={styles.avatar} />
                <div className={styles.right}>
                    <div className={styles.nicknameTime}>
                        <span className={styles.nickname}>{username}</span>
                        <span className={styles.createdAt}>{created_at}</span>
                    </div>
                    <div className={styles.message}>{message}</div>
                    <div className={styles.arrows} />
                </div>
            </div>
        </div>
    )
}

export default MessageItem
