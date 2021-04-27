import React from "react";
import "../rootstyles.css";
import { Spin } from "antd";

const Container = ({ loading, children }) => {
  return (
    <div className="list-container">
      {loading && <Spin size="large" spinning />}
      {children}
    </div>
  );
};

export default Container;
