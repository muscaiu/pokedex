type Props = {
  sprite: string | null;
  alt: string;
}

export default function PokemonImage({ sprite, alt }: Props) {
  if (!sprite) {
    return null;
  }
  return <img height={100} width={100} src={sprite} alt={alt} />;
}
