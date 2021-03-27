import reducer from "./auth";
import * as actionType from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      authRedirectPath: "/",
    });
  });
  it("should store stoken when login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          authRedirectPath: "/",
        },
        {
          type: actionType.AUTH_SUCCESS,
          idToken: "action.idToken",
          userId: "action.userId",
        }
      )
    ).toEqual({
      token: "action.idToken",
      userId: "action.userId",
      authRedirectPath: "/",
    });
  });
});
