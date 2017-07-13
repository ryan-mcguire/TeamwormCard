// tasklists.js - all the reducer logic that affects the list of tasklists.
import * as actions from '../actions/actions';

const tasklists = (state = [], action) => {
    switch (action.type) {
        //case actions.SET_SELECTED_PROJECT:
        //    // The data from the tasklists call to teamwork should be in the first element 
        //    // in the action.payload array.
        //    console.log("In taskslists reducer...");
        //    console.log("    action.payload type:  " + typeof(action.payload) );
        //    console.log("    action.payload has keys: " + Object.keys(action.payload));
        //    console.log("    action.payload.response has keys: " + Object.keys(action.payload.response));

        //    return [ ...state, ...action.payload1.data["tasklists"] ]; 
        case actions.ADD_TASKLISTS:
            return [
                ...state,
                ...action.payload
            ];
        case actions.COMPLETE_PROJECT:
        case actions.CLEAR_TASKLISTS:
            return [];
        default:
            return state;
    }
}

export default tasklists