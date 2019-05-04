import React from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'
import { Icon } from 'antd'

import styles from './index.module.scss'

function Header({ chatStore, globalStore }: IAllStore) {
    const { currentChatItem } = chatStore
    const { setOnlineListVisible } = globalStore
    const title = get(currentChatItem, 'name')
    return (
        <header className={styles.header}>
            <div>{title}</div>
            <Icon
                onClick={() => setOnlineListVisible(true)}
                className={styles.icon}
                theme="filled"
                type="appstore"
            />
        </header>
    )
}

export default inject(
    ({ chatStore, globalStore }: IAllStore): IAllStore => {
        return {
            chatStore,
            globalStore
        }
    }
)(observer(Header))
