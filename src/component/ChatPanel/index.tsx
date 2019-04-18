import React, { useEffect, useRef } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get, isEmpty } from 'lodash'

import styles from './index.module.scss'
import Editor from './Editor'
import MessageItem from './MessageItem'

interface IStoreProps {
    chatStore?: IChatStore.ChatStore
}

function ChatPanel({ chatStore }: IStoreProps) {
    const {
        messageList,
        inputValue,
        save,
        fetchHistoryList,
        currentChatId
    } = chatStore
    let { page } = chatStore
    const listWrapper: any = useRef()

    // 初始化滚动条滑到底部
    useEffect(() => {
        const messageListNode = get(listWrapper, 'current.children')
        const lastNodeIndex = get(messageListNode, 'length')
        if(!isEmpty(messageListNode)) {
            messageListNode[lastNodeIndex - 1].scrollIntoView()
        }
        listWrapper.current.addEventListener('scroll', onScroll)
        return function cleanup() {
            listWrapper.current.removeEventListener('scroll', onScroll)
        }
    }, [messageList])

    const onScroll = e => {
        const { scrollTop } = e.srcElement
        if (scrollTop === 0) {
            save({
                page: ++page
            })
            // 获取历史消息
            fetchHistoryList()
        }
    }
    const sendMsg = e => {
        const userInfoString = localStorage.getItem('chatroom_user_info')
        const { id } = JSON.parse(userInfoString)
        if (e.keyCode === 13) {
            e.preventDefault()
            window.socket.emit('sendMsg', {
                message: inputValue,
                from_user_id: id,
                to_group_id: currentChatId
            })
            save({
                inputValue: ''
            })
        }
    }

    const handleInputChange = (value: string) => {
        save({
            inputValue: value
        })
    }

    return (
        <div className={styles.chatPanel}>
            <div className={styles.content} ref={listWrapper}>
                {messageList &&
                    messageList.map(item => {
                        const { id } = item
                        return <MessageItem key={id} content={item} />
                    })}
            </div>
            <div className={styles.editor}>
                <Editor
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={sendMsg}
                />
            </div>
        </div>
    )
}

export default inject(
    ({ chatStore }: IAllStore): IStoreProps => {
        return {
            chatStore
        }
    }
)(observer(ChatPanel))
