import { observable, action, computed, runInAction } from 'mobx'
import { isEmpty } from 'lodash'
import { stringify } from 'qs'

import req from '../../utils/request'

export class ChatStore {
    // 消息列表
    @observable messageList: IChatStore.ImessageItem[] = []
    @action pushMessage = (message: IChatStore.ImessageItem) => {
        this.messageList.push(message)
    }

    // 会话列表
    @observable chatList: IChatStore.chatItem[] = []
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
    @action setChatList = (groupId: number, params: IChatStore.chatItem) => {
        const oldItem = this.chatList.find(item => item.id === groupId)
        const oldItemIndex = this.chatList.findIndex(
            item => item.id === groupId
        )

        const newItem = {
            ...oldItem,
            ...params
        }
        this.chatList.splice(oldItemIndex, 1, newItem)
    }

    // 当前会话
    @observable currentChatId: number = null
    @computed get currentChatItem() {
        return this.chatList.find(item => item.id === this.currentChatId)
    }
    @action changeCurrentChatId = (id: number) => {
        this.currentChatId = id
        this.firstFetchMessages = false
    }

    // 输入框
    @observable inputValue: string = ''
    @action setInputValue = (value: string) => {
        this.inputValue = value
    }

    // 消息分页
    @observable page: number = 1
    @action setPage = (page: number) => {
        this.page = page
    }
    size: number = 20

    // 初始化滚动条到最底部用到
    @observable firstFetchMessages: boolean = false

    // 滚动条滑到底部，消息列表更新和发消息时候触发
    @observable scrollBottomFlag: boolean = false
    @action setScrollBottomFlag = () => {
        this.scrollBottomFlag = !this.scrollBottomFlag
    }

    // 是否是尾页
    @observable isEndPage: boolean = false

    @action
    onSelectChat = (id: number) => {
        this.changeCurrentChatId(id)
        this.page = 1
        this.isEndPage = false
        this.fetchHistoryList(true)
    }

    /**
     * 获取历史消息列表,登录和切换对话changeChat=true
     */
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
            this.firstFetchMessages = true
        })
    }

    /**
     * 获取群列表和第一个群的消息列表
     */
    fetchChatListAndFirstMessageList = async () => {
        await this.fetchChatList()
        this.currentChatId = this.chatList[0].id
        // 获取历史消息
        await this.fetchHistoryList(true)
    }
}

export default new ChatStore()
