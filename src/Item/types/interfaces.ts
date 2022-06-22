export interface Item {
    id: number,
    name: string,
    checked: boolean
}

export interface ItemState {
    itemCount: number,
    items: Item[],
    completed: number,
    pending: number
}