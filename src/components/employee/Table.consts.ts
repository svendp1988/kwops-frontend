import { EditableColumnsType } from "./Table.types";
import EditableEmployee from "../../types/client/EditableEmployee";

export const columns: EditableColumnsType<EditableEmployee> = [
  {
    dataIndex: "firstName",
    editable: true,
    key: "firstName",
    title: "First Name"
  },
  {
    dataIndex: "lastName",
    editable: true,
    key: "lastName",
    title: "Last Name"
  },
  {
    dataIndex: "startDate",
    editable: true,
    key: "startDate",
    title: "Start Date"
  },
  {
    dataIndex: "endDate",
    key: "endDate",
    title: "End Date"
  },
  {
    dataIndex: "number",
    key: "number",
    title: "Number"
  }
];


export const mergedColumns = columns.map((col) =>
  !col.editable ? col : {
    ...col,
    onCell: (record: EditableEmployee) => ({
      dataIndex: col.dataIndex,
      editing: record.editing,
      inputType: col.dataIndex === "startDate" ? "date" : "text",
      record,
      title: col.title
    })
  });