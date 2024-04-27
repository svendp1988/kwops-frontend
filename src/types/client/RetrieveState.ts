import { RetrieveRequestStatus } from "./RetrieveRequestStatus";

export interface RetrieveState<T> {
  data: T[];
  retrieveRequestStatus: RetrieveRequestStatus;
  retrieveRequestError: Nullable<string>;
}
