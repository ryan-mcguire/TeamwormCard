// columns.js - all the reducer logic that affects the list of board columns.
import * as actions from '../actions/actions';

const columns = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_COLUMNS:
            return [
                ...state,
                ...action.payload
            ];
        case actions.COMPLETE_PROJECT:
        case actions.CLEAR_COLUMNS:
            return [];
        default:
            return state;
    }
}

export default columns
