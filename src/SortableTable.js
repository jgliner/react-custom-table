import React from 'react';
import { orderBy } from 'lodash';

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
      prevOrder: null,
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

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (e.target.classList[0] !== 'col-hidden') {
        this.setState({
          listHidden: true,
        })
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    let listChanged = this.state.colCount !== nextState.colCount;
    let listClicked = this.state.listHidden !== nextState.listHidden;
    let listSorted =  this.state.sortOnCol !== nextState.sortOnCol;
    let listDirChanged =  this.state.asc !== nextState.asc;

    return listChanged || listClicked || listSorted || listDirChanged;
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
    this.setState({
      selected,
      colCount: selectedLen,
    });
  }

  showOrHideList(e) {
    e.stopPropagation();
    let listState = this.state.listHidden
    this.setState({
      listHidden: !listState,
    });
  }

  sortByColumn(e) {
    let prevSorted = document.getElementsByClassName(`sort-${this.state.prevOrder}`)[0];
    if (prevSorted) {
      prevSorted.classList.remove(`order-asc`);
      prevSorted.classList.remove(`order-desc`);
      prevSorted.classList.add(`order-neither`);
    }

    e.target.classList.remove(`order-${this.state.asc ? 'desc' : 'asc'}`)
    e.target.classList.remove('order-neither')
    const incomingCol = +e.target.classList[1].split('-')[1];
    const incomingField = this.state.dataKeys[incomingCol];
    const originalHeaders = this.state.tableData.headers;
    const ascending = this.state.asc;
    const reOrderedDataTable = orderBy(this.state.tableData.stats, (o) => {
      return !isNaN(Date.parse(o[incomingField])) ? (new Date(o[incomingField])) : o[incomingField]
    }, ascending ? 'asc' : 'desc');
    this.setState({
      sortOnField: incomingField,
      sortOnCol: incomingCol,
      tableData: {
        headers: originalHeaders,
        stats: reOrderedDataTable,
      },
      asc: !ascending,
      prevOrder: incomingCol,
    })
    e.target.classList.add(`order-${this.state.asc ? 'asc' : 'desc'}`)
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
              this.state.tableData.headers.map((header, i) => {
                return this.state.selected.indexOf(i) === -1 ?
                  (<td
                    key={i}
                    className="sortable-stats-header-cell"
                  >
                    <button
                      value={`statsHeader${i}`}
                      className={`header-sort-button sort-${i} order-neither`}
                      onClick={this.sortByColumn}
                    >
                      {header}
                    </button>
                  </td>) :
                  (<td key={i} className="sortable-stats-header-cell-hidden"/>)
              })
            }
          </tr>
        </thead>
        <tbody className="sortable-stats-table-body">
          {
            this.state.tableData.stats.map((player, j) => (
              <tr key={j} className={`sortable-stats-row sortable-stats-row-${j}`}>
                {
                  Object.keys(player).map((stat, k) => {
                    return this.state.selected.indexOf(k) === -1 ?
                      (<td key={k} className={`sortable-stats-cell sortable-stats-cell-${k}`}>{player[stat]}</td>) :
                      (<td key={k} className="sortable-stats-cell-hidden"/>)
                  })
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