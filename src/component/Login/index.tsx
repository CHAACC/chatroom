import React, { useState } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { inject } from 'mobx-react'

import styles from './index.module.scss'
import Modal from '../Modal'

interface IProps extends IAllStore {
    form: WrappedFormUtils
    visible: boolean
    onClose?: () => void
}

function Login({
    visible,
    onClose,
    form: { getFieldDecorator, validateFields },
    userStore: { login }
}: IProps) {
    const handleSubmit = e => {
        e.preventDefault()
        validateFields((err, values) => {
            if (!err) {
                login(values)
            }
        })
    }
    return (
        <Modal visible={visible} onClose={onClose}>
            <div className={styles.content}>
                <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '用户名必填'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type='user'
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder='用户名'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码必填'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type='lock'
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type='password'
                                placeholder='密码'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{ width: '100%' }}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

// export default Form.create<IProps>()(Login)

export default inject(store => store)(Form.create<IProps>()(Login))
