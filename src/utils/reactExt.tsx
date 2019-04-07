import * as React from 'react'
import { action } from 'mobx'

export class ComponentExt<P = {}, S = {}> extends React.Component<P, S> {
    @action
    save = (params: object) => {
        for (const key in params) {
            this[key] = params[key]
        }
    }
}

export class StoreExt {
    @action
    public save = (params: object) => {
        for (const key in params) {
            this[key] = params[key]
        }
    }
}
