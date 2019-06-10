import React, { Component, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './index.module.scss'
import IconClose from '../../assets/close.svg'

interface IProps {
    children?: React.ReactNode
    defaultVisible?: boolean
    onClose?: () => void
}

export default function Modal({ children, onClose, defaultVisible }: IProps) {
    const [visible, setVisible] = useState(false)
    const el = useRef(document.createElement('div'))
    useEffect(() => {
        el.current.className = styles.modalWrapper
        el.current.id = 'modalRoot'
        if (document.body.querySelector('#modalRoot')) {
            document.body.removeChild(el.current)
        }
    }, [])
    useEffect(() => {
        if (!visible) {
            if (document.body.querySelector('#modalRoot')) {
                document.body.removeChild(el.current)
            }
        } else {
            if (!document.body.querySelector('#modalRoot')) {
                document.body.appendChild(el.current)
            }
        }
    })
    useEffect(() => {
        if (defaultVisible !== visible) {
            setVisible(defaultVisible)
        }
    }, [defaultVisible])
    const content = (
        <div className={styles.modal}>
            {children}
            <span className={styles.close} onClick={onClose}>
                <img src={IconClose} />
            </span>
        </div>
    )
    return createPortal(content, el.current)
}
