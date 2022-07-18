export interface Item {
    id: number,
    name: string,
    checked: boolean
}

export interface ListState {
    itemCount: number,
    items: Item[],
    completed: number,
    pending: number,

}

export interface ListOfLists {
    lists: ListState[]
}