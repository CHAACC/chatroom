import React, { useRef, useEffect } from 'react'
import { Input, Button } from 'antd'
import { get, set } from 'lodash'

import Modal from '../../Modal'
import styles from './index.module.scss'

interface IProps {
    visible: boolean
    onClose: () => void
    createGroup: (groupName: string) => void
}

function CreateGroupModal({ visible, onClose, createGroup }: IProps) {
    const inputRef = useRef()
    useEffect(() => {
        set(inputRef, 'current.state.value', undefined)
    }, [visible])
    return (
        <Modal defaultVisible={visible} onClose={onClose}>
            <div className={styles.wrapper}>
                <div>
                    <h4>新建群组</h4>
                    <Input
                        ref={inputRef}
                        maxLength={10}
                        placeholder="请输入群名"
                    />
                </div>
                <Button
                    onClick={() =>
                        createGroup(get(inputRef, 'current.state.value'))
                    }
                    type="primary"
                >
                    创建
                </Button>
            </div>
        </Modal>
    )
}

export default CreateGroupModal
