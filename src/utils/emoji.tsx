export const emojiAlias = [
    '呵呵',
    '哈哈',
    '吐舌',
    '啊',
    '酷',
    '怒',
    '开心',
    '汗',
    '泪',
    '黑线',
    '鄙视',
    '不高兴',
    '真棒',
    '钱',
    '疑问',
    '阴险',
    '吐',
    '咦',
    '委屈',
    '花心',
    '呼',
    '笑眼',
    '冷',
    '太开心',
    '滑稽',
    '勉强',
    '狂汗',
    '乖',
    '睡觉',
    '惊哭',
    '升起',
    '惊讶',
    '喷',
    '爱心',
    '心碎',
    '玫瑰',
    '礼物',
    '星星月亮',
    '太阳',
    '音乐',
    '灯泡',
    '蛋糕',
    '彩虹',
    '钱币',
    '咖啡',
    'haha',
    '胜利',
    '大拇指',
    '弱',
    'ok'
]

export const genIndexArr = (length: number) => {
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push(i)
    }
    return arr
}

export function convertExpression(txt) {
    return txt.replace(/#\(([\u4e00-\u9fa5a-z]+)\)/g, (r, e) => {
        const index = emojiAlias.indexOf(e)
        if (index !== -1) {
            const htmlString = `<div class="emoji" style="background-position: left ${-30 *
                index}px;" alt="${r}">`
            return htmlString
        }
        return r
    })
}
