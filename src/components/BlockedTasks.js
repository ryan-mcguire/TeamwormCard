// BlockedTasks.js
import React, { Component } from 'react';
import SortTable from './SortTable.js'

export default class BlockedTasks extends Component {
    constructor(props) {
        super(props);


        this.rendercount = 0;
    }

    render() {
        console.log("  In BlockedTasks.render(), tasks has " + this.props.tasks.length);
        return (
        );
    }
}
