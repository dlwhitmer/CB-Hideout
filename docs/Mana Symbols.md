Great, now you are at the point where a small reusable component makes sense. You **do not** want to manually add `<img>` tags for every symbol. Your `mana_cost` already contains something like:

```
{1}{B}
```

So the component just needs to:

1. Read the string
2. Find everything inside `{ }`
3. Replace each symbol with the matching Scryfall SVG

---

### 1. Create a ManaSymbols component

Example:

`components/ManaSymbols.tsx`

```tsx
type Props = {
  manaCost: string;
};

export default function ManaSymbols({ manaCost }: Props) {
  const symbols = manaCost.match(/\{(.*?)\}/g);

  if (!symbols) return null;

  return (
    <div className="flex items-center gap-1">
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
    </div>
  );
}
```

---

### 2. Use it on your detail page

Where you have your card data:

```tsx
<ManaSymbols manaCost={product.mana_cost} />
```

If your card has:

```json
"mana_cost": "{1}{B}"
```

it will render:

```
[1] [B]
```

with the actual Scryfall symbols.

---

### 3. Example with your modules

Since you mentioned you are breaking your detail page into modules:

```
components/
 └── magic/
     ├── MagicCardImage.tsx
     ├── CardHeader.tsx
     ├── CardStats.tsx
     ├── CardPricing.tsx
     └── ManaSymbols.tsx   <-- here
```

Then your `CardHeader` could eventually have:

```tsx
<CardHeader product={product} />
```

and inside `CardHeader`:

```tsx
<ManaSymbols manaCost={product.mana_cost} />
```

That keeps the detail page clean.

---

One small thing: some Magic cards have symbols that are **not single letters**:

Examples:

```
{2}{W/U}
{G/P}
{X}
{T}
{1000000}
```

The code above will actually handle most of these because Scryfall's filenames use those exact symbol names (`W_U.svg`, etc.), but later you may want a small formatter for symbols containing `/`.

For now, `{1}{B}` and normal mana costs will work. This is a good first component to add. 👍

Yes, but it depends on **where you want the mana symbols to appear**.

Since you are already breaking the detail page into modules (`Header`, `CardImage`, `CardStats`, `CardPricing`, etc.), I would **not** put `ManaSymbols` directly in the main detail page unless you are just testing it.

You have two good options:

### Option 1 (probably best): Put it in your `CardHeader` module

Your detail page stays clean:

```tsx
<CardHeader product={product} />
```

Then inside `CardHeader.tsx`:

```tsx
import ManaSymbols from "../ManaSymbols";
```

(adjust the path depending on your folders)

Then:

```tsx
<ManaSymbols manaCost={product.mana_cost} />
```

Your header might show:

```
Emrakul, the World Anew          {12}
Legendary Creature — Eldrazi     [12]
```

---

### Option 2: Test it directly in your detail page

At the top of your detail page:

```tsx
import ManaSymbols from "@/components/ManaSymbols";
```

Then wherever you want it:

```tsx
<ManaSymbols manaCost={product.mana_cost} />
```

This is a good way to confirm it works before moving it into a module.

---

One thing to watch for: your `MagicSingle` type needs to have `mana_cost` defined. If TypeScript gives you a red underline here:

```tsx
<ManaSymbols manaCost={product.mana_cost} />
```

it probably means your schema/type calls it something else (for example `manaCost` instead of `mana_cost`).

Since your database came from Scryfall, I would expect:

```ts
mana_cost: string | null;
```

so your component may eventually need:

```tsx
<ManaSymbols manaCost={product.mana_cost ?? ""} />
```

to handle cards like lands that have no mana cost.

For your testing though, I would put it in `CardHeader` — that is exactly the kind of reusable piece that module structure is good for. 👍

Exactly. 👍

In practical use, **only import `ManaSymbols` into the module that is responsible for displaying the mana cost**.

For your setup, that is probably your `CardHeader` module because the mana cost usually appears beside the card name:

```
MagicCardDetail
│
├── CardHeader
│     ├── Card name
│     ├── Set info
│     └── Mana cost  ← ManaSymbols goes here
│
├── MagicCardImage
│
├── CardStats
│
├── CardPricing
│
└── CardCollector
```

So your flow would be:

**Detail page:**

```tsx
<CardHeader product={product} />
```

No need to import `ManaSymbols` here.

---

**CardHeader.tsx:**

```tsx
import ManaSymbols from "../ManaSymbols";

type Props = {
  product: MagicSingle;
};

export default function CardHeader({ product }: Props) {
  return (
    <section>
      <h1>{product.name}</h1>

      <ManaSymbols manaCost={product.mana_cost ?? ""} />
    </section>
  );
}
```

Now `CardHeader` owns the responsibility of showing the card title information and mana cost.

That keeps your detail page from becoming a giant file with 20 imports. Your module approach is actually the right way to handle this as the card detail grows. 👍

Later, you can do the same thing with:

- `OracleText` → only imported into the rules text module
- `CardStats` → power/toughness/type line
- `CardPricing` → prices
- `CollectorInfo` → collector number, rarity, set

Each module only knows about the data it displays. That will save you a lot of headaches as you add Pokémon/Yu-Gi-Oh support too.

You're welcome! 👍

You are actually at the point where your component structure is starting to pay off. Keeping each piece responsible for its own data will make the Magic/Yu-Gi-Oh/Pokémon expansion much easier later.

A good rule to keep using:

- **Detail page** = "put the pieces together"
- **Module/component** = "display one type of information"
- **Helper component** = "convert or format data"

So your detail page might eventually stay nice and simple:

```tsx
<CardHeader product={product} />
<MagicCardImage product={product} />
<CardStats product={product} />
<OracleText product={product} />
<CardPricing product={product} />
<CollectorInfo product={product} />
```

Then if you change how mana symbols look later (size, spacing, custom icons, etc.), you only touch `ManaSymbols.tsx` and every card updates.

You're building it the way a larger eCommerce app would normally be organized. 👍
