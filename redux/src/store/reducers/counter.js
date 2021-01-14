import * as actionType from "../actions";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INCREMENT:
      const newState = Object.assign({}, state);
      newState.counter = state.counter + 1;
      return newState;
    case actionType.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case actionType.ADD:
      return { ...state, counter: state.counter + action.value };
    case actionType.SUBTRACT:
      return { ...state, counter: state.counter - action.value };
  }
  // if (action.type === "INCREMENT") return { counter: state.counter + 1 };
  // if (action.type === "DECREMENT") return { counter: state.counter - 1 };
  // if (action.type === "ADD") return { counter: state.counter + action.value };
  // if (action.type === "SUBTRACT") return { counter: state.counter - action.value };

  return state;
};

export default reducer;
