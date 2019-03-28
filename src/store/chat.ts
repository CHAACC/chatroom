import { observable, action } from 'mobx'

class ChatStore {
    @observable messageList: IChat.ImessageItem[] = []

    @action
    pushMessage = (message: IChat.ImessageItem) => {
        console.log(message)
        this.messageList.push(message)
    }
}

export default new ChatStore()
