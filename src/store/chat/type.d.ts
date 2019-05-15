import { ChatStore as ChatStoreModel } from './index'

export as namespace IChatStore

export interface ChatStore extends ChatStoreModel {}

interface ImessageItem {
    id?: number
    type: 1 | 0
    message?: string
    created_at?: string
    to_user_id?: number
    to_group_id?: string
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
    id: number
    to_group_id?: string
    name: string
    created_at: string
    creator_id?: number
    group_notice?: string
    from_user_name?: string
    lastest_message_info?: ILastMessageInfo
}

interface IFriend {
    id: number
    name: string
    created_at: string
    avatar?: string
    status?: 0 | 1
    lastest_message_info?: ILastMessageInfo
}

interface IChatItem {
    groups?: IGroup[]
    friends?: IFriend[]
}
