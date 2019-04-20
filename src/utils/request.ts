import axios from 'axios'
import Cookies from 'js-cookie'
import {message} from 'antd'
const instance = axios.create({
    timeout: 1000,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') }
})

instance.interceptors.response.use(
    function(response) {
        console.log(response)
        return response
    },
    function(error) {
        console.log(error.response)
        message.error('error')
        return Promise.reject(error)
    }
)

export default instance
