import { FC, useEffect } from "react";
import { Table } from "antd";
import React from "react";
import { EmployeeDetailsDto } from "../../types/api";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch } from "../../redux/hooks";
import { retrieveData } from "../../redux/features/employee/Employee.actions";
import { selectEmployeeData } from "../../redux/features/employee/Employee.slice";
import { useSelector } from "react-redux";

const EmployeeTable: FC = () => {

  const dispatch = useAppDispatch()
  const employees = useSelector(selectEmployeeData);

  useEffect(() => {
    dispatch(retrieveData())
  }, []);

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

export default EmployeeTable;
