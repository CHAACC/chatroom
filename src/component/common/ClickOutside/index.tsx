import React from 'react'

export interface ClickOutsideProps {
    onClickOutSide: () => void
    className?: string
    clickele?: HTMLElement
}

export default class ClickOutside extends React.Component<ClickOutsideProps> {
    containerRef: HTMLDivElement
    componentDidMount() {
        document.addEventListener('click', this.handle, false)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handle, false)
    }

    handle = e => {
        const { onClickOutSide, clickele } = this.props
        const el = this.containerRef
        if (!el || clickele === e.target) {
            return
        }
        if (!el.contains(e.target)) {
            onClickOutSide()
        }
    }

    render() {
        const { children, className, onClickOutSide, ...props } = this.props
        return (
            <div className={className} {...props} ref={ref => (this.containerRef = ref)}>
                {children}
            </div>
        )
    }
}
