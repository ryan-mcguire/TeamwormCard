// Projects.js
import React, { Component } from 'react';
import SortTable from './SortTable.js'

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.projSortcol = 0;
        this.projSortdir = 'asc';

        this.projColspecs = [
            //{ 
            //    key: "ID", 
            //    sortfunc: (d) => { return d["id"]; }, 
            //    dispfunc: (d) => { return d["id"]; }, 
            //    format: 'text' 
            //},
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

        this.rendercount = 0;
    }

    onSelectProj = (item) => {
        this.props.setSelectedProject(item.id);
    }

    render() {
        console.log("  in Projects.render(), projects has " + this.props.projects.length);
        return (
              <SortTable key={"Projects." + this.rendercount++} title="Projects"   data={this.props.projects}  colspecs={this.projColspecs} sortcol={this.projSortcol} sortdir={this.projSortdir} onSelectRow={this.onSelectProj} />
      );
    }

}
