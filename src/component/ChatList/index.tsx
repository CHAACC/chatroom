import * as React from 'react'
import { inject, observer } from 'mobx-react'
import classname from 'classname'

import styles from './index.module.scss'
import { IProps, IStoreProps } from './type'

@inject(
    ({ chatStore }): IStoreProps => {
        return { chatStore }
    }
)
@observer
export default class ChatList extends React.Component<IProps> {
    componentDidMount() {
        const { chatStore } = this.props
        const userInfoString = localStorage.getItem('chatroom_user_info')
        const { id } = JSON.parse(userInfoString)
        chatStore.fetchChatList(id)
    }
    render() {
        const {
            chatStore: { chatList, changeCurrentChatId, currentChatId }
        } = this.props
        return (
            <div className={styles.chatList}>
                {chatList.map(item => {
                    const { id, name } = item
                    return (
                        <div
                            key={id}
                            onClick={() => changeCurrentChatId(id)}
                            className={classname(styles.chatItem, {
                                [styles.current]: currentChatId === id
                            })}
                        >
                            <div />
                            <div>
                                <span>{name}</span>
                                <span>456</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
