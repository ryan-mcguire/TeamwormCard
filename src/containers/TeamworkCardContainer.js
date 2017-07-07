// TeamworkCardContainer - This container contributes no mark up.  It's just to act as a smart container for the presentation components.

import {connect} from 'react-redux'
import {
    addProjects,
    clearProjects,
    addTasks,
    clearTasks,
    addColumns,
    clearColumns,
    addTaskLists,
    clearTaskLists,
    setSelectedProject,
    setSelectedTaskList,
    setSelectedColumn,
    setSelectedTask,
    comleteProject,
    comleteTaskList,
    comleteColumn,
    comleteTask,
} from '../actions/actions'
import TeamworkCard from '../components/TeamworkCard'

const mapStateToProps = (state) => {
    return ({
        projects: state.projects,
        tasklists: state.tasklists,
        columns: state.columns,
        tasks: state.tasks,
        selectedItems: state.selectedItems
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProjects: (newProjects) => { dispatch(addProjects(newProjects)); },
        clearProjects: () => { dispatch(clearProjects()); },
        addColumns: (newColumns) => { dispatch(addColumns(newColumns)); },
        clearColumns: () => { dispatch(clearColumns()); },
        addTasks: (newTasks) => { dispatch(addTasks(newTasks)); },
        clearTasks: () => { dispatch(clearTasks()); },
        addTaskLists: (newLists) => { dispatch(addTaskLists(newLists)); },
        clearTaskLists: () => { dispatch(clearTaskLists()); },
        setSelectedProject: (selectedProject) => { dispatch(setSelectedProject(selectedProject)); },
        setSelectedTaskList: (selectedTaskList) => { dispatch(setSelectedTaskList(selectedTaskList)); },
        setSelectedColumn: (selectedColumn) => { dispatch(setSelectedColumn(selectedColumn)); },
        setSelectedTask: (selectedTask) => { dispatch(setSelectedTask(selectedTask)); },
        completeProject: () => { dispatch(comleteProject()); },
        completeTaskList: () => { dispatch(comleteTaskList()); },
        completeColumn: () => { dispatch(comleteColumn()); },
        completeTask: () => { dispatch(comleteTask()); },
    };
}

const TeamworkCardContainer = connect(mapStateToProps, mapDispatchToProps)(TeamworkCard);

export default TeamworkCardContainer
