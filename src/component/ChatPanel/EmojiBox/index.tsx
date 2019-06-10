import React from 'react'

import styles from './index.module.scss'
import { emojiAlias, genIndexArr } from '../../../utils/emoji'

interface IProps {
    selectEmoji: (name: string) => void
}

function EmojiBox({ selectEmoji }: IProps) {
    return (
        <div className={styles.emojiBox}>
            {genIndexArr(50).map((item, i) => (
                <div
                    key={i}
                    data-name={emojiAlias[item]}
                    onClick={() => selectEmoji(emojiAlias[item])}
                >
                    <div
                        style={{ backgroundPosition: `left -${item * 30}px` }}
                    />
                </div>
            ))}
        </div>
    )
}

export default EmojiBox
