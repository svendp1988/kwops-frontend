import React from "react";
import { Form, Input } from "antd";
import { EditableCellProps } from "./EditableCell.types";

export const EditableCell: React.FC<EditableCellProps<unknown>> = ({
                                                                     editing,
                                                                     dataIndex,
                                                                     title,
                                                                     record,
                                                                     index,
                                                                     children,
                                                                     inputType,
                                                                     ...restProps
                                                                   }) => {

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              message: `Please Input ${title}!`,
              required: true
            }
          ]}
        >
          <Input type={inputType} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};