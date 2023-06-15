import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th key={column} className="clickable">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
