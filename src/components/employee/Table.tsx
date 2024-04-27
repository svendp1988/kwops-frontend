import React, { FC, useEffect, useMemo } from "react";
import { Button, notification, Spin, Table as AntdTable } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { createEmployee, retrieveData } from "../../redux/features/employee/Employee.actions";
import {
  selectEmployeeData,
  selectRequestError,
  selectRequestStatus,
  setIsHiring
} from "../../redux/features/employee/Employee.slice";
import { useSelector } from "react-redux";
import { ExclamationOutlined, PlusOutlined } from "@ant-design/icons";
import Header from "./Header";
import { EmployeeCreateDto, EmployeeDetailsDto } from "../../types/api";
import { EditableCell } from "../../atoms/editableCell/EditableCell";
import { EditableRow } from "../../atoms/editableRow/EditableRow";
import { mergedColumns } from "./Table.consts";
import { RetrieveRequestStatus } from "../../types/client";
import { NotificationPlacements } from "antd/lib/notification/interface";

const Context = React.createContext({ name: "Default" });

const Table: FC = () => {

  const dispatch = useAppDispatch();
  const employees = useSelector(selectEmployeeData);
  const requestStatus = useSelector(selectRequestStatus);
  const requestError = useSelector(selectRequestError);

  const [api, toast] = notification.useNotification();

  const openNotification = (description: string) => {
    api.error({
      description,
      icon: <ExclamationOutlined />,
      message: "Error",
      placement: "bottomRight"
    });
  };

  if (requestStatus === RetrieveRequestStatus.FAILED) {
    openNotification(requestError || "Failed to retrieve data");
  }

  useEffect(() => {
    dispatch(retrieveData());
  }, [dispatch]);

  const handleAdd = () => dispatch(setIsHiring(true));
  const handleSave = (record: EmployeeCreateDto) => dispatch(createEmployee(record));
  const handleCancel = () => dispatch(setIsHiring(false));

  return <Spin spinning={requestStatus === RetrieveRequestStatus.PENDING}>
      {toast}
      <AntdTable
        components={{
          body: {
            cell: EditableCell,
            row: EditableRow
          }
        }}
        bordered
        // @ts-ignore
        columns={mergedColumns}
        // @ts-ignore
        onRow={(record: EmployeeDetailsDto) => ({
          ...record,
          editable: true,
          handleCancel,
          handleSave
        })}
        dataSource={employees}
        footer={() => <Button
          disabled={!!employees.find(employee => employee.editing)}
          icon={<PlusOutlined />}
          onClick={handleAdd}>Add</Button>}
        title={() => <Header />}
      />
  </Spin>;
};

export default Table;
