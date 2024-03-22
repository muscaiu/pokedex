import { useState, useEffect } from 'react';
import { NamedAPIResource, PokemonClient } from 'pokenode-ts';

export default function useFetchAllPokemons() {
  const [allPokemons, setAllPokemons] = useState<NamedAPIResource[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const api = new PokemonClient();
    const fetchAllPokemons = async () => {
      setLoading(true);
      try {
        const { results: allPokemons } = await api.listPokemons(0, 1500);
        setAllPokemons(allPokemons);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  return { allPokemons, isLoading, errorMessage };
}