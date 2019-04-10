import { ChatStore as ChatStoreModel } from './index'

export as namespace IChatStore

export interface ChatStore extends ChatStoreModel {}

interface ImessageItem {
    id?: number
    message?: string
    created_at?: string
    to_group_id?: number
    from_user_id?: number
}
