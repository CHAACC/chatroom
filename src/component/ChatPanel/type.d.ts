export as namespace IChat

export interface ImessageItem {
    message_id: number
    message: string
}

export interface IStoreProps {
    messageList?: ImessageItem[]
    pushMessage?: (message) => void
}

export interface IProps extends IStoreProps {}
