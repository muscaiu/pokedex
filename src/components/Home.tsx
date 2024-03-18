import Filter from './Filter';
import PokemonList from './PokemonList';
import Search from './Search';
import { PokemonProvider } from '../context/PokemonContext';

export default function Home() {
  return (
    <PokemonProvider>
      <div className='flex flex-col items-center max-w-2xl mx-auto'>
        <div className='flex flex-col md:flex-row md:mt-0'>
          <Search />
          <Filter />
        </div>
        <PokemonList />
      </div>
    </PokemonProvider>
  )
}
