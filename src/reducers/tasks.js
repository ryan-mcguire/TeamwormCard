// tasks.js
import * as actions from '../actions/actions';

const tasks = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_TASKS:
            return [
                ...state,
                ...action.payload
            ];
        case actions.COMPLETE_TASKLIST:
        case actions.COMPLETE_PROJECT:
        case actions.CLEAR_TASKS:
            return [];
        default:
            return state;
    }
}

export default tasks