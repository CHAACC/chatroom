import { observable, action } from 'mobx'
import axios from 'axios'

import { StoreExt } from '../../utils/reactExt'

export class ChatStore extends StoreExt {
    @observable messageList: IChatStore.ImessageItem[] = []
    @observable chatList = []
    @observable currentChatId: number = null

    @action
    pushMessage = (message: IChatStore.ImessageItem) => {
        this.messageList.push(message)
    }

    @action
    changeCurrentChatId = (id: number) => {
        this.currentChatId = id
    }

    /**
     * 获取聊天人列表
     */
    fetchChatList = async (id: number) => {
        const { data } = await axios.get(`/chat_list/${id}`)
        this.save({
            chatList: data
        })
    }

    fetchHistoryList = async () => {
        const { data } = await axios.get(`/message/group/${this.currentChatId}`)
        console.log(data)
        this.save({
            messageList: data
        })
    }
}

export default new ChatStore()
