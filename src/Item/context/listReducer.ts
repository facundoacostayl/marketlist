import { ListState, Item } from "../types/interfaces";

type ACTION_TYPES =
  | { type: "clone"; payload: ListState }
  | { type: "add"; payload: Item["name"] }
  | { type: "remove"; payload: { id: Item["id"] } }
  | { type: "toggle"; payload: { id: Item["id"] } };

export const listReducer = (state: ListState, action: ACTION_TYPES) => {
  switch (action.type) {
    case "clone":
      return {
        ...state,
        listId: action.payload.listId,
        itemCount: action.payload.itemCount,
        items: action.payload.items,
        completed: action.payload.completed,
        pending: action.payload.pending,
        total: action.payload.total,
      };

    case "add":
      return {
        ...state,
        listId: state.listId ? state.listId : +new Date(),
        itemCount: state.itemCount++,
        items: [
          ...state.items,
          { id: +new Date(), name: action.payload, checked: false },
        ],
        pending: state.pending++,
      };

    case "remove":
      return {
        ...state,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : state.itemCount,
        items: state.items.filter(({ ...item }) => {
          return item.id !== action.payload.id;
        }),
        pending:
          !state.items.find((item) => item.id === action.payload.id)?.checked &&
          state.pending > 0
            ? state.pending - 1
            : state.pending,
        completed:
          state.items.find((item) => item.id === action.payload.id)?.checked &&
          state.completed > 0
            ? state.completed - 1
            : state.completed,
      };

      case "toggle":
        return {
          ...state,
          items: state.items.map(({...item}) => {
              if(item.id === action.payload.id) {
                item.checked = !item.checked
              }
              return item;
          }),
          pending: !state.items.find(item => item.id === action.payload.id)?.checked && state.pending > 0 ? state.pending - 1 : state.pending++,
          completed: state.items.find(item => item.id === action.payload.id)?.checked && state.completed > 0 ? state.completed - 1 : state.completed++,
        }

    default:
      return state;
  }
};
