import React, { Component } from "react";
// import _ from "lodash";

class tableBody extends Component {
  render() {
    const { data, display } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}> {display(item)}</tr>
        ))}
      </tbody>
    );
  }
}

export default tableBody;
