import * as React from 'react'

import style from './index.module.scss'
import ContentEditable from 'react-contenteditable'

interface IProps {
    value: string
    onChange: (value: string) => void
    onKeyDown: (e) => void
}

export default class Editor extends React.Component<IProps> {
    contentEditable: React.ReactNode

    render() {
        const { value, onChange, onKeyDown } = this.props
        return (
            <ContentEditable
                className={style.editor}
                innerRef={ref => (this.contentEditable = ref)}
                html={value} // innerHTML of the editable div
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value)
                }
                onKeyDown={onKeyDown}
            />
        )
    }
}
