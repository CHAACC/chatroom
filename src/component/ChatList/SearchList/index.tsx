import React from 'react'
import { Empty, Icon } from 'antd'

import styles from './index.module.scss'
import { IResult } from '../SearchHeader/type'

interface IProps {
    result: IResult
}
function SearchList({ result }: IProps) {
    const { users, groups } = result
    return (
        <div className={styles.searchList} onClick={e => e.stopPropagation()}>
            {!users && !groups ? (
                <Empty />
            ) : (
                <div className={styles.wrapper}>
                    {users && (
                        <div>
                            <h4>用户</h4>
                            {users.map(item => {
                                const { id, name, avatar } = item
                                return (
                                    <div key={id} className={styles.item}>
                                        <div>
                                            <img src={avatar} alt="头像" />
                                            <div>{name}</div>
                                        </div>
                                        <div>
                                            <Icon type="plus" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {groups && (
                        <div>
                            <h4>群组</h4>
                            {groups.map(item => {
                                const { id, name } = item
                                return (
                                    <div key={id} className={styles.item}>
                                        <div>
                                            <div>{name}</div>
                                        </div>
                                        <div>
                                            <Icon type="plus" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchList
