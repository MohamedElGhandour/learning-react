import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { setFiltered } = props;
  const { setRequest, loading, error, data } = useHttp();
  const [filteredInput, setFilteredInput] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    if (!error && !loading && data) {
      const loadedIngrediants = [];
      for (const key in data) {
        loadedIngrediants.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      setFiltered(loadedIngrediants);
    }
  }, [data, setFiltered, loading, error]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filteredInput === inputRef.current.value) {
        const url =
          filteredInput.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${filteredInput}"`;
        setRequest(
          "https://react-hooks-update-ghandour-default-rtdb.firebaseio.com/ingrediants.json" +
            url,
          "GET"
        );
        // fetch(url)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const loadedIngrediants = [];
        //     for (const key in data) {
        //       loadedIngrediants.push({
        //         id: key,
        //         title: data[key].title,
        //         amount: data[key].amount,
        //       });
        //     }
        //     setFiltered(loadedIngrediants);
        //   });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [filteredInput, setFiltered, setRequest]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={props.closeModal}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={filteredInput}
            onChange={(event) => setFilteredInput(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
