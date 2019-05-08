import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'
import { stringify } from 'qs'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'
import SearchList from '../SearchList'
import req from '../../../utils/request'
import { IResult, IStoreProps } from './type'

function SearchHeader({
    searchListVisible,
    setSearchListVisible
}: IStoreProps) {
    const [isInputFocus, setIsInputFocus] = useState(false)
    const [result, setResult] = useState<IResult>(null)

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
    return (
        <div className={styles.searchHeader}>
            <div className={styles.main}>
                <Icon type="search" className={styles.searchIcon} />
                <div className={styles.inputWrapper}>
                    <input
                        onKeyDown={onKeyDown}
                        onBlur={() => setIsInputFocus(false)}
                        onFocus={e => setIsInputFocus(true)}
                        onClick={e => e.stopPropagation()}
                        type="text"
                        placeholder="搜索群组/用户"
                    />
                </div>

                <span className={styles.addIcon}>
                    {!isInputFocus && <Icon type="usergroup-add" />}
                </span>
            </div>
            {searchListVisible && result && (
                <div className={styles.searchList}>
                    <SearchList result={result} />
                </div>
            )}
        </div>
    )
}

export default inject((store: IAllStore) => {
    const {
        globalStore: { searchListVisible, setSearchListVisible }
    } = store
    return {
        searchListVisible,
        setSearchListVisible
    }
})(observer(SearchHeader))
