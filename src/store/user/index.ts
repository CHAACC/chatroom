import { observable, action, computed } from 'mobx'
import axios from 'axios'
import req from '../../utils/request'
import {get} from 'lodash'
import {stringify} from 'qs'

import { StoreExt } from '../../utils/reactExt'

export class UserStore extends StoreExt {
    @observable isLogin: boolean = false

    login = async ({name, password}) => {
        const { data } = await req.post(`/login`, {name, password})
    }
}

export default new UserStore()
