import React from 'react';

class SortableTableColumnToggle extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      listHidden: true,
      selected: [],
    };

    this.select = this.select.bind(this);
    this.showOrHideList = this.showOrHideList.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let listChanged = this.state.selected.length !== nextState.selected.length;
    let listClicked = this.state.listHidden !== nextState.listHidden;
    console.log('listChanged', listChanged, 'listClicked', listClicked, listChanged || listClicked)
    return listChanged || listClicked;
  }

  select(colNumber) {
    let currentState = this.state.selected;
    if (currentState.indexOf(colNumber) === -1) {
      currentState.push(colNumber);
    }
    else {
      currentState.splice(currentState.indexOf(colNumber), 1);
    }
    console.log(currentState)
    this.setState({
      selected: currentState,
    });
  }

  showOrHideList() {
    let listState = this.state.listHidden
    this.setState({
      listHidden: !listState,
    });
  }

  renderListItems() {
    return this.props.columnHeaders.map((item, i) => (
      <div
        key={i}
        onClick={this.select.bind(null, i)}
      >
        <span
          className={this.state.selected.indexOf(i) ? 'col-selected' : 'col-hidden'}
        >
          {item}
        </span>
      </div>
    ));
  }

  render() {
    const columnCheckboxes = this.renderListItems();
    return (
      <div className="column-toggle">
        <div className="column-toggle-selector">
          <span onClick={this.showOrHideList}>CLICK</span>
          <div className={this.state.listHidden ? 'list-hidden' : 'list-visible'}>
            {columnCheckboxes}
          </div>
        </div>
      </div>
    )
  }
};

export default SortableTableColumnToggle;
