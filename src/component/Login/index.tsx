import React, { useState } from 'react'
import { Form, Icon, Input, Button, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { RadioChangeEvent } from 'antd/lib/radio'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import Modal from '../Modal'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface IProps extends IAllStore {
    form: WrappedFormUtils
    visible: boolean
    onClose?: () => void
}

const typeMap = {
    1: {
        usernamePlaceholder: '用户名',
        passwordPlaceholder: '密码',
        buttonText: '登录'
    },
    2: {
        usernamePlaceholder: '用户名即昵称，暂不支持修改',
        passwordPlaceholder: '密码暂不支持修改',
        buttonText: '注册'
    }
}

function Login({
    visible,
    onClose,
    form: { getFieldDecorator, validateFields },
    userStore,
    chatStore
}: IProps) {
    const [type, setType] = useState<'1' | '2'>('1')

    const handleSubmit = e => {
        e.preventDefault()
        validateFields(async (err, values) => {
            if (!err) {
                const { login } = userStore
                const { fetchChatListAndFirstMessageList } = chatStore
                const userInfo = await login(values, type)
                // 登录成功后要初始化socket
                window.socket.emit('init', {
                    userid: userInfo.id
                })
                fetchChatListAndFirstMessageList()
                //
                onClose()
            }
        })
    }
    const onRadioChange = (e: RadioChangeEvent) => {
        setType(e.target.value)
    }
    return (
        <Modal visible={visible} onClose={onClose}>
            <div className={styles.header}>
                <RadioGroup onChange={onRadioChange} value={type}>
                    <RadioButton value="1">登录</RadioButton>
                    <RadioButton value="2">注册</RadioButton>
                </RadioGroup>
            </div>

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
                                        type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder={typeMap[type].usernamePlaceholder}
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
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type="password"
                                placeholder={typeMap[type].passwordPlaceholder}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            {typeMap[type].buttonText}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default inject(store => store)(Form.create<IProps>()(observer(Login)))
