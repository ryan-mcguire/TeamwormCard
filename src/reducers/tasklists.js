// tasklists.js - all the reducer logic that affects the list of tasklists.

const tasklists = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASKLISTS':
            return [
                ...state,
                ...action.newLists
            ];
        case 'CLEAR_TASKLISTS':
            return [];
        default:
            return state;
    }
}

export default tasklists