export interface EditableRowProps {
  editable: boolean;
  handleCancel: () => void;
  handleSave: () => void;
  index: number;
}