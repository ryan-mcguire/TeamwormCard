// JavaScript source code
import React, { Component } from 'react';

class SortTableHeader extends Component {
    onclick = () => {
        this.props.onclick(this.props.clickarg);
    }

    render() {
        var classname = "columnheader" + (this.props.issortcol ? (this.props.sortdir === 'asc' ? " columnheader-sortup" : " columnheader-sortdown") : "");
        var label = this.props.spec.key + (this.props.issortcol ? (this.props.sortdir === 'asc' ? " ▴" : " ▾") : "");
        return (<td className={classname} onClick={this.onclick}>{label}</td>);
    }
}


class SortTableCell extends Component {
    render() {
        var item = this.props.item;
        var itemDataAccessor = this.props.spec.dispfunc;
        var data = itemDataAccessor(item);
        return (<td>{data}</td>);
    }
}

class SortTableRow extends Component {
    render() {
        if (this.props.colspecs[0].hasOwnProperty("selectfunc") && !this.props.colspecs[0].selectfunc(this.props.item)) {
            return null;
        }
        return (
            <tr onClick={this.props.onClick}>
                {this.props.colspecs.map((item2, index2) => {
                    return (<SortTableCell key={index2} item={this.props.item} spec={item2} />);
                })}
            </tr>
        );
    }
}

class SortTable extends Component {
    constructor(props) {
        super(props);

        // This state is just local, so this component shouln't worry about being part of the big Redux state.  
        // At least not until someother component changes this component's state through something other than
        // the constructor.
        if (this.props.hasOwnProperty("title")) {
            this.state = {
                data: this.props.data,
                colspecs: this.props.colspecs,
                sortcol: this.props.sortcol,
                sortdir: this.props.sortdir,
            };
        }
        else {
            this.state = null;
        }
        this.sortData();
        this.rendercount = 0;
    }

    sortData(sortcol, sortdir, data)  {
        if (this.state != null) {
            sortcol = (typeof sortcol !== 'undefined') ?  sortcol : this.state.sortcol;
            sortdir = (typeof sortdir !== 'undefined') ?  sortdir : this.state.sortdir;
            data = (typeof data !== 'undefined') ?  data : this.state.data;
            // Get the function to extract the sort-by data from each item based on the current sort column.
            var sortfunc = this.state.colspecs[sortcol].sortfunc;
            var dirmultiplier = sortdir === 'asc' ? 1 : -1;

            // sort the data items based on the current sort column.
            data.sort((d1, d2) => { 
                return ((sortfunc(d1) > sortfunc(d2) ? 1 : -1) * dirmultiplier);
            });
        }
    }

    changesort = (newcolumn) => {
        this.setState((prevstate) => {
            var newsortcol = newcolumn;
            var newsortdir = prevstate.sortcol===newcolumn && prevstate.sortdir==='asc' ? 'desc' : 'asc';
            this.sortData(newsortcol, newsortdir);
            return ({sortcol: newsortcol, sortdir: newsortdir});
        });
    }

    onSelectRow = (item) => {
        if (this.props.onSelectRow !== undefined) {
            this.props.onSelectRow(item); 
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state != null ? this.props.title : "title"}</h2>
                <table className="SortTable">
                    <tbody>
                        <tr>
                            {this.state != null 
                                ?   this.state.colspecs.map((item2, index2) => {
                                        return (<SortTableHeader 
                                                key={this.rendercount++}
                                                spec={item2} 
                                                issortcol={this.state.sortcol === index2} 
                                                sortdir={this.state.sortdir} 
                                                clickarg={index2} 
                                                onclick={this.changesort}/>);
                                    })
                                :   ''
                            }
                        </tr>
                        {this.state != null && this.state.data != null 
                            ?   this.state.data.map((item, index) => {
                                return (
                                    <SortTableRow 
                                        key={this.rendercount++}
                                        colspecs={this.state.colspecs} 
                                        item={item} 
                                        onClick={() => {this.onSelectRow(item);}} 
                                        onClickArg={index} />
                                );  
                            })
                            :   ''
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SortTable;