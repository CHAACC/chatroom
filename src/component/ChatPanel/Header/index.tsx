import React from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get } from 'lodash'

import styles from './index.module.scss'

function Header({ chatStore }: IAllStore) {
    const { currentChatItem } = chatStore
    const title = get(currentChatItem, 'name')
    return (
        <header className={styles.header}>
            <div>{title}</div>
        </header>
    )
}

export default inject(
    ({ chatStore }: IAllStore): IAllStore => {
        return {
            chatStore
        }
    }
)(observer(Header))
