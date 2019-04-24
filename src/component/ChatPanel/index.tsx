import React, { useEffect, useRef, useState } from 'react'
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
        hasSetScrollBottom,
        setInputValue
    } = chatStore

    const { isLogin } = userStore

    const listWrapper = useRef<HTMLDivElement>()

    const [currentScrollHeight, setCurrentScorllHeight] = useState(0)
    const [shouldLoadNewMessageList, setShouldLoadNewMessageList] = useState(
        false
    )

    // 初始化滚动条滑到底部
    useEffect(() => {
        const messageListNode = get(listWrapper, 'current.children')
        const lastNodeIndex = get(messageListNode, 'length')
        if (!isEmpty(messageListNode)) {
            messageListNode[lastNodeIndex - 1].scrollIntoView()
        }
    }, [hasSetScrollBottom])

    // 监听滚动
    useEffect(() => {
        listWrapper.current.addEventListener('scroll', onScroll)
        return function cleanup() {
            listWrapper.current.removeEventListener('scroll', onScroll)
        }
    }, [])

    // componentDidUpdate 翻页设置scrollTop
    useEffect(() => {
        setShouldLoadNewMessageList(false)
        const { scrollHeight } = listWrapper.current
        if (screenTop === 0 && shouldLoadNewMessageList) {
            listWrapper.current.scrollTop = scrollHeight - currentScrollHeight
        }
    })

    const onScroll = async e => {
        const { scrollTop, scrollHeight, clientHeight } = e.srcElement
        const { isEndPage } = chatStore
        let { page } = chatStore
        setCurrentScorllHeight(scrollHeight)
        if (scrollTop === 0 && scrollHeight !== clientHeight && !isEndPage) {
            save({
                page: ++page
            })
            // 获取历史消息
            await fetchHistoryList()
            setShouldLoadNewMessageList(true)
        }
    }
    const sendMsg = e => {
        const { userInfo } = userStore
        const { currentChatId } = chatStore
        if (e.keyCode === 13) {
            e.preventDefault()
            window.socket.emit('message', {
                message: chatStore.inputValue,
                from_user_id: userInfo.id,
                to_group_id: currentChatId
            })
            save({
                inputValue: ''
            })
        }
    }

    const handleInputChange = (value: string) => {
        setInputValue(value)
    }

    return (
        <div className={styles.chatPanel}>
            <Header />
            <div className={styles.content} ref={listWrapper}>
                {messageList &&
                    messageList.map(item => {
                        const { id } = item
                        return (
                            <MessageItem
                                key={id}
                                content={item}
                                currentUserId={userStore.userInfo.id}
                            />
                        )
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
