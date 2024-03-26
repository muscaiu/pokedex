import { useLocation } from 'react-router-dom';
import PokemonImage from '../global/PokemonImage';
import BackButton from '../global/BackButton';
import useFetchPokemonDetails from '../../hooks/useFetchPokemonDetails';
import LoadingSpinner from '../icons/LoadingSpinner';

export default function PokemonDetails() {
  const loc = useLocation();
  const pokemonName: string = loc.pathname.split('/').pop() || '';

  const { pokemonDetails, isLoading, errorMessage } = useFetchPokemonDetails(pokemonName);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      {pokemonDetails && (
        <div className='mx-auto max-w-2xl'>
          <div className="mx-4 bg-gray-800 rounded-lg shadow text-white font-semibold tracking-tight">
            <div className="p-8">
              <h3 className="text-3xl mt-4 mb-2 text-center">{pokemonDetails.name}</h3>
              <div className='flex md:flex-row-reverse flex-col justify-between items-center'>
                <PokemonImage size="l" sprite={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                <div>
                  <h3 className="text-xl my-4 text-blue-300">XP: &nbsp;
                    <span className="text-center bg-yellow-100 text-blue-800 text-md font-semibold px-2.5 py-0.5 rounded">
                      {pokemonDetails.base_experience}
                    </span>
                  </h3>
                  <h3 className="text-xl my-4 text-blue-300">Height: <span className='text-white'>{pokemonDetails.height}</span></h3>
                  <h3 className="text-xl my-4 text-blue-300">Weight: <span className='text-white'>{pokemonDetails.weight}</span></h3>
                </div>
              </div>

              <div className='mt-4 font-light'>
                <div>
                  <h3 className='inline font-semibold text-blue-300'>Species: </h3>
                  {pokemonDetails.species.name}
                </div>

                <div className='mt-2'>
                  <h3 className='inline font-semibold text-blue-300'>Forms:</h3>
                  {pokemonDetails.forms.map(form => (
                    <span className='mx-1' key={form.name}>{form.name}</span>
                  ))}
                </div>

                <div className='mt-2 flex flex-wrap'>
                  <h3 className='inline font-semibold text-blue-300'>Abilities:</h3>
                  {pokemonDetails.abilities.sort((a, b) => a.ability.name.localeCompare(b.ability.name)).map(({ ability }) => (
                    <span className='mx-1' key={ability.name}>{ability.name}</span>
                  ))}
                </div>

                <div className='mt-2 flex flex-wrap items-center'>
                  <h3 className='font-semibold text-blue-300'>Moves:</h3>
                  {pokemonDetails.moves.sort((a, b) => a.move.name.localeCompare(b.move.name)).map(({ move }) => (
                    <div className='m-0.5 bg-gray-900 p-1 whitespace-nowrap' key={move.name}>{move.name}</div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <BackButton />
        </div>
      )}

      {!errorMessage && <div className="text-red-500 mt-10">{errorMessage}</div>}
    </>
  )
}

