import React from 'react'
import { Empty } from 'antd'

import styles from './index.module.scss'

function SearchList() {
    return (
        <div className={styles.searchList}>
            <Empty />
        </div>
    )
}

export default SearchList
