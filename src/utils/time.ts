import moment from 'moment'

/**
 * 格式化时间，支持显示昨天
 * @param messageCreatedAt 消息创建时间
 */
export const formatTime = (messageCreatedAt: string) => {
    const today = moment(moment().format('YYYY-MM-DD')),
        messageMoment = moment(messageCreatedAt),
        todayDiffCreatedHours = today.diff(messageMoment, 'hours')
    let formatedTime: string
    if (todayDiffCreatedHours <= 0) {
        // 23:00-1:00之间
        if (today.diff(messageMoment, 'minute') > 0) {
            // 昨天
            formatedTime = `昨天 ${messageMoment.format('H:mm')}`
        } else {
            // 今天
            formatedTime = messageMoment.format('H:mm')
        }
    } else if (todayDiffCreatedHours > 0 && todayDiffCreatedHours < 24) {
        // 昨天
        formatedTime = `昨天 ${messageMoment.format('H:mm')}`
    } else {
        formatedTime = messageMoment.format('M-DD H:mm')
    }
    return formatedTime
}
