import React, { Component } from 'react';


class TableHeader extends Component {

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  }

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }
  
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              className={column.key ? null : "clickable"}
              key={column.path || column.key}
              onClick={column.key ? null : () => this.raiseSort(column.path)}
            >
              {column.label} { column.key ? null : this.renderSortIcon(column)}
            </th>
            ))}
        </tr>
      </thead> 

      );
  }
}

export default TableHeader;