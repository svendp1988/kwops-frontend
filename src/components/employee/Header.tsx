import React, { FC } from "react";
import { Button } from "antd";

const Header: FC = () => {
  return (
    <div>
      <h1>Employees</h1>
      <Button type="primary">Add Employee</Button>
    </div>
  );
}

export default Header;
