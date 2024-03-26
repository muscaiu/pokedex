import { useState } from 'react';
import {
  useSearchParams
} from "react-router-dom";
import SearchIcon from '../icons/SearchIcon';
import CloseIcon from '../icons/CloseIcon';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set("search", value);
    } else {
      newSearchParams.delete("search");
    }
    setSearchParams(newSearchParams);
  };

  const handleClearInput = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    newSearchParams.delete("type");
    setSearchParams(newSearchParams);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <input
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        type="text"
        className="p-2 pl-8 border border-gray-200 bg-white focus:bg-white focus:border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        autoFocus
      />
      <SearchIcon />
      <CloseIcon clearInput={handleClearInput} />
    </div>
  )
}

