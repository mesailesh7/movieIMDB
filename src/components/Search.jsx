import React from "react";

const Search = ({ searchTerm, setsearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search through thousands of ovies"
          value={searchTerm}
          onChange={(event) => setsearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
