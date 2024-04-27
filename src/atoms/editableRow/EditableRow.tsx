import { Form } from "antd";
import React from "react";
import { EditableRowProps } from "./EditableRow.types";

export const EditableRow: React.FC<EditableRowProps> = ({ editable, index, handleCancel, handleSave, ...props }) => {
  const [form] = Form.useForm();

  const onKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        form.validateFields().then(handleSave);
        break;
      case "Escape":
        e.preventDefault();
        handleCancel();
        break;
    }
  };

  return editable ? (
      <Form form={form} component={false}>
        <tr {...props} onKeyDown={onKeyDown} />
      </Form>)
    : (<tr {...props} />);
};