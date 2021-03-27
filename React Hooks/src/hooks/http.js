import { useReducer, useCallback } from "react";
const initialState = {
  loading: false,
  error: null,
  data: null,
  id: null,
  identifier: null,
  ingredients: null,
};
const httpReducer = (currentHTTP = initialState, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        loading: true,
        error: null,
        data: null,
        id: null,
        ingredients: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currentHTTP,
        loading: false,
        data: action.data,
        id: action.id,
        identifier: action.identifier,
        ingredients: action.ingredients,
      };
    case "ERROR":
      return { ...currentHTTP, loading: false, error: action.error };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should be not reached!");
  }
};
const useHttp = () => {
  const [http, setHttp] = useReducer(httpReducer, initialState);
  const clear = useCallback(() => {
    setHttp({ type: "CLEAR" });
  }, []);
  const setRequest = useCallback(
    (url, method, body, id, identifier, ingredients) => {
      setHttp({ type: "REQUEST" });
      fetch(url, {
        method: method,
        headers: { "content-type": "application/json" },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          setHttp({
            type: "RESPONSE",
            data: data,
            id,
            identifier,
            ingredients: ingredients,
          });
        })
        .catch((err) => {
          setHttp({ type: "ERROR", error: "Some Thing get Wrong!" });
        });
    },
    []
  );

  return {
    loading: http.loading,
    error: http.error,
    data: http.data,
    id: http.id,
    identifier: http.identifier,
    ingredients: http.ingredients,
    setRequest: setRequest,
    clear: clear,
  };
};

export default useHttp;
