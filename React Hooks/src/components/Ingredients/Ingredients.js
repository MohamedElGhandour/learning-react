import React, { useReducer, useCallback, useMemo, useEffect } from "react";

import useHttp from "../../hooks/http";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import IngredientList from "./IngredientList";
import Search from "./Search";

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredients];
    case "DELETE":
      return currentIngredients.filter((value) => value.id !== action.id);
    default:
      throw new Error("Should be not reached!");
  }
};

// const httpReducer = (currentHTTP, action) => {
//   switch (action.type) {
//     case "REQUEST":
//       return { loading: true, error: null };
//     case "RESPONSE":
//       return { ...currentHTTP, loading: false };
//     case "ERROR":
//       return { loading: false, error: action.error };
//     default:
//       throw new Error("Should be not reached!");
//   }
// };

const Ingredients = () => {
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [http, setHttp] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null,
  // });

  const [list, setList] = useReducer(ingredientsReducer, []);

  const {
    loading,
    error,
    data,
    id,
    setRequest,
    identifier,
    ingredients,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!loading && !error && identifier === "REMOVE_INGREDIANT")
      setList({ type: "DELETE", id: id });
    else if (!loading && !error && identifier === "ADD_INGREDIANT")
      setList({ type: "ADD", ingredients: { id: data.name, ...ingredients } });
  }, [data, id, identifier, ingredients, error, loading]);

  const setFilteredHandler = useCallback(
    (ingredients) => setList({ type: "SET", ingredients: ingredients }),
    []
  );

  const addIngredients = useCallback(
    (ingredients) => {
      // setLoading(true);
      // setHttp({ type: "REQUEST" });
      // fetch(
      //   "https://react-hooks-update-ghandour-default-rtdb.firebaseio.com/ingrediants.json",
      //   {
      //     method: "POST",
      //     headers: { "content-type": "application/json" },
      //     body: JSON.stringify(ingredients),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // setLoading(false);
      //     // setList((prevList) => [
      //     //   ...prevList,
      //     //   {
      //     //     id: data.name,
      //     //     ...ingredients,
      //     //   },
      //     // ]);
      //     setHttp({ type: "RESPONSE" });
      //     setList({
      //       type: "ADD",
      //       ingredients: { id: data.name, ...ingredients },
      //     });
      //   })
      //   .catch((err) => {
      //     // setError("Some Thing get Wrong!");
      //     // setLoading(false);
      //     setHttp({ type: "ERROR", error: "Some Thing get Wrong!" });
      //   });
      setRequest(
        "https://react-hooks-update-ghandour-default-rtdb.firebaseio.com/ingrediants.json",
        "POST",
        JSON.stringify(ingredients),
        null,
        "ADD_INGREDIANT",
        ingredients
      );
    },
    [setRequest]
  );

  const removeIngredients = useCallback(
    (id) => {
      // setLoading(true);
      // setHttp({ type: "REQUEST" });
      // fetch(
      //   `https://react-hooks-update-ghandour-default-rtdb.firebaseio.com/ingrediants/${id}.json`,
      //   {
      //     method: "DELETE",
      //     headers: { "content-type": "application/json" },
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // setLoading(false);
      //     // setList((prevList) => prevList.filter((value) => value.id !== id));
      //     setHttp({ type: "RESPONSE" });
      //     setList({ type: "DELETE", id: id });
      //   })
      //   .catch((err) => {
      //     // setError("Some Thing get Wrong!");
      //     // setLoading(false);
      //     setHttp({ type: "ERROR", error: "Some Thing get Wrong!" });
      //   });
      setRequest(
        `https://react-hooks-update-ghandour-default-rtdb.firebaseio.com/ingrediants/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIANT"
      );
    },
    [setRequest]
  );

  const closeModal = useCallback(() => {
    // setError(null);
    // setHttp({ type: "RESPONSE" });
    clear();
  }, [clear]);

  const ingredientList = useMemo(
    () => (
      <IngredientList ingredients={list} onRemoveItem={removeIngredients} />
    ),
    [list, removeIngredients]
  );

  return (
    <div className="App">
      {error && <ErrorModal onClose={closeModal}>{error}</ErrorModal>}
      <IngredientForm setList={addIngredients} isLoading={loading} />
      <section>
        <Search setFiltered={setFilteredHandler} closeModal={closeModal} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
