import { Item, ListOfLists, ListState } from "../types/interfaces";

type ACTION_TYPES =
    | { type: "add"; payload: ListState }
    | { type: "remove"; payload: { id: Item["id"] } }
    | { type: "edit"; payload: { id: Item["id"] } }

export const listOfListsReducer = (state: ListOfLists, action: ACTION_TYPES) => {
    switch (action.type) {
        case "add":
            return {
                ...state.lists,
                list: {
                    listId: +new Date,
                    itemCount: 0,
                    items: [],
                    completed: 0,
                    pending: 0,
                    total: 0
                }
            }
            default: return state                                 
    }
}