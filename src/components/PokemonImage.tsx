type Props = {
  sprite: string | null;
  alt: string;
  size: 's' | 'm' | 'l';
}

const sizeClasses = {
  s: 'w-10 h-10',
  m: 'w-20 h-20',
  l: 'w-40 h-40',
};

export default function PokemonImage({ sprite, alt, size }: Props) {
  if (!sprite) {
    return null;
  }
  const sizeClass = sizeClasses[size];

  return <img className={`${sizeClass} bg-gray-200 rounded-full`} src={sprite} alt={alt} />;
}