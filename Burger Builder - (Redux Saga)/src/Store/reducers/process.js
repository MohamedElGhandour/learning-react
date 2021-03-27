import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: {
    burgerBuilder: false,
    auth: false,
    order: false,
  },
  error: {
    burgerBuilder: null,
    auth: null,
    order: null,
  },
};

const startProcess = (state, action) => {
  const updateLoading = updateObject(state.loading, { [action.reducer]: true });
  return updateObject(state, { loading: updateLoading });
};

const successProcess = (state, action) => {
  const updateLoading = updateObject(state.loading, {
    [action.reducer]: false,
  });
  const updateError = updateObject(state.error, { [action.reducer]: null });
  return updateObject(state, { loading: updateLoading, error: updateError });
};

const failProcess = (state, action) => {
  const updateLoading = updateObject(state.loading, {
    [action.reducer]: false,
  });
  const updateError = updateObject(state.error, {
    [action.reducer]: action.error,
  });
  return updateObject(state, { loading: updateLoading, error: updateError });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_PROCESS:
      return startProcess(state, action);
    case actionType.SUCCESS_PROCESS:
      return successProcess(state, action);
    case actionType.FAIL_PROCESS:
      return failProcess(state, action);
    default:
      return state;
  }
};
export default reducer;
