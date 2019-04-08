import { observable, action } from 'mobx'
import axios from 'axios'

import {StoreExt} from '../../utils/reactExt'

export class ChatStore extends StoreExt {
    @observable messageList: IChat.ImessageItem[] = []
    @observable chatList = []
    @observable currentChatId: number = null

    @action
    pushMessage = (message: IChat.ImessageItem) => {
        this.messageList.push(message)
    }

    @action
    changeCurrentChatId = (id: number) => {
        this.currentChatId = id
    }

    fetchChatList = async (id: number) => {
        const { data } =  await axios.get(`/chat_list/${id}`)
        this.save({
            chatList: data
        })
    }
}

export default new ChatStore()
