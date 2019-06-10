import React, { useEffect } from 'react'
import classname from 'classname'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

interface IStoreProps {
    onlineList?: IGlobalStore.onlineListItem[]
    offlineList?: IGlobalStore.onlineListItem[]
    onlineListVisible?: boolean
    setOnlineListVisible?: (onlineListVisible: boolean) => void
    currentChatId?: number
}

interface IProps extends IStoreProps {}

function OnlineList({
    onlineList,
    offlineList,
    onlineListVisible,
    currentChatId
}: IProps) {
    useEffect(() => {
        if (onlineListVisible) {
            window.socket.emit('group_online_members', {
                group_id: currentChatId
            })
        }
    }, [onlineListVisible])
    return (
        onlineListVisible && (
            <div
                onClick={e => e.stopPropagation()}
                className={styles.onlineList}
            >
                <header>群组信息</header>
                <div className={styles.listWrapper}>
                    <div className={styles.title}>
                        在线成员 {onlineList.length}
                    </div>
                    {onlineList.map(item => {
                        const { id, avatar, name } = item
                        return (
                            <div key={id} className={styles.item}>
                                <div
                                    className={styles.avatar}
                                    style={{
                                        backgroundImage: `url(${avatar})`
                                    }}
                                />
                                <div>{name}</div>
                            </div>
                        )
                    })}

                    <div className={styles.title}>
                        离线成员 {offlineList.length}
                    </div>
                    {offlineList.map(item => {
                        const { id, avatar, name } = item
                        return (
                            <div key={id} className={styles.item}>
                                <div
                                    className={classname(
                                        styles.avatar,
                                        styles.gray
                                    )}
                                    style={{
                                        backgroundImage: `url(${avatar})`
                                    }}
                                />
                                <div>{name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default inject((store: IAllStore) => {
    const { globalStore, chatStore } = store
    const {
        onlineList,
        offlineList,
        onlineListVisible,
        setOnlineListVisible
    } = globalStore
    const { currentChatId } = chatStore
    return {
        onlineList,
        offlineList,
        onlineListVisible,
        setOnlineListVisible,
        currentChatId
    }
})(observer(OnlineList))
