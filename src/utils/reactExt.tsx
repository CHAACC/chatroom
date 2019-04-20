import * as React from 'react'
import { action } from 'mobx'

export class StoreExt {
    @action
    public save = (params: object) => {
        for (const key in params) {
            this[key] = params[key]
        }
    }
}
