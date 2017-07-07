// TeamworkCard.js
import React, { Component } from 'react';
import './TeamworkCard.css';
import SortTable from './SortTable.js'
import ProjectsContainer from '../containers/ProjectsContainer'
import TaskListsContainer from '../containers/TaskListsContainer'
import getDataAsync from '../lib/GetDataAsync'

export default class TeamworkCard extends Component {
    constructor(props) {
        super(props);

        this.blockedTaskSortcol = 0;
        this.blockedTaskSortdir = 'asc';

        this.blockedTaskColspecs = [
            { 
                selectfunc: (d) => {
                    if (!d.hasOwnProperty("tags")) {
                        return false;
                    }
                    var blocked=false; 
                    d.tags.map((tag) => {return(blocked |= (tag.name==="BLOCKED"))}); 
                    return blocked; 
                },
                key: "Name", 
                sortfunc: (d) => { return d["content"]; }, 
                dispfunc: (d) => { return d["content"]; }, 
                format: 'text' 
            }, 
            //{ 
            //    key: "Project", 
            //    sortfunc: (d) => { return d["project-name"]; }, 
            //    dispfunc: (d) => { return d["project-name"]; }, 
            //    format: 'text' 
            //},
            //{ 
            //    key: "Task List", 
            //    sortfunc: (d) => { return d["todo-list-name"]; }, 
            //    dispfunc: (d) => { return d["todo-list-name"]; }, 
            //    format: 'text' 
            //},
            { 
                key: "Status", 
                sortfunc: (d) => { return d["status"]; }, 
                dispfunc: (d) => { return d["status"]; }, 
                format: 'text' 
            },
            {
                key: "Tags",
                sortfunc: (d) => { return d.hasOwnProperty("tags") ? d["tags"].map((tag) => tag.name).sort().join(", ") : ""; }, 
                dispfunc: (d) => { return d.hasOwnProperty("tags") ? d["tags"].map((tag) => tag.name).sort().join(", ") : ""; }, 
                format: "text"
            },
            {
                key: "Assigned To",
                sortfunc: (d) => { return d["responsible-party-names"]; }, 
                dispfunc: (d) => { return d["responsible-party-names"]; }, 
                format: "text"
            }
        ];


        this.boardTaskSortcol = 0;
        this.boardTaskSortdir = 'asc';

        this.boardTaskColspecs = [
            { 
                key: "Board Column (in disp order)", 
                sortfunc: (d) => { 
                    return d.hasOwnProperty("boardColumn") 
                           ? (d["boardColumn"].hasOwnProperty("displayOrder") 
                              ? d["boardColumn"]["displayOrder"] 
                              : d["boardColumn"]["name"])
                           : " "; 
                },
                dispfunc: (d) => { return d.hasOwnProperty("boardColumn") ? d["boardColumn"]["name"] : " "; }, 
                format: 'text' 
            }, 
            { 
                key: "Name", 
                sortfunc: (d) => { return d["content"]; }, 
                dispfunc: (d) => { return d["content"]; }, 
                format: 'text' 
            }, 
            //{ 
            //    key: "Project", 
            //    sortfunc: (d) => { return d["project-name"]; }, 
            //    dispfunc: (d) => { return d["project-name"]; }, 
            //    format: 'text' 
            //},
            //{ 
            //    key: "Task List", 
            //    sortfunc: (d) => { return d["todo-list-name"]; }, 
            //    dispfunc: (d) => { return d["todo-list-name"]; }, 
            //    format: 'text' 
            //},
            { 
                key: "Status", 
                sortfunc: (d) => { return d["status"]; }, 
                dispfunc: (d) => { return d["status"]; }, 
                format: 'text' 
            },
            {
                key: "Tags",
                sortfunc: (d) => { return d.hasOwnProperty("tags") ? d["tags"].map((tag) => tag.name).sort().join(", ") : ""; }, 
                dispfunc: (d) => { return d.hasOwnProperty("tags") ? d["tags"].map((tag) => tag.name).sort().join(", ") : ""; }, 
                format: "text"
            },
            {
                key: "Assigned To",
                sortfunc: (d) => { return d["responsible-party-names"]; }, 
                dispfunc: (d) => { return d["responsible-party-names"]; }, 
                format: "text"
            }
        ];

        this.rendercount = 0;
    }


    assignDisplayOrderToTasks(tasks, columns) {
        var newTasks = [...tasks];
        console.log("assignDisplayOrderToTasks(" + tasks.length + " tasks, " + columns.length + "columns), newTasks: " + newTasks.length);
        columns.map((col) => {
            console.log(col["id"]);
            newTasks.map((task) => {
                if (task.hasOwnProperty("boardColumn") && col["id"] === task["boardColumn"]["id"]) {
                    task["boardColumn"]["displayOrder"] = col["displayOrder"];
                }
                return 0;
            });
            return 0;
        });
        return (newTasks);
    }

    processTaskData(data, component) {
        if (data != null) {
            console.log("processTaskData(" + data + ")" + data.data["todo-items"].length);
            console.log("processTaskData(" + data + ") " + component.props.columns.length + " columns");
            console.log("setting tasks");
            //component.props.clearTasks();
            component.props.addTasks(component.assignDisplayOrderToTasks(data.data["todo-items"], component.props.columns))
        }
    }

