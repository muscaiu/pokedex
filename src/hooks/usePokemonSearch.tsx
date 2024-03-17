import { useState, useEffect } from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';

export default function usePokemonSearch(searchTerm: string) {
  const [pokemons, setPokemons] = useState<(Pokemon | null)[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const api = new PokemonClient();

    const fetchPokemonDetails = async (name: string): Promise<Pokemon | null> => {
      try {
        const pokemons = await api.getPokemonByName(name);
        return pokemons;
      } catch (error) {
        console.error(`Failed to fetch details for ${name}:`, error);
        return null;
      }
    };

    const fetchPokemons = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setPokemons([]);
        return;
      }

      setLoading(true);
      try {
        const { results } = await api.listPokemons(0, 1500);
        const searchResults = results.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));

        const detailsPromises = searchResults.map(pokemon => fetchPokemonDetails(pokemon.name));
        const details = await Promise.all(detailsPromises);

        setPokemons(details);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [searchTerm]);

  return { pokemons, isLoading, errorMessage };
}