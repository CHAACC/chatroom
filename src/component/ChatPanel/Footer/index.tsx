import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import Login from '../../Login'

function Footer({ userStore }: IAllStore) {
    const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false)
    return (
        <footer className={styles.footer}>
            游客朋友你好，请
            <b onClick={() => setLoginModalVisible(true)}>登录</b>后参与聊天
            <Login
                visible={loginModalVisible}
                onClose={() => setLoginModalVisible(false)}
            />
        </footer>
    )
}

export default inject(
    ({ userStore }: IAllStore): IAllStore => {
        return {
            userStore
        }
    }
)(observer(Footer))
