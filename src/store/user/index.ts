import { observable, action, runInAction } from 'mobx'
import req from '../../utils/request'

import { StoreExt } from '../../utils/reactExt'
import chatStore from '../chat'

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
    }

    @action
    logout = async () => {
        window.socket.emit('logout', {
            userid: this.userInfo.id
        })
    }
}

export default new UserStore()
