import React from 'react'
import { Empty, Icon } from 'antd'

import styles from './index.module.scss'
import { IResult, IUser, IGroup } from '../SearchHeader/type'
import { QN_DOMAIN } from '../../../constants'

interface IProps {
    result: IResult
    addUser: (item: IUser) => void
    addGroup: (item: IGroup) => void
}
function SearchList({ result, addUser, addGroup }: IProps) {
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
                                            <img
                                                src={`${QN_DOMAIN}/${avatar}`}
                                                alt="头像"
                                            />
                                            <div>{name}</div>
                                        </div>
                                        <div onClick={() => addUser(item)}>
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
                                const { id, name, avatar } = item
                                return (
                                    <div key={id} className={styles.item}>
                                        <div>
                                            <img
                                                src={`${QN_DOMAIN}/${avatar}`}
                                                alt="头像"
                                            />
                                            <div>{name}</div>
                                        </div>
                                        <div onClick={() => addGroup(item)}>
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
