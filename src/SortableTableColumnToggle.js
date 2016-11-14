import React from 'react';

class SortableTableColumnToggle extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      listHidden: true,
      selected: [],
    };

    this.select = this.select.bind(this);
    // this.show = this.show.bind(this);
    // this.hide = this.hide.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selected.length !== nextState.selected.length;
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

  renderListItems() {
    return this.props.columnHeaders.map((item, i) => (
      <div
        key={i}
        onClick={this.select.bind(null, i)}
      >
        <span>{item}</span>
      </div>
    ));
  }

  render() {
    const columnCheckboxes = this.renderListItems();
    return (
      <div className="column-toggle">
        <div className="column-toggle-selector">
          <span>CLICK</span>
          <div className={this.state.listHidden ? 'list-hidden' : 'list-visible'}>
            {columnCheckboxes}
          </div>
        </div>
      </div>
    )
  }
};

export default SortableTableColumnToggle;
