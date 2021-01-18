import * as actionTypes from "./actionTypes";

const storeResultAsync = (result) => {
  return {
    type: actionTypes.STORE_RESULT,
    result: result,
  };
};
const deleteResultAsync = (index, id) => {
  return {
    type: actionTypes.DELETE_RESULT,
    index: index,
    id: id,
  };
};

export const storeResult = (result) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      //   console.log(getState().counterReducer.counter);
      dispatch(storeResultAsync(result));
    }, 2000);
  };
};

export const deleteResult = (index, id) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(deleteResultAsync(index, id));
    }, 2000);
  };
};
