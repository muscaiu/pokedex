import { Pokemon } from 'pokenode-ts';
import { useLocation } from 'react-router-dom';
import PokemonImage from './PokemonImage';
import BackButton from './BackButton';

export default function PokemonDetails() {
  const loc = useLocation();
  console.log('loc:', loc)
  const { pokemon } = loc.state as { pokemon: Pokemon };

  return (
    <div className='mx-auto max-w-2xl'>
      <div className="mx-4 bg-gray-800 rounded-lg shadow text-white font-semibold tracking-tight">
        <div className="p-6">
          <h5 className="text-3xl mt-4 mb-2 text-center">{pokemon.name}</h5>
          <div className='flex md:flex-row-reverse flex-col justify-between items-center'>
            <PokemonImage size="l" sprite={pokemon.sprites.front_default} alt={pokemon.name} />
            <div>
              <h5 className="text-xl my-4">XP: &nbsp;
                <span className="text-center bg-blue-100 text-blue-800 text-md font-semibold px-2.5 py-0.5 rounded">
                  {pokemon.base_experience}
                </span>
              </h5>
              <h5 className="text-xl my-4">Height: {pokemon.height}</h5>
              <h5 className="text-xl my-4">Weight: {pokemon.weight}</h5>
            </div>
          </div>

          <div className='mt-4 font-light'>
            <h5 className='inline font-semibold text-blue-300'>Abilities:</h5>
            {pokemon.abilities.map(({ ability }) => (
              <span className='mx-1' key={ability.name}>{ability.name}</span>
            ))}
          </div>

          <div className='mt-2 font-light'>
            <h5 className='inline font-semibold text-blue-300'>Forms:</h5>
            {pokemon.forms.map(form => (
              <span className='mx-1' key={form.name}>{form.name}</span>
            ))}
          </div>

          <div className='mt-2 font-light'>
            <h5 className='inline font-semibold text-blue-300'>Forms:</h5>
            {pokemon.moves.map(({ move }) => (
              <span className='mx-1' key={move.name}>{move.name}</span>
            ))}
          </div>

        </div>
      </div>
      <BackButton />
    </div>
  )
}

