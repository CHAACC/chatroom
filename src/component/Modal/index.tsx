import React from 'react'
import { Modal } from 'antd'

import styles from './index.module.scss'
import IconClose from '../../assets/close.svg'

interface IProps {
    children?: React.ReactNode
    visible?: boolean
    onClose?: () => void
}

export default function CustomModal({ children, onClose, visible }: IProps) {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            className={styles.modal}
            footer={null}
            closable={false}
            maskClosable={false}
        >
            {children}
            <span className={styles.close} onClick={onClose}>
                <img src={IconClose} />
            </span>
        </Modal>
    )
}
