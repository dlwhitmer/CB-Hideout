
type Props = {
  manaCost: string;
};

export default function ManaSymbols({ manaCost }: Props) {
  const symbols = manaCost.match(/\{(.*?)\}/g);

  if (!symbols) return null;

  return (
    <span className="inline-flex items-center gap-1">
      {symbols.map((symbol, index) => {
        const cleanSymbol = symbol.replace(/[{}]/g, "");

        return (
          <img
            key={index}
            src={`https://svgs.scryfall.io/card-symbols/${cleanSymbol}.svg`}
            alt={`${cleanSymbol} mana`}
            className="w-6 h-6"
          />
        );
      })}
    </span>
  );
}