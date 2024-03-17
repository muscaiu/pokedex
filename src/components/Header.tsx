import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
    }
  };

  return (
    <Link to="/" onClick={handleClick} className="bg-gray-800 flex justify-center mb-10 text-2xl p-4 text-gray-300 hover:text-white">
      Pokedex
      <span className="text-red-600">&nbsp;❤️</span>
    </Link>
  );
}