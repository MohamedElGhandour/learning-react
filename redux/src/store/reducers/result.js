import * as actionType from "../actions/actionTypes";
import { objectUpdated } from "../utility";

const initialState = {
  result: [],
};

const deleteResult = (state, action) => {
  const newArray = state.result.filter((result) => result.id !== action.id);
  return objectUpdated(state, { result: newArray });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.STORE_RESULT:
      return objectUpdated(state, {
        result: state.result.concat({
          id: Date(),
          value: action.result,
        }),
      });
    case actionType.DELETE_RESULT:
      return deleteResult(state, action);
    // const newArray = [...state.result];
    // newArray.splice(action.index, 1);
  }
  // if (action.type === "INCREMENT") return { counter: state.counter + 1 };
  // if (action.type === "DECREMENT") return { counter: state.counter - 1 };
  // if (action.type === "ADD") return { counter: state.counter + action.value };
  // if (action.type === "SUBTRACT") return { counter: state.counter - action.value };

  return state;
};

export default reducer;
