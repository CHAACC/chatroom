import { GlobalStore as GlobalStoreModel } from './index'

export as namespace IGlobalStore

export interface GlobalStore extends GlobalStoreModel {}

interface onlineListItem {
    id: number
    name: string
    avatar: string
}
