require("babel-polyfill");
require("babel-register");

import React from 'react';

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    return (
      <table className="sortable-stats-table">
        <thead>
          <tr className="sortable-stats-header-row">
            {
              this.props.tableData.headers.map((header, i) => (
                <td
                  key={i}
                  className="sortable-stats-header-cell"
                >
                  <button
                    value={`statsHeader${i}`}
                    className="header-sort-button"
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
            this.props.tableData.stats.map((player, j) => (
              <tr key={j} className={`sortable-stats-row sortable-stats-row${j}`}>
                {
                  Object.keys(player).map((stat, k) => (
                    <td key={k} className={`sortable-stats-cell sortable-stats-cell${k}`}>{player[stat]}</td>
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