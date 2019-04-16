import * as React from 'react'
import styles from './index.module.scss'
import classname from 'classname'

interface IProps {
    content?: IChatStore.ImessageItem
    createdAt?: string
}

const MessageItem = ({ content, createdAt }: IProps) => {
    const { from_user_id, message } = content
    const userInfoString = localStorage.getItem('chatroom_user_info')
    const { id } = JSON.parse(userInfoString)
    const isSelf = from_user_id === id
    return (
        <div
            className={classname(styles.wrapper, {
                [styles.self]: isSelf
            })}
        >
            <div className={styles.item}>
                <div />
                <div>
                    <div className={styles.message}>{message}</div>
                    <div className={styles.arrows} />
                </div>
            </div>
        </div>
    )
}

export default MessageItem
