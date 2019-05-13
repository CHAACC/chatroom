import { ChatStore as ChatStoreModel } from './index'

export as namespace IChatStore

export interface ChatStore extends ChatStoreModel {}

interface ImessageItem {
    id?: number
    message?: string
    created_at?: string
    to_group_id?: number
    from_user_id?: number
    username?: string
    avatar?: string
}

interface ILastMessageInfo {
    from_user_id?: number
    from_user_name?: string
    last_message?: string
}

interface IGroup {
    id?: number
    name?: string
    created_at?: string
    creator_id?: number
    group_notice?: string
    last_message?: string
    from_user_name?: string
    lastest_message_info?: ILastMessageInfo
}

interface IFriend {
    id: number
    name: string
    created_at: string
    avatar: string
    status: 0 | 1
}

interface IChatItem {
    groups?: IGroup[]
    friends?: IFriend[]
}
