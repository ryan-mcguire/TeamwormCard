// actions.js

export const addProjects = (newProjects) => {
    console.log("in actions.addProjects arg has " + newProjects.length);
    return {
        type: 'ADD_PROJECTS',
        newProjects                 // Expecting a list of strings
    }
}
export const clearProjects = () => {
    return {
        type: 'CLEAR_PROJECTS'
    }
}


export const addTasks = (newTasks) => {
    console.log("in actions.addTasks arg has " + newTasks.length);
    return {
        type: 'ADD_TASKS',
        newTasks                 // Expecting a list of strings
    }
}
export const clearTasks = () => {
    return {
        type: 'CLEAR_TASKS'
    }
}


export const addColumns = (newColumns) => {
    console.log("in actions.addColumns arg has " + newColumns.length);
    return {
        type: 'ADD_COLUMNS',
        newColumns                 // Expecting a list of strings
    }
}
export const clearColumns = () => {
    return {
        type: 'CLEAR_COLUMNS'
    }
}


export const addTaskLists = (newLists) => {
    console.log("in actions.addTaskLists arg has " + newLists.length);
    return {
        type: 'ADD_TASKLISTS',
        newLists                 // Expecting a list of strings
    }
}
export const clearTaskLists = () => {
    return {
        type: 'CLEAR_TASKLISTS'
    }
}


export const setSelectedProject = (selectedProjectId) => {
    return {
        type: 'SET_SELECTED_PROJECT',
        selectedProjectId                 // Expecting a string
    }
}
export const setSelectedTaskList = (selectedTaskListId) => {
    return {
        type: 'SET_SELECTED_TASKLIST',
        selectedTaskListId                 // Expecting a string
    }
}
export const setSelectedColumn = (selectedColumnId) => {
    return {
        type: 'SET_SELECTED_COLUMN',
        selectedColumnId                 // Expecting a string
    }
}
export const setSelectedTask = (selectedTaskId) => {
    return {
        type: 'SET_SELECTED_TASK',
        selectedTaskId                 // Expecting a string
    }
}

export const comleteProject = () => {
    return {
        type: 'COMPLETE_PROJECT',
    }
}
export const comleteTaskList = () => {
    return {
        type: 'COMPLETE_TASKLIST',
    }
}
export const comleteColumn = () => {
    return {
        type: 'COMPLETE_COLUMN',
    }
}
export const comleteTask = () => {
    return {
        type: 'COMPLETE_TASK',
    }
}
