import { observable, action, runInAction } from 'mobx'
import req from '../../utils/request'

import { StoreExt } from '../../utils/reactExt'

export class UserStore extends StoreExt {
    @observable isLogin: boolean = false
    @observable loginModalVisible: boolean = false
    @observable userInfo: IUserStore.IUserInfo = {}

    @action
    setUserInfo = (userInfo: IUserStore.IUserInfo) => {
        this.userInfo = userInfo
    }

    @action
    setLoginModalVisible = (visible: boolean) => {
        this.loginModalVisible = visible
    }

    @action
    setLoginStatus = (isLogin: boolean) => {
        this.isLogin = isLogin
    }

    @action
    login = async ({ name, password }) => {
        const { data } = await req.post(`/login`, { name, password })
        const { token, userInfo } = data
        localStorage.setItem('token', token)
        runInAction(() => {
            this.isLogin = true
            this.userInfo = userInfo
        })
    }
}

export default new UserStore()
