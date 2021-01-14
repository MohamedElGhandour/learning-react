import * as actionType from "./actions";
const initialState = {
  persons: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === actionType.ADD_PERSON) {
    return {
      ...state,
      persons: state.persons.concat({
        name: action.personData.name,
        age: action.personData.age,
      }),
    };
  }
  if (action.type === actionType.REMOVE_PERSON) {
    return {
      ...state,
      persons: state.persons.filter((person) => person !== action.person),
    };
  }
  return state;
};
export default reducer;
