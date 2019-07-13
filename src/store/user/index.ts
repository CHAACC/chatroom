import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import { isEmpty } from 'lodash'

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
    setUserAvatar = (avatar: string) => {
        this.userInfo.avatar = avatar
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
        chatStore.fetchChatListAndFirstMessageList()
        message.success('您已退出登录')
    }

    updateUserInfo = async (params: IUserStore.IUpdateUserInfoParams) => {
        const { username, oldpsw, newpsw } = params
        if (oldpsw || newpsw) {
            if (isEmpty(oldpsw) || isEmpty(newpsw)) {
                message.error('新密码和旧密码都不能为空')
            }
        } else {
            if (isEmpty(username)) {
                message.error('用户名不能为空')
            }
        }
        await req.patch(`/user/${this.userInfo.id}`, {
            username,
            oldpsw,
            newpsw
        })
        runInAction(() => {
            this.userInfo.username = username
        })
        message.success('修改成功')
    }
}

export default new UserStore()
