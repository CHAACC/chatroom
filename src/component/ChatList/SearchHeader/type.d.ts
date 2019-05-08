export interface IStoreProps {
    searchListVisible?: boolean
    setSearchListVisible?: (visible: boolean) => void
}

export interface IUser {
    id: number
    name: string
    avatar: string
}
export interface IGroup {
    id: number
    name: string
}
export interface IResult {
    users: IUser[]
    groups: IGroup[]
}
