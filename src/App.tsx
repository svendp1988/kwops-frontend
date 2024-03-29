import React from "react";
import "./App.css";
import Employee from "./views/employee/Employee";
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: "black", height: "100px", width: "100%" }}>
        <Title
          style={{ color: "white", paddingTop: "25px" }}
          underline
          italic
        >
          KWOps
        </Title>
      </div>
      <Employee />
    </div>
  );
}

export default App;
