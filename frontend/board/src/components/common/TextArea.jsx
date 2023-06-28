import React from "react";

const TextArea = ({ name, label, rows, error, ...rest }) => {
  // console.log(rest);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} className="form-control" id={name} name={name} rows={rows} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
