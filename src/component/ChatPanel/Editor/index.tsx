import * as React from 'react'
import { Icon } from 'antd'

import styles from './index.module.scss'

interface IProps {
    value: string
    onChange: (value: string) => void
    onKeyDown: (e) => void
}

export default function Editor({ value, onChange, onKeyDown }: IProps) {
    return (
        <div className={styles.editor}>
            <Icon type="smile" style={{ fontSize: 24 }} />
            <Icon type="crown" style={{ fontSize: 24, margin: '0 10px' }} />
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                placeholder="活成自己讨厌的样子了吗？"
            />
        </div>
    )
}
