import * as React from 'react'

import style from './index.module.scss'
import ContentEditable from 'react-contenteditable'

interface IProps {
    value: string
    onChange: (value: string) => void
    onKeyDown: (e) => void
}

export default function Editor({ value, onChange, onKeyDown }: IProps) {
    return (
        <ContentEditable
            className={style.editor}
            html={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
            }
            onKeyDown={onKeyDown}
        />
    )
}
