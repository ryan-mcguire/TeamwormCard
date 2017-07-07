// projects.js - all the reducer logic that affects the list of projects.

const projects = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROJECTS':
            return [
                ...state,
                ...action.newProjects
            ];
        case 'CLEAR_PROJECTS':
            return [];
        default:
            return state;
    }
}

export default projects