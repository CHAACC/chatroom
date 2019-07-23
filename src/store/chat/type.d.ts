import { ChatStore as ChatStoreModel } from './index'

export as namespace IChatStore

export interface ChatStore extends ChatStoreModel {}

interface ImessageItem {
    id?: number
    is_private: 1 | 0
    message?: string
    created_at?: string
    to_user_id?: number
    to_group_id?: string
    from_user_id?: number
    username?: string
    avatar?: string
    type?: 0 | 1 | 2
    url?: string
}

interface ILastMessageInfo {
    from_user_id?: number
    from_user_name?: string
    last_message?: string
    created_at?: string
}

interface IGroup {
    id: number
    to_group_id?: string
    name: string
    created_at: string
    creator_id?: number
    group_notice?: string
    lastest_message_info: ILastMessageInfo
}

interface IFriend {
    id: number
    name: string
    created_at: string
    avatar?: string
    status?: 0 | 1
    lastest_message_info: ILastMessageInfo
}

// 群聊或者私聊 ？代表不是共有
interface IChat {
    id: number
    name: string
    created_at: string
    lastest_message_info: ILastMessageInfo
    unread: number

    type?: number

    to_group_id?: string
    creator_id?: number
    group_notice?: string

    avatar?: string
    status?: 0 | 1
}

interface IChatList {
    groups?: IChat[]
    friends?: IChat[]
}

interface IUpdateGroupInfoParams {
    name?: string
    avatar?: string
}
