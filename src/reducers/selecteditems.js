// selecteditems.js - all the reducer logic that affects the selected items: project(s), tasklist(s), bourd column(s), task(s).
import * as actions from '../actions/actions';

const selectedItems = (state = {}, action) => {
    // Start with the old state as the default. 
    var newState = {...state};

    /// ...and then just change what needs to be changed.
    switch (action.type) {
        case actions.SET_SELECTED_PROJECT:
            newState["project"] = action.payload;
            newState["projectIsNew"] = true;
            break;
        case actions.SET_SELECTED_TASKLIST:
            newState["tasklist"] = action.payload;
            newState["tasklistIsNew"] = true;
            break;
        case actions.SET_SELECTED_COLUMN:
            newState["column"] = action.payload;
            newState["columnIsNew"] = true;
            break;
        case actions.SET_SELECTED_TASK:
            newState["task"] = action.payload;
            newState["taskIsNew"] = true;
            break;
        case actions.COMPLETE_PROJECT:
            newState["projectIsNew"] = false;
            break;
        case actions.COMPLETE_TASKLIST:
            newState["tasklistIsNew"] = false;
            break;
        case actions.COMPLETE_COLUMN:
            newState["columnIsNew"] = false;
            break;
        case actions.COMPLETE_TASK:
            newState["taskIsNew"] = false;
            break;
        default:
            break;
    }
    return newState;
}

export default selectedItems