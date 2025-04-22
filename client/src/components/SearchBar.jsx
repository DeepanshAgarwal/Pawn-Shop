import React from "react";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative">
            <input
                placeholder="Search..."
                className="shadow-lg focus:border-2 border-gray-300 dark:border-gray-600 px-5 py-3 rounded-xl w-56 sm:w-64 lg:w-80 transition-all outline-none bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                name="search"
                type="search"
                value={value}
                onChange={onChange}
            />
            <svg
                className="w-6 h-6 absolute top-3 right-3 text-gray-500 dark:text-gray-400"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

export default SearchBar;
