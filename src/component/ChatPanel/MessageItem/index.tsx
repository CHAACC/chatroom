import * as React from 'react'
import styles from './index.module.scss'
import classname from 'classname'
import { SERVER_URL } from '../../../constants'
import { observer } from 'mobx-react-lite'

interface IProps {
    content?: IChatStore.ImessageItem
    currentUserId?: number
    userInfo?: IUserStore.IUserInfo
}

const MessageItem = ({ content, currentUserId, userInfo }: IProps) => {
    const { from_user_id, message, username, created_at, avatar } = content
    const isSelf = from_user_id === currentUserId
    return (
        <div
            className={classname(styles.wrapper, {
                [styles.self]: isSelf
            })}
        >
            <div className={styles.item}>
                <div
                    className={styles.avatar}
                    style={{
                        backgroundImage:
                            (userInfo.avatar || avatar) &&
                            `url(${SERVER_URL}${
                                isSelf ? userInfo.avatar : avatar
                            })`
                    }}
                />
                <div className={styles.right}>
                    <div className={styles.nicknameTime}>
                        <span className={styles.nickname}>
                            {isSelf ? userInfo.username : username}
                        </span>
                        <span className={styles.createdAt}>{created_at}</span>
                    </div>
                    <div className={styles.message}>{message}</div>
                    <div className={styles.arrows} />
                </div>
            </div>
        </div>
    )
}

export default observer(MessageItem)
