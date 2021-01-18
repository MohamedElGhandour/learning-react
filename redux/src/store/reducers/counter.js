import * as actionType from "../actions/actionTypes";
import { objectUpdated } from "../utility";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INCREMENT:
      // const newState = Object.assign({}, state);
      // newState.counter = state.counter + 1;
      return objectUpdated(state, { counter: state.counter + 1 });
    case actionType.DECREMENT:
      return objectUpdated(state, { counter: state.counter - 1 });
    case actionType.ADD:
      return objectUpdated(state, { counter: state.counter + action.value });
    case actionType.SUBTRACT:
      return objectUpdated(state, { counter: state.counter - action.value });
  }
  // if (action.type === "INCREMENT") return { counter: state.counter + 1 };
  // if (action.type === "DECREMENT") return { counter: state.counter - 1 };
  // if (action.type === "ADD") return { counter: state.counter + action.value };
  // if (action.type === "SUBTRACT") return { counter: state.counter - action.value };

  return state;
};

export default reducer;
