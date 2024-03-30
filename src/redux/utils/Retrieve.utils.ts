import { RetrieveRequestStatus, RetrieveState } from "../../types";

export const handleRetrievePending = <T extends RetrieveState<unknown>>(state: T) => {
  state.retrieveRequestStatus = RetrieveRequestStatus.PENDING;
}

export const handleRetrieveSuccess = <T extends RetrieveState<unknown>>(state: T, action: { payload: T["data"] }) => {
  state.data = action.payload;
  state.retrieveRequestStatus = RetrieveRequestStatus.SUCCESS;
}

export const handleRetrieveFailed = <T extends RetrieveState<unknown>>(state: T, action: { payload: string }) => {
  state.retrieveRequestError = action.payload;
  state.retrieveRequestStatus = RetrieveRequestStatus.FAILED;
}
