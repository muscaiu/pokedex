import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import useDebounce from '../hooks/useDebounce';
import usePokemonSearch from '../hooks/usePokemonSearch';
import useFetchAllPokemons from '../hooks/useFetchAllPokemons';

interface PokemonContextType {
  allPokemons: NamedAPIResource[];
  foundPokemons: (Pokemon | null)[];
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string;
  debouncedSearchTerm: string;
  uniquePokemonTypes: string[];
}

const defaultContextValue: PokemonContextType = {
  allPokemons: [],
  foundPokemons: [],
  searchTerm: '',
  isLoading: false,
  errorMessage: '',
  debouncedSearchTerm: '',
  uniquePokemonTypes: [],
};

const PokemonContext = createContext<PokemonContextType>(defaultContextValue);
type PokemonProviderProps = {
  children: ReactNode;
};

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalErrorMessage, setGlobalErrorMessage] = useState('');

  const { allPokemons, isLoading: isLoadingAll, errorMessage: errorMessageAll } = useFetchAllPokemons();
  const { foundPokemons, isLoading: isLoadingSearch, errorMessage: errorMessageSearch } = usePokemonSearch(debouncedSearchTerm, allPokemons);

  useEffect(() => {
    setGlobalLoading(isLoadingAll || isLoadingSearch);
    const errors = [errorMessageAll, errorMessageSearch].filter(Boolean).join(". ");
    setGlobalErrorMessage(errors);
  }, [isLoadingAll, isLoadingSearch, errorMessageAll, errorMessageSearch]);

  const uniquePokemonTypes = useMemo(() => {
    const pokemonTypes = foundPokemons.flatMap(pokemon => pokemon?.types.map(type => type.type.name));
    const filteredPokemonTypes = pokemonTypes.filter((type): type is string => type !== undefined);
    return [...new Set(filteredPokemonTypes)];
  }, [foundPokemons]);

  const value = useMemo(() => ({
    allPokemons,
    foundPokemons,
    searchTerm,
    isLoading: globalLoading,
    errorMessage: globalErrorMessage,
    debouncedSearchTerm,
    uniquePokemonTypes,
  }), [allPokemons, foundPokemons, searchTerm, globalLoading, globalErrorMessage, debouncedSearchTerm, uniquePokemonTypes]);

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = () => useContext(PokemonContext);
