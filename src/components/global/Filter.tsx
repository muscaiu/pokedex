import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePokemonContext } from '../../context/PokemonContext';
import useClickOutside from '../../hooks/useClickOutside';

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const dropdownRef = useRef(null);

  const { uniquePokemonTypes } = usePokemonContext();

  const handleFilterClick = (type: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (type) {
      newSearchParams.set("type", type);
    } else {
      newSearchParams.delete("type");
    }
    setSearchParams(newSearchParams);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("type");
    setSearchParams(newSearchParams);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className='flex justify-center md:justify-start items-center md:mt-0 mt-6 md:flex-row flex-col'>
      <div className="first-letter md:ml-8 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
          className="text-white bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button">
          {typeParam || 'Filter by type'}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        {isOpen && (
          <div ref={dropdownRef} id="dropdown" className="absolute z-10">
            <ul className="mt-1 text-sm text-gray-700 bg-white rounded-lg shadow w-44" aria-labelledby="dropdownDefaultButton">
              {uniquePokemonTypes.map((type) => (
                <li key={type}>
                  <button
                    onClick={() => handleFilterClick(type)}
                    className="block px-4 py-2 hover:bg-gray-100 text-left w-full">
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <a
        className='md:ml-1 mt-2 md:mt-0 text-center text-sm cursor-pointer hover:text-blue-700'
        onClick={clearFilters}
      >
        Clear filter
      </a>
    </div>
  );
}