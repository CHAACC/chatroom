import React, { useState } from 'react'
import { Upload, Icon, message } from 'antd'
import Cookies from 'js-cookie'
import { UploadChangeParam } from 'antd/lib/upload'
import { customUploadQn } from '../../utils/qiniu'

import styles from './index.module.scss'
import { QN_DOMAIN } from '../../constants'

interface IProps {
    avatar?: string
    userId?: number
    handleUploadDone?: (url: string) => void
}

function beforeUpload(file) {
    const allowType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    const isAllowType = allowType.includes(file.type)
    if (!isAllowType) {
        message.error('图片格式错误')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片大小不能超过2M')
    }
    return isAllowType && isLt2M
}

function UploadAvatar({ avatar, userId, handleUploadDone }: IProps) {
    const [loading, setLoading] = useState(false)
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">点击上传</div>
        </div>
    )
    const handleChange = (info: UploadChangeParam) => {
        const { status, response, error } = info.file
        if (status === 'uploading') {
            setLoading(true)
            return
        }
        if (status === 'done') {
            setLoading(false)
            handleUploadDone(response.key)
        }
        if (error) {
            message.error('上传失败')
            setLoading(false)
        }
    }
    const query = {
        _csrf: Cookies.get('csrfToken'),
        user_id: userId
    }
    return (
        <Upload
            accept="image/*"
            listType="picture"
            className={styles.uploadAvatar}
            showUploadList={false}
            customRequest={params => customUploadQn(params, userId, 'avatar')}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {avatar ? (
                <img
                    className={styles.avatar}
                    src={`${QN_DOMAIN}/${avatar}`}
                    alt="avatar"
                />
            ) : (
                uploadButton
            )}
        </Upload>
    )
}

export default UploadAvatar
