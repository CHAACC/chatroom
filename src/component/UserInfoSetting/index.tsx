import React, { useState } from 'react'
import { Row, Button, Input } from 'antd'

import styles from './index.module.scss'
import Modal from '../Modal'
import UploadAvatar from '../UploadAvatar'

interface IProps {
    visible?: boolean
    onClose?: () => void
    userInfo?: IUserStore.IUserInfo
    updateUserInfo?: (params: IUserStore.IUpdateUserInfoParams) => void
}

function UserInfoSetting({
    visible,
    onClose,
    userInfo: { avatar, id },
    updateUserInfo
}: IProps) {
    const [username, setUsername] = useState('')
    const [oldpsw, setOldPsw] = useState('')
    const [newpsw, setNewpsw] = useState('')
    return (
        <Modal visible={visible} onClose={onClose}>
            <div className={styles.userInfoSetting}>
                <Row>
                    <h4>修改头像</h4>
                    <div>
                        <UploadAvatar
                            avatar={avatar}
                            userId={id}
                            handleUploadDone={(url: string) =>
                                updateUserInfo({ avatar: url })
                            }
                        />
                    </div>
                </Row>
                <Row>
                    <h4>修改用户名</h4>
                    <div className={styles.inputWrapper}>
                        <Input
                            placeholder="用户名"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => updateUserInfo({ username })}>
                        修改用户名
                    </Button>
                </Row>
                <Row>
                    <h4>修改密码</h4>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="password"
                            placeholder="旧密码"
                            onChange={e => setOldPsw(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="password"
                            placeholder="新密码"
                            onChange={e => setNewpsw(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => updateUserInfo({ oldpsw, newpsw })}>
                        修改密码
                    </Button>
                </Row>
            </div>
        </Modal>
    )
}

export default UserInfoSetting
