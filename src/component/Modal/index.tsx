import React, { Component } from 'react'
import { createPortal } from 'react-dom'

import styles from './index.module.scss'
import IconClose from '../../assets/close.svg'

interface IProps {
    visible?: boolean
    onClose?: () => void
}

class Modal extends Component<IProps> {
    el: HTMLDivElement
    constructor(props) {
        super(props)
        this.el = document.createElement('div')
        this.el.className = styles.modalWrapper
        this.el.id = 'modalRoot'
    }
    state = {
        visible: false
    }
    componentWillUnmount() {
        document.body.removeChild(this.el)
    }

    componentDidUpdate() {
        if (!this.state.visible) {
            document.body.removeChild(this.el)
        } else {
            if (!document.body.querySelector('#modalRoot')) {
                document.body.appendChild(this.el)
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible !== state.visible) {
            return {
                visible: props.visible
            }
        }
        return null
    }

    render() {
        const { children, onClose } = this.props
        const content = (
            <div className={styles.modal}>
                {children}
                <span className={styles.close} onClick={onClose}>
                    <img src={IconClose} />
                </span>
            </div>
        )
        return createPortal(content, this.el)
    }
}

export default Modal
