// projects.js - all the reducer logic that affects the list of projects.
import * as actions from '../actions/actions';

const projects = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_PROJECTS:
            return [
                ...state,
                ...action.payload
            ];
        case actions.CLEAR_PROJECTS:
            return [];
        default:
            return state;
    }
}

export default projects