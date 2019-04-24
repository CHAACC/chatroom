import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

import req from '../../utils/request'
import chatStore from '../chat'

export class UserStore {
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
    login = async ({ name, password }, type: '1' | '2' = '1') => {
        const { data } = await req.post(type === '1' ? '/login' : '/register', {
            name,
            password
        })
        const { token, userInfo } = data
        localStorage.setItem('token', token)
        await chatStore.fetchChatList()
        runInAction(() => {
            this.isLogin = true
            this.userInfo = userInfo
        })
        return userInfo
    }

    logout = async () => {
        await req.post(`/logout/${this.userInfo.id}`)
        runInAction(() => {
            this.isLogin = false
            this.userInfo = {}
        })
        localStorage.removeItem('token')
        chatStore.fetchChatAndMessageList()
        message.success('您已退出登录')
    }
}

export default new UserStore()
