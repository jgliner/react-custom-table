import React from 'react';

import SortableTable from '../../src/SortableTable.js';

import tableExampleData from './tableExampleData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="example-parent-component">
        <h1>2016 AFC West</h1>
        <br />
        <SortableTable tableData={tableExampleData} />
      </div>
    )
  }
}

export default App;
