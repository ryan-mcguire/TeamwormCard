// columns.js - all the reducer logic that affects the list of board columns.

const columns = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COLUMNS':
            return [
                ...state,
                ...action.newColumns
            ];
        case 'CLEAR_COLUMNS':
            return [];
        default:
            return state;
    }
}

export default columns
