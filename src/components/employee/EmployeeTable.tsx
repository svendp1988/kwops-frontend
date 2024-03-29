import { FC } from "react";
import { Table } from "antd";
import React from "react";
import { EmployeeDetailsDto } from "../../types/api";
import { ColumnsType } from "antd/es/table";

const EmployeeTable: FC = () => {

  const employees: EmployeeDetailsDto[] = [
    {
      firstName: "John",
      id: 1,
      lastName: "Doe",
      number: "20240329",
      startDate: "2024-03-29"
    }
  ];

  const columns: ColumnsType<EmployeeDetailsDto> = [
    {
      dataIndex: "number",
      key: "number",
      title: "Number"
    },
    {
      dataIndex: "lastName",
      key: "lastName",
      title: "Last Name"
    },
    {
      dataIndex: "firstName",
      key: "firstName",
      title: "First Name"
    },
    {
      dataIndex: "startDate",
      key: "startDate",
      title: "Start Date"
    },
    {
      dataIndex: "endDate",
      key: "endDate",
      title: "End Date"
    }
  ]

  return <Table dataSource={employees} columns={columns}/>

}
