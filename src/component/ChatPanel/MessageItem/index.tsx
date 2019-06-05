import * as React from 'react'
import styles from './index.module.scss'
import classname from 'classname'
import { SERVER_URL } from '../../../constants'
import { observer } from 'mobx-react-lite'
import ReactHtmlParser from 'react-html-parser'

import { convertExpression } from '../../../utils/emoji'
import { QN_DOMAIN } from '../../../constants'
import { MessageType } from './message-type'

interface IProps {
    content?: IChatStore.ImessageItem
    currentUserId?: number
    userInfo?: IUserStore.IUserInfo
    onClickImg?: (url: string) => void
    joinGroup?: (groupName: string) => void
}

const MessageItem = ({
    content,
    currentUserId,
    userInfo,
    onClickImg,
    joinGroup
}: IProps) => {
    const {
        from_user_id,
        message,
        username,
        created_at,
        avatar,
        type,
        url
    } = content
    const isSelf = from_user_id === currentUserId
    const renderMainContent = () => {
        switch (type) {
            case MessageType.TEXT:
                if (message.startsWith('invite:')) {
                    const groupName = message.slice(8)
                    return (
                        <div>
                            邀请你
                            <span
                                onClick={() => joinGroup(groupName)}
                                style={{
                                    cursor: 'pointer',
                                    color: 'rgba(74, 144, 226, .7)'
                                }}
                            >
                                加入
                            </span>
                            群组「
                            <span style={{ color: 'blue' }}>{groupName}</span>」
                        </div>
                    )
                }
                return ReactHtmlParser(convertExpression(message))
            case MessageType.IMAGE:
                return (
                    <div
                        className={styles.imgWrapper}
                        key={url}
                        onClick={() => onClickImg(`//${QN_DOMAIN}/${url}`)}
                    >
                        <img src={`//${QN_DOMAIN}/${url}`} />
                    </div>
                )
        }
    }
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
                    <div className={styles.message}>{renderMainContent()}</div>

                    <div className={styles.arrows} />
                </div>
            </div>
        </div>
    )
}

export default observer(MessageItem)
