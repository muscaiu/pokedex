import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';
import useDebounce from '../hooks/useDebounce';
import usePokemonSearch from '../hooks/usePokemonSearch';

interface PokemonContextType {
  pokemons: (Pokemon | null)[];
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string;
  debouncedSearchTerm: string;
  uniquePokemonTypes: string[];
}

const defaultContextValue: PokemonContextType = {
  pokemons: [],
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

  const { pokemons, isLoading, errorMessage } = usePokemonSearch(debouncedSearchTerm);

  const uniquePokemonTypes = useMemo(() => {
    const pokemonTypes = pokemons.flatMap(pokemon => pokemon?.types.map(type => type.type.name));
    const filteredPokemonTypes = pokemonTypes.filter((type): type is string => type !== undefined);
    return [...new Set(filteredPokemonTypes)];
  }, [pokemons]);


  const value = useMemo(() => ({
    pokemons,
    searchTerm,
    isLoading,
    errorMessage,
    debouncedSearchTerm,
    uniquePokemonTypes,
  }), [pokemons, searchTerm, isLoading, errorMessage, debouncedSearchTerm, uniquePokemonTypes]);

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = (): PokemonContextType => useContext(PokemonContext);
