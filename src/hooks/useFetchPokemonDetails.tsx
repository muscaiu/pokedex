import { useState, useEffect } from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';

export default function useFetchPokemonDetails(pokemonName: string) {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const api = new PokemonClient();

    const fetchPokemonDetails = async (): Promise<void> => {
      try {
        setLoading(true);
        const result = await api.getPokemonByName(pokemonName);
        setPokemonDetails(result);
      } catch (error) {
        console.error(`Failed to fetch details for ${pokemonName}:`, error);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  return { pokemonDetails, isLoading, errorMessage };
}