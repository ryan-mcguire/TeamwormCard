// TeamworkApp.js
import {combineReducers} from 'redux'
import projects from './projects'
import tasks from './tasks'
import columns from './columns'
import tasklists from './tasklists'
import selectedItems from './selecteditems'

// Some place to tie all the reducer together.
const TeamworkApp = combineReducers ({
    projects,               // ES6 syntax sugar.  This line is that same as   projects: projects,
    tasks,
    tasklists,
    columns,
    selectedItems
});

export default TeamworkApp