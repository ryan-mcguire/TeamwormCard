// actions.js

import axios from 'axios';

export const ADD_PROJECTS = 'ADD_PROJECTS';
export const addProjects = (newProjects) => {
    console.log("in actions.addProjects arg has " + newProjects.length);
    return {
        type: ADD_PROJECTS,
        payload: newProjects                 // Expecting a list of strings
    }
}

export const CLEAR_PROJECTS = 'CLEAR_PROJECTS';
export const clearProjects = () => {
    return {
        type: CLEAR_PROJECTS
    }
}


export const ADD_TASKS = 'ADD_TASKS';
export const addTasks = (newTasks) => {
    console.log("in actions.addTasks arg has " + newTasks.length);
    return {
        type: ADD_TASKS,
        payload: newTasks                 // Expecting a list of strings
    }
}

export const CLEAR_TASKS = 'CLEAR_TASKS';
export const clearTasks = () => {
    return {
        type: CLEAR_TASKS
    }
}


export const ADD_COLUMNS = 'ADD_COLUMNS';
export const addColumns = (newColumns) => {
    console.log("in actions.addColumns arg has " + newColumns.length);
    return {
        type: ADD_COLUMNS,
        payload: newColumns                 // Expecting a list of strings
    }
}

export const CLEAR_COLUMNS = 'CLEAR_COLUMNS';
export const clearColumns = () => {
    return {
        type: CLEAR_COLUMNS
    }
}


export const ADD_TASKLISTS = 'ADD_TASKLISTS';
export const addTaskLists = (newLists) => {
    console.log("in actions.addTaskLists arg has " + newLists.length);
    return {
        type: ADD_TASKLISTS,
        payload: newLists                 // Expecting a list of strings
    }
}

export const CLEAR_TASKLISTS = 'CLEAR_TASKLISTS';
export const clearTaskLists = () => {
    return {
        type: CLEAR_TASKLISTS
    }
}


export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT';
export const setSelectedProject = (selectedProjectId) => {
    const url1 = "http://clevelandclinic.teamwork.com/projects/" + selectedProjectId + "/tasklists.json";
    const url2 = "http://clevelandclinic.teamwork.com/projects/" + selectedProjectId + "/boards/columns.json";
    const options = { 
        "headers": {
            "Authorization": "Basic dHdwX1NWa0c4MGprZmJXa0E4UE4xb1VWRXBYT2JLOTU6",
            "Accept": "text/plain",
            "Ryan": "McGuire",
            "Content-Type": "text/plain"
        }
    };

    // Promise.all returns a promise that completes when all the promises in the list complete.
    const request = Promise.all( [ axios.get(url1, options), 
                                   axios.get(url2, options) ] );
    const request1 = axios.get(url1, options);
    const request2 = axios.get(url2, options);
    //const request = axios.get(url1);

    // Returning a Promise in the payload triggers the ReduxPromise middleware to 
    // wait for the promise to complete.  It then replaces the payload with the
    // results of the promise:  [ data from the tasklists call, data from the columns call ]
    return {
        type: SET_SELECTED_PROJECT,
        //payload: request,
        //payload1: request1,
        //payload2: request2
        payload: selectedProjectId
    }
}

export const SET_SELECTED_TASKLIST = 'SET_SELECTED_TASKLIST';
export const setSelectedTaskList = (selectedTaskListId) => {
    return {
        type: SET_SELECTED_TASKLIST,
        payload: selectedTaskListId                 // Expecting a string
    }
}

export const SET_SELECTED_COLUMN = 'SET_SELECTED_COLUMN';
export const setSelectedColumn = (selectedColumnId) => {
    return {
        type: SET_SELECTED_COLUMN,
        payload: selectedColumnId                 // Expecting a string
    }
}

export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';
export const setSelectedTask = (selectedTaskId) => {
    return {
        type: SET_SELECTED_TASK,
        payload: selectedTaskId                 // Expecting a string
    }
}

export const COMPLETE_PROJECT = 'COMPLETE_PROJECT';
export const comleteProject = () => {
    return {
        type: COMPLETE_PROJECT
    }
}

export const COMPLETE_TASKLIST = 'COMPLETE_TASKLIST';
export const comleteTaskList = () => {
    return {
        type: COMPLETE_TASKLIST
    }
}

export const COMPLETE_COLUMN = 'COMPLETE_COLUMN';
export const comleteColumn = () => {
    return {
        type: COMPLETE_COLUMN
    }
}

export const COMPLETE_TASK = 'COMPLETE_TASK';
export const comleteTask = () => {
    return {
        type: COMPLETE_TASK
    }
}
