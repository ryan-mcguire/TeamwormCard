// TaskLists.js
import React, { Component } from 'react';
import SortTable from './SortTable.js'

export default class TaskLists extends Component {
    constructor(props) {
        super(props);

        this.listSortcol = 0;
        this.listSortdir = 'asc';

        this.listColspecs = [
            { 
                key: "Name", 
                sortfunc: (d) => { return d["name"]; }, 
                dispfunc: (d) => { return d["name"]; }, 
                format: 'text' 
            }
        ];

        this.rendercount = 0;
    }


    onSelectTaskList = (item) => {
        this.props.setSelectedTaskList(item.id);
    }

    render() {
        console.log("  In TaskLists.render(), tasklists has " + this.props.tasklists.length);
        return (
              <SortTable key={"TaskList" + this.rendercount++} title="Task Lists" data={this.props.tasklists} colspecs={this.listColspecs} sortcol={this.listSortcol} sortdir={this.listSortdir} onSelectRow={this.onSelectTaskList} />
      );
    }

}
