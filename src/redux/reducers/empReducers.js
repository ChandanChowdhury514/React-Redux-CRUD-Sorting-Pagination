import { ADD_USER, DELETE_USER, UPDATE_USER } from "../actionType";

const empReducers = (state='', action) =>{
    //console.log('gggg')
    switch(action.type){
        case "ADD_USER":
            return {
                ...state,
                items:[...state.items,action.payload]
            }
            case "DELETE_USER":
            return {
                ...state,
                items: state.items.filter((user) => user.id != action.payload)
            }
            case "UPDATE_USER":
                return {
                    ...state,
                    items: state.items.map(user => user.id === action.payload.id ? action.payload : user)
                }
            default:
            return state
    }
}

export default empReducers;