import { useState, useEffect } from 'react';
import { Pokemon, PokemonClient, NamedAPIResource } from 'pokenode-ts';

export default function usePokemonSearch(searchTerm: string, allPokemons: NamedAPIResource[]) {
  const [foundPokemons, setFoundPokemons] = useState<(Pokemon | null)[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const api = new PokemonClient();

    const fetchPokemonDetails = async (name: string): Promise<Pokemon | null> => {
      try {
        setLoading(true);
        const foundPokemons = await api.getPokemonByName(name);
        return foundPokemons;
      } catch (error) {
        console.error(`Failed to fetch details for ${name}:`, error);
        return null;
      } finally {
        setLoading(false);
      }
    };

    const fetchPokemons = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setFoundPokemons([]);
        return;
      }

      try {
        setLoading(true);
        const searchResults = allPokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
        const detailsPromises = searchResults.map(pokemon => fetchPokemonDetails(pokemon.name));
        const pokemonDetails = await Promise.all(detailsPromises);
        const sortedPokemonDetails = [...pokemonDetails].sort((a, b) => {
          if (!a || !b) {
            return 0;
          }
          return a.name.localeCompare(b.name)
        });

        setFoundPokemons(sortedPokemonDetails);
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [allPokemons, searchTerm]);

  return { foundPokemons, isLoading, errorMessage };
}