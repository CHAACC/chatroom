import React, { useState, useRef } from 'react'
import { Icon, Upload } from 'antd'

import styles from './index.module.scss'
import EmojiBox from '../EmojiBox'
import ClickOutside from '../../common/ClickOutside'

interface IProps {
    value: string
    onChange: (value: string) => void
    onKeyDown: (e) => void
    selectEmoji: (name: string) => void
}

export default function Editor({
    value,
    onChange,
    onKeyDown,
    selectEmoji
}: IProps) {
    const [emojiVisible, setEmojiVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement>()

    const uploadProps = {}

    return (
        <div className={styles.editor}>
            <Icon
                onClick={() => setEmojiVisible(true)}
                type="smile"
                style={{ fontSize: 24 }}
            />
            <Upload {...uploadProps}>
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
