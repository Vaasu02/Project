import React, { useState } from "react";
import Profileinfo from "../Cards/Profileinfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { FaSun, FaMoon } from "react-icons/fa";


const Navbar = ({ userInfo, onSearchNote, handleCLearSearch }) => {
  const [searchQuery, setsearchQuery] = useState("");
  
  const [mode, setMode] = useThemeSwitcher();
  const navigate = useNavigate();

  

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setsearchQuery("");
    handleCLearSearch();
  };

  return (
    <div className="bg-white dark:bg-slate-100 border shadow-lg dark:shadow-md  flex items-center dark:border-b-2 dark:border-indigo-500 justify-between sm:overflow-x-hidden px-6 py-2 drop-shadow sm:px-4">
      <a
        href="#"
        className="text-xl sm:w-14 dark:text-slate-800 font-medium text-black py-2"
      >
        Notes
      </a>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setsearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className="flex items-center sm:w-24 w-[160px] justify-between sm:ml-2">
        
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={`ml-3 flex items-center justify-center rounded-full p-1
      ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
        >
          {mode === "dark" ? (
            <FaSun className={"fill-black text-black"} size={20}/>
          ) : (
            <FaMoon className={"fill-white"} />
          )}
        </button>

        <Profileinfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
