import React from 'react'
import { Row, Button, Input } from 'antd'

import styles from './index.module.scss'
import Modal from '../Modal'
import UploadAvatar from '../UploadAvatar'

interface IProps {
    visible?: boolean
    onClose?: () => void
    userInfo?: IUserStore.IUserInfo
    handleUploadDone?: (url: string) => void
}

function UserInfoSetting({
    visible,
    onClose,
    userInfo: { avatar, id },
    handleUploadDone
}: IProps) {
    return (
        <Modal visible={visible} onClose={onClose}>
            <div className={styles.userInfoSetting}>
                <Row>
                    <h4>修改头像</h4>
                    <div>
                        <UploadAvatar
                            avatar={avatar}
                            userId={id}
                            handleUploadDone={handleUploadDone}
                        />
                    </div>
                </Row>
                <Row>
                    <h4>修改用户名</h4>
                    <div className={styles.inputWrapper}>
                        <Input placeholder="用户名" />
                    </div>
                    <Button>修改用户名</Button>
                </Row>
                <Row>
                    <h4>修改密码</h4>
                    <div className={styles.inputWrapper}>
                        <Input placeholder="旧密码" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input placeholder="新密码" />
                    </div>
                    <Button>修改密码</Button>
                </Row>
            </div>
        </Modal>
    )
}

export default UserInfoSetting
