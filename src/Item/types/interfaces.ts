export interface Item {
    id: number,
    name: string,
    checked: boolean
}

export interface ListState {
    listId: number,
    listName: string,
    itemCount: number,
    items: Item[],
    completed: number,
    pending: number,
    arsTotal: number,
    usdTotal: number
}

export interface ListOfLists {
    lists: ListState[],
    currentList: number
}