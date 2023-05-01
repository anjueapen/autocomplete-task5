import React, { useEffect, useState } from "react";
import { SearchInput } from "./searchInput/searchInput";
import { SearchList } from "./searchList/searchList";
import "./search.css";
import axios from "axios";
export const Search = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchList, setSearchList] = useState([]); //data on onload
  const [filteredList, setFilteredList] = useState([]);

  const API_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false";

  const handleChange = (event) => {
    setSearchInputValue(event.target.value);
    const newList = searchList.filter((data) => {
      return data.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredList(newList);
  };
  const fetchSearchList = async () => {
    try {
      const response = await axios(API_URL, {
        params: {
          query: searchInputValue,
        },
      });
      // Saving to local array to filter locally
      setSearchList(response.data.results);
      setFilteredList(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const clearSearch = () => {
    setSearchInputValue("");
    setFilteredList([]);
  };
  useEffect(() => {
    //debouncing
    const timeout = setTimeout(() => fetchSearchList(), 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInputValue]);
  return (
    <div className="search-container">
      <div className="heading-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
          alt=""
        />
        <h1>Looking for a movie?</h1>
      </div>
      <SearchInput
        handleChange={handleChange}
        searchInputValue={searchInputValue}
        clearSearch={clearSearch}
      />
      <SearchList searchList={filteredList} />
    </div>
  );
};
