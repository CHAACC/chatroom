import React, { useState, useRef } from 'react'
import { Icon, Upload, message } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'

import styles from './index.module.scss'
import EmojiBox from '../EmojiBox'
import ClickOutside from '../../common/ClickOutside'
import { customUploadQn, uploadQn } from '../../../utils/qiniu'

export interface IQnRes {
    hash: string
    key: string
}

interface IProps {
    userInfo?: IUserStore.IUserInfo
    value: string
    onChange: (value: string) => void
    onKeyDown: (e) => void
    selectEmoji: (name: string) => void
    sendImage?: (params: IQnRes) => void
}

export default function Editor({
    value,
    onChange,
    onKeyDown,
    selectEmoji,
    userInfo,
    sendImage
}: IProps) {
    const [emojiVisible, setEmojiVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement>()
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onUploadChange = ({
        file,
        fileList: _fileList
    }: UploadChangeParam) => {
        setFileList([..._fileList])
        if (file.status === 'done') {
            sendImage(file.response)
        }
    }

    const onPaste = e => {
        const { items, types } =
            e.clipboardData || e.originalEvent.clipboardData
        if (types.includes('Files')) {
            const limitSize = 1000 * 1024 * 1 // 1 MB
            for (const item of items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile()
                    if (file) {
                        if (file.size > limitSize) {
                            message.error('发的文件不能超过1MB哦!')
                            return
                        }
                        uploadQn(file, userInfo.id, res => {
                            sendImage(res)
                        })
                    }
                }
            }
            e.preventDefault()
        }
    }

    return (
        <div className={styles.editor}>
            <Icon
                onClick={() => setEmojiVisible(true)}
                type="smile"
                style={{ fontSize: 24 }}
            />
            <Upload
                accept="image/*"
                fileList={fileList}
                onChange={onUploadChange}
                customRequest={params => customUploadQn(params, userInfo.id)}
                showUploadList={false}
            >
                <Icon
                    onClick={e => e.preventDefault()}
                    type="file-image"
                    style={{ fontSize: 24, margin: '0 10px' }}
                />
            </Upload>

            <input
                ref={inputRef}
                value={value}
                onPaste={onPaste}
                onChange={e => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                placeholder="活成自己讨厌的样子了吗？"
            />
            {emojiVisible && (
                <ClickOutside onClickOutSide={() => setEmojiVisible(false)}>
                    <EmojiBox
                        selectEmoji={name => {
                            inputRef.current.focus()
                            setEmojiVisible(false)
                            selectEmoji(name)
                        }}
                    />
                </ClickOutside>
            )}
        </div>
    )
}
