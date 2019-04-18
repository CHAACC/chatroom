import { observable, action, computed } from 'mobx'
import axios from 'axios'
import {get} from 'lodash'
import {stringify} from 'qs'

import { StoreExt } from '../../utils/reactExt'

export class ChatStore extends StoreExt {
    @observable messageList: IChatStore.ImessageItem[] = []
    @observable chatList: IChatStore.chatItem[] = []
    @observable currentChatId: number = null
    @observable inputValue: string = ''

    @observable page: number = 1
    @observable size: number = 10

    @computed get lastMessage() {
        return get(this.messageList, `[${this.messageList.length - 1}].message`)
    }

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
        return data
    }

    // 获取历史消息列表
    fetchHistoryList = async () => {
        const query = {
            page: this.page,
            size:this.size
        }
        const { data } = await axios.get(`/message/group/${this.currentChatId}?${stringify(query)}`)
        // 倒序
        const reverseData = data.reverse()
        // 插到前面
        const messageList = [...reverseData, ...this.messageList]
        this.save({
            messageList
        })
    }
}

export default new ChatStore()
