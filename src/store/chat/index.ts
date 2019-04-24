import { observable, action, computed, runInAction } from 'mobx'
import { isEmpty } from 'lodash'
import { stringify } from 'qs'

import { StoreExt } from '../../utils/reactExt'
import req from '../../utils/request'

export class ChatStore extends StoreExt {
    @observable messageList: IChatStore.ImessageItem[] = []
    @observable chatList: IChatStore.chatItem[] = []
    @observable currentChatId: number = null
    @observable inputValue: string = ''

    @observable page: number = 1
    @observable size: number = 10

    // 初始化滚动条到最底部用到
    @observable hasSetScrollBottom: boolean = false
    // 是否是尾页
    @observable isEndPage: boolean = false

    @computed get currentChatItem() {
        return this.chatList.find(item => item.id === this.currentChatId)
    }

    @action
    setInputValue = (value: string) => {
        this.inputValue = value
    }

    @action
    pushMessage = (message: IChatStore.ImessageItem) => {
        this.messageList.push(message)
    }

    @action
    changeCurrentChatId = (id: number) => {
        this.currentChatId = id
        this.hasSetScrollBottom = false
    }

    @action
    onSelectChat = (id: number) => {
        this.changeCurrentChatId(id)
        this.page = 1
        this.isEndPage = false
        this.fetchHistoryList(true)
    }

    /**
     * 获取聊天人列表
     */
    fetchChatList = async () => {
        const { data } = await req.get<IChatStore.chatItem[]>(`/chat_list`)
        runInAction(() => {
            this.chatList = data
        })
        return data
    }

    // 获取历史消息列表
    fetchHistoryList = async (changeChat?: boolean) => {
        const query = {
            page: this.page,
            size: this.size
        }
        const { data } = await req.get<IChatStore.ImessageItem[]>(
            `/message/group/${this.currentChatId}?${stringify(query)}`
        )
        runInAction(() => {
            // 空数据则为最后一页
            if (isEmpty(data)) {
                this.isEndPage = true
            }
            // 倒序
            const reverseData = data.reverse()
            // 插到前面
            let messageList: IChatStore.ImessageItem[]
            if (changeChat) {
                messageList = reverseData
            } else {
                messageList = [...reverseData, ...this.messageList]
            }
            this.messageList = messageList
            this.hasSetScrollBottom = true
        })
    }
}

export default new ChatStore()
