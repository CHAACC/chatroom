import React, { useState } from 'react'
import { Icon } from 'antd'
import { stringify } from 'qs'

import styles from './index.module.scss'
import SearchList from '../SearchList'
import req from '../../../utils/request'

function SearchHeader() {
    const [isInputFocus, setIsInputFocus] = useState(false)
    const onKeyDown = async e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            const ret = await req.get(
                `/search_all?${stringify({
                    keyword: e.target.value
                })}`
            )
            console.log(ret)
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
                        onFocus={() => setIsInputFocus(true)}
                        type="text"
                        placeholder="搜索群组/用户"
                    />
                </div>
                {!isInputFocus && (
                    <span className={styles.addIcon}>
                        <Icon type="usergroup-add" />
                    </span>
                )}
            </div>
            {isInputFocus && (
                <div className={styles.searchList}>
                    <SearchList />
                </div>
            )}
        </div>
    )
}

export default SearchHeader
