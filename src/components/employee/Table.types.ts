import { ColumnType } from "antd/es/table";

export type EditableColumnsType<T> = (ColumnType<T> & { editable?: boolean })[];