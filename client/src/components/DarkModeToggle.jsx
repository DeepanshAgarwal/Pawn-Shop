import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    // Check if the user has a saved theme preference in localStorage
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("darkMode") === "true" || false
    );

    useEffect(() => {
        // Toggle dark mode class on <html> element based on the state
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save preference in localStorage
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <div className="w-14 h-7 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-7 peer-checked:after:content-['🌙'] after:shadow-md after:text-base"></div>
            {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Theme
            </span> */}
        </label>
    );
};

export default DarkModeToggle;
