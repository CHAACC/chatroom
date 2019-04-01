import * as React from 'react'
import styles from './index.module.scss'

interface IProps {
    message?: string
    createdAt?: string
}

const MessageItem = ({message, createdAt}: IProps) => {
    return <div className={styles.wrapper}>{message}</div>
}

export default MessageItem
