import { RetrieveState } from "src/types/client";
import EditableEmployee from "../../../types/client/EditableEmployee";


export interface EmployeeState extends RetrieveState<EditableEmployee> {
  isHiring: boolean;
}
