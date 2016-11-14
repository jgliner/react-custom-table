require("babel-polyfill");
require("babel-register");

import React from 'react';
import { sortBy } from 'lodash';

import SortableTableColumnToggle from './SortableTableColumnToggle.js';

require('./tableStyles.css');
require('./columnToggleStyles.css');

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: null,
      dataKeys: Object.keys(this.props.tableData.stats[0]),
      sortOnCol: -1,
      sortOnField: null,
      asc: true,
      listHidden: true,
      selected: [],
      colCount: 0,
    };

    this.sortByColumn = this.sortByColumn.bind(this);
    this.selectColumn = this.selectColumn.bind(this);
    this.showOrHideList = this.showOrHideList.bind(this);
  }

  componentWillMount() {
    this.setState({
      tableData: {
        headers: this.props.tableData.headers,
        stats: this.props.tableData.stats,
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let listChanged = this.state.colCount !== nextState.colCount;
    let listClicked = this.state.listHidden !== nextState.listHidden;
    let listSorted =  this.state.sortOnCol !== nextState.sortOnCol;
    // console.log(this.state.colCount, '!==', nextState.colCount)
    console.log(listChanged || listClicked || listSorted ? 're-rendering' : 'did not re-render')
    return listChanged || listClicked || listSorted;
  }

  selectColumn(colNumber) {
    let selected = this.state.selected;
    let selectedLen = this.state.selected.length;
    if (selected.indexOf(colNumber) === -1) {
      selected.push(colNumber);
      selectedLen++;
    }
    else {
      selected.splice(selected.indexOf(colNumber), 1);
      selectedLen--;
    }
    console.log(selected)
    this.setState({
      selected,
      colCount: selectedLen,
    });
  }

  showOrHideList() {
    let listState = this.state.listHidden
    this.setState({
      listHidden: !listState,
    });
  }

  sortByColumn(e) {
    console.log('STATE', this.state)
    const incomingCol = +e.target.classList[1].split('-')[1];
    const incomingField = this.state.dataKeys[incomingCol];
    const originalHeaders = this.state.tableData.headers;
    const reOrderedDataTable = sortBy(this.state.tableData.stats, (o) => {
      return !isNaN(Date.parse(o[incomingField])) ? (new Date(o[incomingField])) : o[incomingField]
    });
    this.setState({
      sortOnField: incomingField,
      sortOnCol: incomingCol,
      tableData: {
        headers: originalHeaders,
        stats: reOrderedDataTable,
      },
    })
  }

  render() {
    return (
      <table className="sortable-stats-table">
        <thead>
          <tr className="column-visibility-selector-row">
            <td className="column-visibility-selector">
              <SortableTableColumnToggle
                showOrHideList={this.showOrHideList}
                listHidden={this.state.listHidden}
                columnHeaders={this.state.tableData.headers}
                selectColumn={this.selectColumn}
                selected={this.state.selected}
              />
            </td>
          </tr>
          <tr className="sortable-stats-header-row">
            {
              this.state.tableData.headers.map((header, i) => (
                <td
                  key={i}
                  className="sortable-stats-header-cell"
                >
                  <button
                    value={`statsHeader${i}`}
                    className={`header-sort-button sort-${i}`}
                    onClick={this.sortByColumn}
                  >
                    {header}
                  </button>
                </td>
              ))
            }
          </tr>
        </thead>
        <tbody className="sortable-stats-table-body">
          {
            this.state.tableData.stats.map((player, j) => (
              <tr key={j} className={`sortable-stats-row sortable-stats-row-${j}`}>
                {
                  Object.keys(player).map((stat, k) => (
                    <td key={k} className={`sortable-stats-cell sortable-stats-cell-${k}`}>{player[stat]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default SortableTable;