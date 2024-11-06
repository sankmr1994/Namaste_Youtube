import React, { useEffect, useState } from "react";
import {
  MENU_ICON,
  USER_ICON,
  YOUTUBE_LOGO,
  YOUTUBE_SEARCH_API,
  YOU_SUGGESTION_SEARCH,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/navSlice";
import { Link } from "react-router-dom";
import { cacheResults } from "../utils/searchSlice";
import { addVideos } from "../utils/videoSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const suggestionCache = useSelector((store) => store.search.suggestionCache);

  useEffect(() => {
    const debouncingSearchTime = setTimeout(() => {
      if (suggestionCache[searchQuery]) {
        setSuggestions(suggestionCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(debouncingSearchTime);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const handleSuggestionSearch = async (suggestion) => {
    const data = await fetch(
      YOU_SUGGESTION_SEARCH +
        suggestion +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    dispatch(addVideos(json.items));
    setSuggestions([]);
    setSearchQuery("");
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 transform transition duration-500 hover:scale-x-95 cursor-pointer"
          alt="menu-icon"
          src={MENU_ICON}
          onClick={toggleMenuHandler}
        ></img>
        <Link to="/">
          <img className="h-8 mx-2" alt="youtube-logo" src={YOUTUBE_LOGO} />
        </Link>
      </div>
      <div className="col-span-10 ">
        <div>
          <input
            className="w-3/4 bg-gray-200 p-[4px] text-lg "
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="font-bold  border border-black bg-black text-white p-[6px] rounded-r-lg w-20 transform transition duration-500 hover:scale-x-95 tracking-wide cursor-pointer"
            onClick={() => handleSuggestionSearch(searchQuery)}
          >
            Search
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="fixed bg-white py-3 px-5 w-[37rem] shadow-lg rounded-lg list-none border border-gray-100">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="shadow-sm py-2 hover:bg-gray-100"
                  onClick={() => handleSuggestionSearch(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img className="h-8" alt="user-icon" src={USER_ICON} />
      </div>
    </div>
  );
};

export default Header;
