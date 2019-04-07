import * as React from 'react'
import { inject, observer } from 'mobx-react'

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
            chatStore: { chatList }
        } = this.props
        console.log(chatList)
        return (
            <div className={styles.chatList}>
                {chatList.map(item => {
                    const { id, name } = item
                    return (
                        <div key={id}>
                            <div>touxiang</div>
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