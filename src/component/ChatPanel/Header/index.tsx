import React, { useRef } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'
import { Icon, message } from 'antd'
import Clipboard from 'clipboard'

import styles from './index.module.scss'

function Header({ chatStore, globalStore, userStore }: IAllStore) {
    useRef(new Clipboard('#share-icon'))
    const { currentChatItem, currentChatType } = chatStore
    const { setOnlineListVisible } = globalStore
    const { isLogin } = userStore
    const title = get(currentChatItem, 'name')

    return (
        <header className={styles.header}>
            <div className={styles.title}>{title}</div>
            {isLogin && currentChatType === 0 && (
                <div className={styles.right}>
                    <span
                        id="share-icon"
                        data-clipboard-text={`invite: ${title}`}
                        onClick={() =>
                            message.success('复制成功，快去粘贴邀请好友进群吧')
                        }
                    >
                        <Icon className={styles.icon} type="share-alt" />
                    </span>
                    <Icon
                        onClick={e => {
                            e.stopPropagation()
                            setOnlineListVisible(true)
                        }}
                        className={styles.icon}
                        theme="filled"
                        type="appstore"
                    />
                </div>
            )}
        </header>
    )
}

export default inject(
    ({ chatStore, globalStore, userStore }: IAllStore): IAllStore => {
        return {
            chatStore,
            globalStore,
            userStore
        }
    }
)(observer(Header))
