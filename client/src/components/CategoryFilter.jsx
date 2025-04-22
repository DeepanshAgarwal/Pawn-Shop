import React from "react";

const categories = ["All", "Electronics", "Furniture", "Books", "Others"];

const CategoryFilter = ({ selected, onChange }) => {
    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onChange(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 ${
                        selected === category
                            ? "bg-indigo-600 text-white dark:bg-indigo-500"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                    } hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
