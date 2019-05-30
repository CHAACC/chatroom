import React, { useState, useRef } from 'react'
import { Icon, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'

import styles from './index.module.scss'
import EmojiBox from '../EmojiBox'
import ClickOutside from '../../common/ClickOutside'
import { customeUploadQn } from '../../../utils/qiniu'

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
        console.log(file)
        if (file.status === 'done') {
            sendImage(file.response)
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
                customRequest={params => customeUploadQn(params, userInfo.id)}
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
