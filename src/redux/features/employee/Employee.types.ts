import { EmployeeDetailsDto } from "src/types/api";
import { RetrieveState } from "src/types";


export interface EmployeeState extends RetrieveState<EmployeeDetailsDto> {
}
