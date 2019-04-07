import { observable, action } from 'mobx'
import axios from 'axios'

import {StoreExt} from '../../utils/reactExt'

export class ChatStore extends StoreExt {
    @observable messageList: IChat.ImessageItem[] = []
    @observable chatList = []

    @action
    pushMessage = (message: IChat.ImessageItem) => {
        this.messageList.push(message)
    }

    fetchChatList = async (id: number) => {
        const { data } =  await axios.get(`/chat_list/${id}`)
        console.log(data)
        this.save({
            chatList: data
        })
    }
}

export default new ChatStore()
