import React, { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import { stringify } from 'qs'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import SearchList from '../SearchList'
import req from '../../../utils/request'
import { IResult, IStoreProps, IUser, IGroup } from './type'
import CreateGroupModal from '../CreateGroupModal'

function SearchHeader({
    searchListVisible,
    setSearchListVisible,
    fetchChatList
}: IStoreProps) {
    const [isInputFocus, setIsInputFocus] = useState(false)
    const [result, setResult] = useState<IResult>(null)
    const [createGroupModalVisible, setCreateGroupModalVisible] = useState(
        false
    )

    useEffect(() => {
        setResult(null)
    }, [searchListVisible])

    const onKeyDown = async e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            setSearchListVisible(true)
            const { data } = await req.get(
                `/search_all?${stringify({
                    keyword: e.target.value
                })}`
            )
            setResult(data)
        }
    }

    const addUser = async (user: IUser) => {
        const { id } = user
        await req.post('/user_user', {
            friend_id: id
        })
        message.success('添加好友成功')
        fetchChatList()
    }

    const addGroup = async (group: IGroup) => {
        const { to_group_id } = group
        await req.post('/group_user', {
            to_group_id
        })
        message.success('加群成功')
        fetchChatList()
    }

    const createGroup = async (groupName: string) => {
        await req.post('/group', {
            name: groupName
        })
        message.success('创建成功')
        setCreateGroupModalVisible(false)
        fetchChatList()
    }

    return (
        <div className={styles.searchHeader}>
            <div className={styles.main}>
                <Icon type="search" className={styles.searchIcon} />
                <div className={styles.inputWrapper}>
                    <input
                        onKeyDown={onKeyDown}
                        onBlur={() => setIsInputFocus(false)}
                        onFocus={() => setIsInputFocus(true)}
                        onClick={e => e.stopPropagation()}
                        type="text"
                        placeholder="搜索群组/用户"
                    />
                </div>

                <span className={styles.addIcon}>
                    {!isInputFocus && (
                        <Icon
                            type="usergroup-add"
                            onClick={() => setCreateGroupModalVisible(true)}
                        />
                    )}
                </span>
            </div>
            {searchListVisible && result && (
                <div className={styles.searchList}>
                    <SearchList
                        result={result}
                        addUser={addUser}
                        addGroup={addGroup}
                    />
                </div>
            )}
            <CreateGroupModal
                visible={createGroupModalVisible}
                onClose={() => setCreateGroupModalVisible(false)}
                createGroup={createGroup}
            />
        </div>
    )
}

export default inject((store: IAllStore) => {
    const {
        globalStore: { searchListVisible, setSearchListVisible },
        chatStore: { fetchChatList }
    } = store
    return {
        searchListVisible,
        setSearchListVisible,
        fetchChatList
    }
})(observer(SearchHeader))
