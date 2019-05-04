import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import { isEmpty } from 'lodash'

import req from '../../utils/request'
import chatStore from '../chat'

export class GlobalStore {
    @observable onlineList: [] = []
    @observable onlineListVisible: boolean = false

    @action
    setOnlineListVisible = (onlineListVisible: boolean) => {
        this.onlineListVisible = onlineListVisible
    }
}

export default new GlobalStore()
