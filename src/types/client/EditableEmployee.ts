import { EmployeeDetailsDto } from "../api";

interface EditableEmployee extends EmployeeDetailsDto {
  editing: boolean;
}

export default EditableEmployee;