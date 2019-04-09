import { ChatStore as ChatStoreModel } from './index'

export as namespace IChatStore

export interface ChatStore extends ChatStoreModel {}

interface ImessageItem {
    message_id: number
    message: string
}
