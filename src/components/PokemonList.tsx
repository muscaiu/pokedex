import {
  Link, useSearchParams
} from "react-router-dom";
import { Pokemon } from 'pokenode-ts';
import LoadingSpinner from "./LoadingSpinner";
import { usePokemonContext } from "./PokemonContext";

export default function PokemonList() {
  const { pokemons, isLoading, errorMessage, debouncedSearchTerm } = usePokemonContext();

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');
  const selectedType = searchParams.get('type');

  const filteredPokemons = selectedType
    ? pokemons.filter((pokemon): pokemon is Pokemon =>
      pokemon !== null && pokemon.types.some(type => type.type.name === selectedType))
    : pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null);

  return (
    <>
      {isLoading && (
        <div role="status" className="mt-10">
          <LoadingSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {pokemons.length > 0 ? (
        <>
          <div className="mt-4">
            Found {filteredPokemons.length} {filteredPokemons.length === 1 ? 'Pokemon' : 'Pokemons'}
            &nbsp;with names containing <span className="text-red-500">{searchParam}</span>
            {selectedType && <span>&nbsp;of type <span className="text-red-500">{selectedType}</span></span>}
            &nbsp;!
          </div>

          <ul className="bg-gray-800 mt-4 w-full">
            {filteredPokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className="pl-8 pr-2 py-1 border-b-1 relative cursor-pointer hover:text-white hover:bg-gray-700">
                <Link
                  to={{
                    pathname: `/pokemon/${pokemon.name}`,
                  }}
                  state={{ pokemon: pokemon }}
                  className="flex items-center text-gray-200"
                >

                  {pokemon.sprites.front_default ? (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 bg-gray-200 rounded-full" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}

                  <div className="ml-8">{pokemon.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : debouncedSearchTerm.length > 1 && !isLoading ? (
        <div className="mt-10">No results</div>
      ) : null}

      {!errorMessage && <div className="text-red-500 mt-10">{errorMessage}</div>}
    </>
  )
}