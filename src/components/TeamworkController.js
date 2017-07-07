// TeamworkController.js
import React, { Component } from 'react';
import axios from 'axios';
import './TeamworkController.css';
import SortTable from './SortTable.js'

export default class TeamworkController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            tasks: [],
            tasklists: [],
            projects: [],
            columns: [],
            blockedTaskSortcol: 0,
            blockedTaskSortdir: 'asc',
            boardTaskSortcol: 0,
            boardTaskSortdir: 'asc',
            listSortcol: 0,
            listSortdir: 'asc',
            projSortcol: 0,
            projSortdir: 'asc',
            projfilter: this.props.projfilter
        };

        this.projColspecs = [
            { 
                key: "ID", 
                sortfunc: (d) => { return d["id"]; }, 
                dispfunc: (d) => { return d["id"]; }, 
                format: 'text' 
            },
            { 
                key: "Name", 
                sortfunc: (d) => { return d["name"]; }, 
                dispfunc: (d) => { return d["name"]; }, 
                format: 'text' 
            },
            { 
                key: "Status", 
                sortfunc: (d) => { return d["status"] + "-" + d["subStatus"]; }, 
                dispfunc: (d) => { return d["status"] + "-" + d["subStatus"]; }, 
                format: 'text' 
            }
        ];

        this.listColspecs = [
            { 
                key: "Name", 
                sortfunc: (d) => { return d["name"]; }, 
                dispfunc: (d) => { return d["name"]; }, 
                format: 'text' 
            }
        ];

        this.blockedTaskColspecs = [
            { 
                selectfunc: (d) => {
                    if (!d.hasOwnProperty("tags")) {
                        return false;
                    }
                    var blocked=false; 
                    d.tags.map((tag) => blocked |= (tag.name==="BLOCKED")); 
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
            console.log("processTaskData(" + data + ") " + component.state.columns.length + " columns");
            console.log("setting tasks");

            component.setState((prevState) => {
                console.log("processTaskData.setState()");
                return ({
                    tasks: component.assignDisplayOrderToTasks(data.data["todo-items"], prevState.columns)
                });
            });
        }
    }

    processTaskListData(data, component) {
        if (data != null) {
            console.log("processTaskListData(" + data + ")" + data.data["tasklists"].length);
            console.log("setting tasklists");
            component.setState({
                tasklists: data.data["tasklists"]
            });
        }
    }


    processBoardColumnData(data, component) {
        if (data != null) {
            console.log("processBoardColumnData(" + data + ")" + data.data["columns"].length);
            console.log("setting boardColumns");
            component.setState({
                columns: data.data["columns"]
            });
        }
    }

    processProjectData(data, component) {
        if (data != null) {
            console.log("processProjectData(" + data + "), ");
            if (data.hasOwnProperty("projects") ) {
                console.log("setting projects");
                component.setState((prevstate) => {
                    console.log("setting state.projects to have " + data.data["projects"].length);
                    return ({ projects: data.data["projects"] });
                });
            }
            else {
                console.log("setting projects to single project");
                component.setState((prevstate) => {
                    console.log("setting state.projects to have single");
                    return ({ projects: [data.data["project"]] });
                });
            }
        }
    }

    getDataAsync(url, dataProcessor) {
        console.log("getDataAsync(" + url + ", dataProcessor)");
        var component=this;
        axios
            .get(url, 
                 {headers: {
                     "Authorization": "Basic dHdwX1NWa0c4MGprZmJXa0E4UE4xb1VWRXBYT2JLOTU6",
                     "Accept": "text/plain",
                     "Content-Type": "text/plain"
                 }} )
            .then(function(httpresponse) { 
                dataProcessor(httpresponse, component); 
            }) 
            .catch(function(httpresponse) {
                if (httpresponse instanceof Error) {
                    console.log("getDataAsync: URL: " + url + ", Error with ajax call:", httpresponse.message);
                } else {
                    console.log("getDataAsync: URL: " + url + ", request problem, response is: " + httpresponse.status);
                }
                dataProcessor(null, component); 
            });
    }


    getTasks(projectId, taskListId) {
        var url = "http://clevelandclinic.teamwork.com/tasks.json";
        if (typeof taskListId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/tasklists/" + taskListId + "/tasks.json";
        }
        else if (typeof projectId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/tasks.json";
        }

        this.getDataAsync(url, this.processTaskData)
    }

    getBoardColumns(projectId) {
        var url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/boards/columns.json";
        this.getDataAsync(url, this.processBoardColumnData)
    }

    getTaskLists(projectId) {
        var url = "http://clevelandclinic.teamwork.com/projects/" + projectId + "/tasklists.json";
        this.getDataAsync(url, this.processTaskListData)
    }


    getProjects(projectId) {
        var url = "http://clevelandclinic.teamwork.com/projects.json";
        if (typeof projectId !== 'undefined') {
            url = "http://clevelandclinic.teamwork.com/projects/" + projectId + ".json";
        }
        this.getDataAsync(url, this.processProjectData);
    }

    componentDidMount() {
        this.getProjects("208332");
        //this.getTaskLists("208332");
        //this.getTasks("208332");
    }

    onSelectProj = (item) => {
        this.getTaskLists(item.id);
        this.getBoardColumns(item.id);
        this.setState({
            tasklists: [],
            tasks: []
        });
    }

    onSelectTaskList = (item) => {
        this.getTasks(item.projectId, item.id);     // Conveninetly, the tasklist item also caontains the id of it's parent project.
        this.setState({
            tasks: []
        });
    }

    render() {
        //console.log("--------------------------------------------------------");
        //console.log("tasks " + this.state.tasks.length);
        //console.log("tasklists " + this.state.tasklists.length);
        //console.log("projects " + this.state.projects.length);
        //console.log("rendercount " + this.rendercount);

        // Always incrementing rendercount and thereby passing a unique value as the "key" attribute to SortTable, 
        // forces React to create a new SortTable object each time this component is rendered, instead of re-using
        // the existing one(s).
        return (
          <div className="TeamworkController">
              {this.state.text}
              <SortTable key={this.rendercount++} title="Projects"   data={this.state.projects}  colspecs={this.projColspecs} sortcol={this.state.projSortcol} sortdir={this.state.projSortdir} onSelectRow={this.onSelectProj} />
              <SortTable key={this.rendercount++} title="Task Lists" data={this.state.tasklists} colspecs={this.listColspecs} sortcol={this.state.listSortcol} sortdir={this.state.listSortdir} onSelectRow={this.onSelectTaskList} />
              <SortTable key={this.rendercount++} title="Blocked Tasks"      data={this.state.tasks}     colspecs={this.blockedTaskColspecs} sortcol={this.state.blockedTaskSortcol} sortdir={this.state.blockedTaskSortdir} />
              <SortTable key={this.rendercount++} title="All Tasks by Column"      data={this.state.tasks}     colspecs={this.boardTaskColspecs} sortcol={this.state.boardTaskSortcol} sortdir={this.state.boardTaskSortdir} />
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