import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBoxTicket = () => {
    return (
        <div className="flex items-center justify-center bg-gray-300 rounded-full">
        <input
            type="text"
            className="w-64 md:w-96 sm:w-72 lg:w-[50vw] px-4 py-2 rounded-l-full bg-[#E9E8E6] focus:outline-none"
            placeholder="Buscar..."
        />
        <button className="p-2 w-12 rounded-r-full bg-[#D9D9D9]">
            <FontAwesomeIcon icon={faSearch} />
        </button>
        </div>
    );
};

export default SearchBoxTicket;