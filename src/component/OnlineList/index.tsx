import React, { useEffect, useState } from 'react'
import classname from 'classname'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { Upload, Icon, message } from 'antd'
import { get } from 'lodash'

import styles from './index.module.scss'
import { QN_DOMAIN } from '../../constants'
import { UploadChangeParam } from 'antd/lib/upload'
import { customUploadQn } from '../../utils/qiniu'
import { beforeUpload } from '../UploadAvatar'

interface IStoreProps {
    onlineList?: IGlobalStore.onlineListItem[]
    offlineList?: IGlobalStore.onlineListItem[]
    onlineListVisible?: boolean
    setOnlineListVisible?: (onlineListVisible: boolean) => void
    currentChatId?: number
    userId?: number
    currentChatItem?: IChatStore.IChat
    updateGroupInfo?: (params: IChatStore.IUpdateGroupInfoParams) => void
}

interface IProps extends IStoreProps {}

function OnlineList({
    onlineList,
    offlineList,
    onlineListVisible,
    currentChatId,
    userId,
    currentChatItem,
    updateGroupInfo
}: IProps) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (onlineListVisible) {
            window.socket.emit('group_online_members', {
                group_id: currentChatId
            })
        }
    }, [onlineListVisible])

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">点击上传</div>
        </div>
    )
    const groupAvatar = get(currentChatItem, 'avatar')
    const groupOwnerID = get(currentChatItem, 'creator_id')

    const handleChange = (info: UploadChangeParam) => {
        const { status, response, error } = info.file
        if (status === 'uploading') {
            setLoading(true)
            return
        }
        if (status === 'done') {
            setLoading(false)
            updateGroupInfo({ avatar: response.key })
        }
        if (error) {
            message.error('上传失败')
            setLoading(false)
        }
    }

    return (
        onlineListVisible && (
            <div
                onClick={e => e.stopPropagation()}
                className={styles.onlineList}
            >
                <header>群组信息</header>
                {groupOwnerID === userId && (
                    <div className={styles.modifyAvatar}>
                        <div className={styles.title}>
                            <div>修改群头像</div>
                        </div>
                        <Upload
                            accept="image/*"
                            listType="picture"
                            className={styles.uploadAvatar}
                            showUploadList={false}
                            customRequest={params =>
                                customUploadQn(params, userId, 'avatar')
                            }
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {groupAvatar ? (
                                <img
                                    className={styles.avatar}
                                    src={`${QN_DOMAIN}/${groupAvatar}`}
                                    alt="avatar"
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>
                )}

                <div className={styles.listWrapper}>
                    <div className={styles.title}>
                        在线成员 {onlineList.length}
                    </div>
                    {onlineList.map(item => {
                        const { id, avatar, name } = item
                        return (
                            <div key={id} className={styles.item}>
                                <div
                                    className={styles.avatar}
                                    style={{
                                        backgroundImage: `url(${QN_DOMAIN}/${avatar})`
                                    }}
                                />
                                <div>{name}</div>
                            </div>
                        )
                    })}

                    <div className={styles.title}>
                        离线成员 {offlineList.length}
                    </div>
                    {offlineList.map(item => {
                        const { id, avatar, name } = item
                        return (
                            <div key={id} className={styles.item}>
                                <div
                                    className={classname(
                                        styles.avatar,
                                        styles.gray
                                    )}
                                    style={{
                                        backgroundImage: `url(${QN_DOMAIN}/${avatar})`
                                    }}
                                />
                                <div>{name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default inject((store: IAllStore) => {
    const { globalStore, chatStore, userStore } = store
    const {
        onlineList,
        offlineList,
        onlineListVisible,
        setOnlineListVisible
    } = globalStore
    const { currentChatId, currentChatItem, updateGroupInfo } = chatStore
    const {
        userInfo: { id }
    } = userStore
    return {
        onlineList,
        offlineList,
        onlineListVisible,
        setOnlineListVisible,
        currentChatId,
        userId: id,
        currentChatItem,
        updateGroupInfo
    }
})(observer(OnlineList))
