import React from "react";

const SmartGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="item-group-wrapper">{children}</div>;
};

export default SmartGroup;
