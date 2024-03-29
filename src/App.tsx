import {
  Routes,
  Route,
} from "react-router-dom";
import PokemonDetails from './components/pages/PokemonDetails';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import NotFound from "./components/pages/NotFound";
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
