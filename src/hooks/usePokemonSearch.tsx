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
        const foundPokemons = await api.getPokemonByName(name);
        return foundPokemons;
      } catch (error) {
        console.error(`Failed to fetch details for ${name}:`, error);
        return null;
      }
    };

    const fetchPokemons = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setFoundPokemons([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = allPokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));

        const detailsPromises = searchResults.map(pokemon => fetchPokemonDetails(pokemon.name));
        const pokemonDetails = await Promise.all(detailsPromises);

        setFoundPokemons(pokemonDetails);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [allPokemons, searchTerm]);

  return { foundPokemons, isLoading, errorMessage };
}