// tasks.js

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASKS':
            return [
                ...state,
                ...action.newTasks
            ];
        case 'CLEAR_TASKS':
            return [];
        default:
            return state;
    }
}

export default tasks