    processTaskListData(data, component) {
        if (data != null) {
            console.log("processTaskListData(" + data + ")" + data.data["tasklists"].length);
            console.log("setting tasklists");
            //component.props.clearTaskLists();
            component.props.addTaskLists(data.data["tasklists"]);
        }
    }


    processBoardColumnData(data, component) {
        if (data != null) {
            console.log("processBoardColumnData(" + data + ")" + data.data["columns"].length);
            console.log("setting boardColumns");
            //component.props.clearColumns();
            component.props.addColumns(data.data["columns"])
        }
    }

    processProjectData(data, component) {
        if (data != null) {
            console.log("processProjectData(" + data + "), ");
            if (data.data.hasOwnProperty("projects") ) {
                console.log("setting projects");
                component.props.clearProjects();
                component.props.addProjects(data.data["projects"]);
            }
            else {
                console.log("setting projects to single project");
                component.props.clearProjects();
                component.props.addProjects([data.data["project"]]);
            }
        }
    }



    getTasks(projectId, taskListId) {
        var url = "http://clevelandclinic.teamwork.com/tasks.json";
        if (typeof taskListId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/tasklists/" + taskListId + "/tasks.json";
        }
        else if (typeof projectId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/tasks.json";
        }

        getDataAsync(url, this, this.processTaskData)
    }

    getBoardColumns(projectId) {
        var url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/boards/columns.json";
        getDataAsync(url, this, this.processBoardColumnData)
    }

    getTaskLists(projectId) {
        var url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/tasklists.json";
        getDataAsync(url, this, this.processTaskListData)
    }


    getProjects(projectId) {
        console.log("getProjects()");
        var url = "http://clevelandclinic.teamwork.com/projects.json";
        if (typeof projectId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/projects/" + projectId + ".json";
        }
        getDataAsync(url, this, this.processProjectData);
    }

    componentDidMount() {

        this.getProjects();
        //this.getProjects("208332");
    }

    onSelectTaskList = (item) => {
    }

    componentDidUpdate() {
        // How to respond to this component being rendered.  This has two main purposes:
        //  1) Implement short0cut type business rules like, "if there only one of X, select that one.
        //  2) If a previous state change should have triggered another one, possibly assynchronously, do that now.
        
        // I suppose you could do some sort of animation like this:
        // if (frame three is rendered) 
        //      set state to show frame 4.
        // Maybe.

        // If there is a new selected project...
        if (this.props.selectedItems.projectIsNew) {
            console.log("== if project ==");
            this.props.completeProject();       // Mark the selected project as no longer "new".
            this.props.clearTasks();
            this.props.clearTaskLists();
            this.props.clearColumns();
            this.getTaskLists(this.props.selectedItems.project);
            this.getBoardColumns(this.props.selectedItems.project);
        }

        // If there is a new selected taks list...
        if (this.props.selectedItems.tasklistIsNew) {
            this.props.completeTaskList();      // Mark the selected task list as no longer "new"
            this.props.clearTasks();
            this.getTasks(this.props.selectedItems.project, this.props.selectedItems.tasklist);     // Conveninetly, the tasklist item also contains the id of it's parent project.
        }
    }

    render() {
        console.log("--------------------------------------------------------");
        console.log("In TeamworkCard.render()");
        console.log("  props: " + Object.keys(this.props));
        console.log("  tasks " + this.props.tasks.length);

        // Always incrementing rendercount and thereby passing a unique value as the "key" attribute to SortTable, 
        // forces React to create a new SortTable object each time this component is rendered, instead of re-using
        // the existing one(s).
        return (
          <div className="TeamworkCard">
            <SortTable />
            <ProjectsContainer />
            <TaskListsContainer />
            <SortTable key={"BlockedTask" + this.rendercount++} title="Blocked Tasks"      data={this.props.tasks}     colspecs={this.blockedTaskColspecs} sortcol={this.blockedTaskSortcol} sortdir={this.blockedTaskSortdir} />
            <SortTable key={"TasksByColumn" + this.rendercount++} title="All Tasks by Column"      data={this.props.tasks}     colspecs={this.boardTaskColspecs} sortcol={this.boardTaskSortcol} sortdir={this.boardTaskSortdir} />
          </div>
        );
    }
}


/*
Sitecore Retainer project: http://clevelandclinic.teamwork.com/projects/208332.json
Task lists for that: Task lists for that: http://clevelandclinic.teamwork.com/projects/208332/tasklists.json
Tasks for the June 19th task list: http://clevelandclinic.teamwork.com/tasklists/1020448/tasks.json
    in those tasks...   (not all from the same task)
        {
            "id": 8656040,
            "boardColumn": {
                "id": 79,
                "name": "Awaiting Production Deploy",       <---<<
                "color": "#B49255"
            },
            "tags": [
                {
                    "id": 20736,
                    "name": "Back-End",
                    "color": "#2f8de4"
                },
                {
                    "id": 23009,
                    "name": "BLOCKED",                  <---<<
                    "color": "#d84640"
                },
                {
                    "id": 22515,
                    "name": "ITD",
                    "color": "#9b7cdb"
                }
            ],
            "responsible-party-ids": "139251,192574",
            "responsible-party-id": "139251,192574",
            "responsible-party-names": "Rachel K.|Evie R.",
            "responsible-party-type": "Person",
            "responsible-party-firstname": "Rachel",
            "responsible-party-lastname": "Krage",
            "responsible-party-summary": "Rachel K. + 1 other",

                        "name": "02. Sitecore Retainer (0F, 0B, 0M)",
                        "id": "208332",



*/