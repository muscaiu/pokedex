import { Pokemon } from 'pokenode-ts';
import { useLocation } from 'react-router-dom';
import PokemonImage from './PokemonImage';
import BackButton from './BackButton';

export default function PokemonDetails() {
  const { state } = useLocation();
  const { pokemon } = state as { pokemon: Pokemon };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow text-white font-semibold tracking-tight">
        <div className="px-5 pb-5">
          <h5 className="text-3xl mt-4 mb-2 text-center">{pokemon.name}</h5>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col md:flex-row'>
              <PokemonImage sprite={pokemon.sprites.front_default} alt={pokemon.name} />
              <PokemonImage sprite={pokemon.sprites.back_default} alt={pokemon.name} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <PokemonImage sprite={pokemon.sprites.front_female} alt={pokemon.name} />
              <PokemonImage sprite={pokemon.sprites.back_female} alt={pokemon.name} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <PokemonImage sprite={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <PokemonImage sprite={pokemon.sprites.back_shiny} alt={pokemon.name} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <PokemonImage sprite={pokemon.sprites.front_shiny_female} alt={pokemon.name} />
              <PokemonImage sprite={pokemon.sprites.back_shiny_female} alt={pokemon.name} />
            </div>
          </div>

          <div className='text-center'>
            <span>XP: &nbsp;</span>
            <span className="text-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {pokemon.base_experience}
            </span>
            <h5 className="text-xl my-4">Height: {pokemon.height}</h5>
            <h5 className="text-xl my-4">Weight: {pokemon.weight}</h5>
          </div>
        </div>
      </div>
      <BackButton />
    </>
  )
}

