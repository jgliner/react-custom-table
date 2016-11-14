import React from 'react';

function SortableTableColumnToggle(props) {
  const {
    showOrHideList,
    listHidden,
    columnHeaders,
    selectColumn,
    selected,
  } = props
  return (
    <div className="column-toggle">
      <div className="column-toggle-selector">
        <div
          className="column-toggle-selector-expand"
          onClick={showOrHideList}
        >
          <span>Show / Hide Columns</span>
        </div>
        <div className={listHidden ? 'list-hidden' : 'list-visible'}>
          {
            columnHeaders.map((item, i) => (
              <div
                key={i}
                onClick={selectColumn.bind(null, i)}
              >
                <span
                  className={selected.indexOf(i) !== -1 ? 'col-hidden' : 'col-showing'}
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
};

export default SortableTableColumnToggle;
