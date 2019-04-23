import React from 'react'
import { inject, observer } from 'mobx-react'
import { Icon } from 'antd'

import styles from './index.module.scss'

function Sider({ userStore }: IAllStore) {
    const {
        userInfo: { username }
    } = userStore
    return (
        <div className={styles.sider}>
            <div className={styles.top}>{username}</div>
            <div className={styles.bottom}>
                <Icon
                    type="poweroff"
                    className={styles.icon}
                    onClick={() => userStore.logout()}
                />
            </div>
        </div>
    )
}

export default inject(
    ({ userStore }: IAllStore): IAllStore => {
        return {
            userStore
        }
    }
)(observer(Sider))
