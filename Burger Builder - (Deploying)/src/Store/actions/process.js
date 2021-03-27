import * as actionType from "./actionTypes";

export const startProcess = (reducer) => {
  return {
    type: actionType.START_PROCESS,
    reducer: reducer,
  };
};
export const successProcess = (reducer) => {
  return {
    type: actionType.SUCCESS_PROCESS,
    reducer: reducer,
  };
};

export const failProcess = (reducer, error) => {
  return {
    type: actionType.FAIL_PROCESS,
    reducer: reducer,
    error: error,
  };
};
