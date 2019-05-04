import React from 'react'
import { Drawer } from 'antd'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

interface IStoreProps {
    onlineList?: []
    onlineListVisible?: boolean
    setOnlineListVisible?: (onlineListVisible: boolean) => void
}

interface IProps extends IStoreProps {
    container?: any
}

function OnlineList({
    onlineList,
    onlineListVisible,
    setOnlineListVisible,
    container
}: IProps) {
    return (
        onlineListVisible && (
            <div
                onClick={() => setOnlineListVisible(false)}
                className={styles.onlineList}
            >
                123
            </div>
        )
    )
}

export default inject((store: IAllStore) => {
    const { globalStore } = store
    const { onlineList, onlineListVisible, setOnlineListVisible } = globalStore
    return {
        onlineList,
        onlineListVisible,
        setOnlineListVisible
    }
})(observer(OnlineList))
