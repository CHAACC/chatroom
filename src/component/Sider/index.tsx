import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { Icon } from 'antd'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import { SERVER_URL } from '../../constants'
import UserInfoSetting from '../UserInfoSetting'

function Sider({ userStore }: IAllStore) {
    const [modalVisible, setModalVisible] = useState(false)
    const {
        userInfo,
        userInfo: { username, avatar },
        isLogin,
        setUserAvatar,
        updateUserInfo
    } = userStore

    return (
        <div className={styles.sider}>
            {isLogin && (
                <div
                    onClick={() => setModalVisible(true)}
                    className={styles.avartar}
                    style={{
                        backgroundImage: avatar && `url(${SERVER_URL}${avatar})`
                    }}
                />
            )}
            {isLogin && (
                <div className={styles.bottom}>
                    <Icon
                        type="github"
                        className={styles.icon}
                        onClick={() =>
                            window.open('https://github.com/dyshh/chatroom')
                        }
                    />
                    <Icon
                        type="poweroff"
                        className={styles.icon}
                        onClick={() => userStore.logout()}
                    />
                </div>
            )}

            <UserInfoSetting
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                userInfo={userInfo}
                handleUploadDone={setUserAvatar}
                updateUserInfo={updateUserInfo}
            />
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
