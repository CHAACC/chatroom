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
}

interface chatItem {
    created_at?: string
    creator_id?: number
    group_notice?: string
    id?: number
    name?: string
    last_message?: string
}
