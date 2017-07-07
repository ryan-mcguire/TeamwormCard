// TaskListsContainer.js

import { connect } from 'react-redux'
import { setSelectedTaskList } from '../actions/actions'
import TaskLists from '../components/TaskLists'

const mapStateToProps = (state) => {
    return ({
        tasklists: state.tasklists
    });
}

const mapDispatchToProps = (dispatch) => {
    return { setSelectedTaskList: (selectedTaskList) => { dispatch(setSelectedTaskList(selectedTaskList)); } };
}

const TaskListsContainer = connect(mapStateToProps, mapDispatchToProps)(TaskLists);

export default TaskListsContainer

