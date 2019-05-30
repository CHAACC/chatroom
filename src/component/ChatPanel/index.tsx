import React, { useEffect, useRef, useState } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { get, isEmpty } from 'lodash'
import Viewer from 'react-viewer'
import 'react-viewer/dist/index.css'

import styles from './index.module.scss'
import Editor, { IQnRes } from './Editor'
import MessageItem from './MessageItem'
import Header from './Header'
import Footer from './Footer'

function ChatPanel({ chatStore, userStore }: IAllStore) {
    const {
        messageList,
        inputValue,
        fetchHistoryList,
        setInputValue,
        firstFetchMessages,
        scrollBottomFlag
    } = chatStore

    const { isLogin } = userStore

    const listWrapper = useRef<HTMLDivElement>()

    // 滚动分页设置scrollTop用到
    const [currentScrollHeight, setCurrentScorllHeight] = useState(0)
    // 是否加载新消息，没数据了就否
    const [shouldLoadNewMessageList, setShouldLoadNewMessageList] = useState(
        false
    )
    // 图片viewer
    const [viewerVisible, setViewerVisible] = useState(false)
    const [viewerSrc, setViewerSrc] = useState('')

    // 监听滚动
    useEffect(() => {
        listWrapper.current.addEventListener('scroll', onScroll)
        return function cleanup() {
            listWrapper.current.removeEventListener('scroll', onScroll)
        }
    }, [])

    // 滚动条滑到底部，消息列表更新和发消息时候触发
    useEffect(() => {
        const messageListNode = get(listWrapper, 'current.children')
        if (!isEmpty(messageListNode)) {
            setTimeout(() => {
                const lastNodeIndex = get(messageListNode, 'length')
                if (lastNodeIndex) {
                    messageListNode[lastNodeIndex - 1].scrollIntoView()
                }
            }, 100)
        }
    }, [scrollBottomFlag, firstFetchMessages])

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
        const { isEndPage, setPage } = chatStore
        let { page } = chatStore
        setCurrentScorllHeight(scrollHeight)
        if (scrollTop === 0 && scrollHeight !== clientHeight && !isEndPage) {
            setPage(++page)
            // 获取历史消息
            await fetchHistoryList()
            setShouldLoadNewMessageList(true)
        }
    }
    const sendMsg = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            const { currentChatId, currentChatType } = chatStore
            const { userInfo } = userStore
            window.socket.emit('message', {
                is_private: currentChatType,
                message: chatStore.inputValue,
                from_user_id: userInfo.id,
                to_group_id: currentChatId,
                to_user_id: currentChatId,
                type: 1
            })
            setInputValue('')
        }
    }

    const handleInputChange = (value: string) => {
        setInputValue(value)
    }

    const selectEmoji = (name: string) => {
        setInputValue(`${inputValue}#(${name})`)
    }

    const sendImage = (params: IQnRes) => {
        const { key } = params
        const { currentChatId, currentChatType } = chatStore
        const { userInfo } = userStore
        window.socket.emit('message', {
            is_private: currentChatType,
            message: chatStore.inputValue,
            from_user_id: userInfo.id,
            to_group_id: currentChatId,
            to_user_id: currentChatId,
            type: 2,
            url: key
        })
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
                                userInfo={userStore.userInfo}
                                onClickImg={(url: string) => {
                                    setViewerVisible(true)
                                    setViewerSrc(url)
                                }}
                            />
                        )
                    })}
            </div>
            <Viewer
                noNavbar
                noClose
                onMaskClick={() => setViewerVisible(false)}
                visible={viewerVisible}
                onClose={() => setViewerVisible(false)}
                images={[{ src: viewerSrc }]}
            />

            {isLogin ? (
                <Editor
                    userInfo={userStore.userInfo}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={sendMsg}
                    selectEmoji={selectEmoji}
                    sendImage={sendImage}
                />
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
