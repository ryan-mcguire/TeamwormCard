// selecteditems.js - all the reducer logic that affects the selected items: project(s), tasklist(s), bourd column(s), task(s).

const selectedItems = (state = {}, action) => {
    // Start with the old state as the default. 
    var newState = {...state};

    /// ...and then just change what needs to be changed.
    switch (action.type) {
        case 'SET_SELECTED_PROJECT':
            newState["project"] = action.selectedProjectId;
            newState["projectIsNew"] = true;
            break;
        case 'SET_SELECTED_TASKLIST':
            newState["tasklist"] = action.selectedTaskListId;
            newState["tasklistIsNew"] = true;
            break;
        case 'SET_SELECTED_COLUMN':
            newState["column"] = action.selectedColumnId;
            newState["columnIsNew"] = true;
            break;
        case 'SET_SELECTED_TASK':
            newState["task"] = action.selectedTaskId;
            newState["taskIsNew"] = true;
            break;
        case 'COMPLETE_PROJECT':
            newState["projectIsNew"] = false;
            break;
        case 'COMPLETE_TASKLIST':
            newState["tasklistIsNew"] = false;
            break;
        case 'COMPLETE_COLUMN':
            newState["columnIsNew"] = false;
            break;
        case 'COMPLETE_TASK':
            newState["taskIsNew"] = false;
            break;
        default:
            break;
    }
    return newState;
}

export default selectedItems