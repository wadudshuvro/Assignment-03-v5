// src/components/SearchBar.jsx

import { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";

const SearchBar = () => {
  const { dispatch } = useContext(TaskContext);

  const handleSearch = (event) => {
    dispatch({ type: "SEARCH_TASKS", payload: event.target.value });
  };

  return (
    <input
      type="text"
      className="search-input relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[200px] z-20 block bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
      placeholder="Search tasks..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
