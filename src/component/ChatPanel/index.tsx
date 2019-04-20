import React, { useEffect, useRef } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get, isEmpty } from 'lodash'

import styles from './index.module.scss'
import Editor from './Editor'
import MessageItem from './MessageItem'
import Header from './Header'
import Footer from './Footer'

function ChatPanel({ chatStore, userStore }: IAllStore) {
    const {
        messageList,
        inputValue,
        save,
        fetchHistoryList,
        currentChatId,
        hasSetScrollBottom
    } = chatStore
    let { page } = chatStore

    const { isLogin } = userStore

    const listWrapper: any = useRef()

    // 初始化滚动条滑到底部
    useEffect(() => {
        const messageListNode = get(listWrapper, 'current.children')
        const lastNodeIndex = get(messageListNode, 'length')
        if (!isEmpty(messageListNode)) {
            messageListNode[lastNodeIndex - 1].scrollIntoView()
        }
    }, [hasSetScrollBottom])

    useEffect(() => {
        listWrapper.current.addEventListener('scroll', onScroll)
        return function cleanup() {
            listWrapper.current.removeEventListener('scroll', onScroll)
        }
    }, [])

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
            <Header />
            <div className={styles.content} ref={listWrapper}>
                {messageList &&
                    messageList.map(item => {
                        const { id } = item
                        return <MessageItem key={id} content={item} />
                    })}
            </div>

            {isLogin ? (
                <div className={styles.editor}>
                    <Editor
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={sendMsg}
                    />
                </div>
            ) : (
                <Footer />
            )}
        </div>
    )
}

export default inject(
    ({ chatStore, userStore }: IAllStore): IAllStore => {
        return {
            chatStore,
            userStore
        }
    }
)(observer(ChatPanel))
