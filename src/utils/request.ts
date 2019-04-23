import axios from 'axios'
import Cookies from 'js-cookie'
import { message } from 'antd'
import { get } from 'lodash'

const instance = axios.create({
    timeout: 1000,
    headers: {
        'x-csrf-token': Cookies.get('csrfToken')
    }
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.common.Authorization = 'Bearer ' + token
    return config
})

instance.interceptors.response.use(
    function(response) {
        if (response.data.message) {
            message.success(response.data.message)
        }
        return response.data
    },
    function(error) {
        const status = get(error, 'response.status')
        let msg = get(error, 'response.data.message')
        if (status === 401) {
            msg = '登录token已过期，请重新登录。'
        }
        message.error(msg)
        return Promise.reject(error)
    }
)

export default instance
