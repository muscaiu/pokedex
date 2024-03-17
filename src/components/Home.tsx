import Filter from '../components/Filter';
import PokemonList from '../components/PokemonList';
import Search from './Search';
import { PokemonProvider } from './PokemonContext';

export default function Home() {
  return (
    <PokemonProvider>
      <div className='flex flex-col items-center max-w-3xl mx-auto'>
        <div className='flex flex-col md:flex-row md:mt-0'>
          <Search />
          <Filter />
        </div>
        <PokemonList />
      </div>
    </PokemonProvider>
  )
}
