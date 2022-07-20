export interface Item {
    id: number,
    name: string,
    checked: boolean
}

export interface ListState {
    listId: number,
    itemCount: number,
    items: Item[],
    completed: number,
    pending: number,
    total: number
}

export interface ListOfLists {
    lists: ListState[],
    currentList: number
}