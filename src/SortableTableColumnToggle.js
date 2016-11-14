import React from 'react';

class SortableTableColumnToggle extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      listHidden: true,
      selected: [],
      colCount: 0,
    };

    this.selectColumn = this.selectColumn.bind(this);
    this.showOrHideList = this.showOrHideList.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let listChanged = this.state.colCount !== nextState.colCount;
    let listClicked = this.state.listHidden !== nextState.listHidden;
    // console.log(this.state.colCount, '!==', nextState.colCount)
    console.log(listChanged || listClicked ? 're-rendering' : 'did not re-render')
    return listChanged || listClicked;
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

  render() {
    return (
      <div className="column-toggle">
        <div className="column-toggle-selector">
          <span onClick={this.showOrHideList}>CLICK</span>
          <div className={this.state.listHidden ? 'list-hidden' : 'list-visible'}>
            {
              this.props.columnHeaders.map((item, i) => (
                <div
                  key={i}
                  onClick={this.selectColumn.bind(null, i)}
                >
                  <span
                    className={this.state.selected.indexOf(i) !== -1 ? 'col-hidden' : 'col-showing'}
                  >
                    {item}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
};

export default SortableTableColumnToggle;
