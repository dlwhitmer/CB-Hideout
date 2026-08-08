This is actually a great use case for the data you already have. Since your hover flip already changes the image, you just need your **displayed stats to use the active face** instead of always using the main card fields.

The general idea:

1. Keep both faces in your database.
2. Track whether the card is showing front or back.
3. When flipped, swap the data being displayed.

---

### Step 1: Store the faces

For Magic, your card already has:

```ts
card_faces;
```

from Scryfall.

That JSON looks like:

```json
[
  {
    "name": "Ajani, Nacatl Pariah",
    "type_line": "Legendary Creature — Cat Warrior",
    "power": "1",
    "toughness": "2",
    "oracle_text": "..."
  },
  {
    "name": "Ajani, Nacatl Avenger",
    "type_line": "Legendary Planeswalker — Ajani",
    "loyalty": "3",
    "oracle_text": "..."
  }
]
```

---

### Step 2: In your detail page, parse it

Something like:

```tsx
const faces = card.card_faces ? JSON.parse(card.card_faces) : null;
```

Then create state:

```tsx
const [showBack, setShowBack] = useState(false);
```

---

### Step 3: Pick the active face

```tsx
const activeFace = faces && showBack ? faces[1] : faces ? faces[0] : card;
```

Now everything on your page uses:

```tsx
activeFace;
```

instead of:

```tsx
card;
```

---

Example:

Before:

```tsx
<h1>{card.name}</h1>

<p>{card.typeLine}</p>

<p>
  {card.power}/{card.toughness}
</p>
```

Change to:

```tsx
<h1>{activeFace.name}</h1>

<p>{activeFace.type_line}</p>

<p>
  {activeFace.power && `${activeFace.power}/${activeFace.toughness}`}
</p>

<p>
  {activeFace.loyalty && `Loyalty: ${activeFace.loyalty}`}
</p>
```

---

### Step 4: Connect it to your flip

Where your hover flip happens:

```tsx
onMouseEnter={() => setShowBack(true)}
onMouseLeave={() => setShowBack(false)}
```

Now your image and stats are tied together.

Hover:

```
Front image
↓
Back image
↓
Back stats
```

Mouse leaves:

```
Front image
↓
Front stats
```

---

One thing I would change in your database before you go much further:

Your `card_faces` JSON is actually your friend here. I would **not split everything into front/back columns yet** unless you have a reason.

Why?

Because Scryfall already gives you:

- front name
- back name
- front type
- back type
- front text
- back text
- front power
- back power
- back loyalty

in one structure.

Your detail page can simply interpret that.

Your current setup:

```ts
card_faces: text("card_faces");
```

is actually perfect for this feature.

Your hover flip idea + `card_faces` JSON is probably the cleanest way to handle Magic. 👍


That is probably the right call. 😄 This is one of those things where if you try to do it when you're tired, you'll end up chasing a tiny bug for two hours.

The good news is: you actually ended today in a pretty good place.

You now have:

✅ Magic importing sets correctly
✅ Single `magic_singles` table
✅ Correct handling of duplicates
✅ `card_faces` stored for double-faced cards
✅ Loyalty/defense issues figured out
✅ A hover flip already working visually

Tomorrow's task is actually pretty contained:

1. Go to your Magic detail page.
2. Parse:

```ts
const faces = card.card_faces ? JSON.parse(card.card_faces) : null;
```

3. Add a state:

```ts
const [flipped, setFlipped] = useState(false);
```

4. Create an `activeFace` object.

Something like:

```ts
const activeFace =
  faces && flipped
    ? faces[1]
    : faces
      ? faces[0]
      : card;
```

5. Change your detail page fields from:

```tsx
card.name
card.oracleText
card.power
card.toughness
card.loyalty
```

to:

```tsx
activeFace.name
activeFace.oracle_text
activeFace.power
activeFace.toughness
activeFace.loyalty
```

The nice thing is your existing hover flip can control the same `flipped` state.

---

One thing I would **not** do tomorrow:

Don't split every possible front/back field into your database yet.

Your `card_faces` JSON is already your "future proof" storage. You can always pull from it. If later you decide you want easier filtering/searching, then add dedicated columns.

Right now you have a clean foundation.

Also, I have to say — you went from fighting joins, duplicate sets, bad schemas, missing columns, and Scryfall data confusion to having a working importer. That was a pretty productive debugging session. 👍

Tomorrow's problem is no longer "why doesn't my data exist?" — it's just "how do I display the data I already have?" That's a much nicer problem to have. 😄


Perfect. 👍 You have the hard part done now. The other modules should be much easier because the pattern is established.

For each module that has front/back-specific data (`MagicCardRules`, `MagicCardInformation`, etc.), follow the same 3 steps:

---

### 1. Accept `showBack`

Change:

```tsx
type Props = {
  product: MagicSingle;
};
```

to:

```tsx
type Props = {
  product: MagicSingle;
  showBack: boolean;
};
```

and change:

```tsx
export default function MagicCardRules({ product }: Props)
```

to:

```tsx
export default function MagicCardRules({ 
  product, 
  showBack 
}: Props)
```

---

### 2. Get the active face

Import your helper:

```tsx
import { getActiveFace } from "../../../../../lib/magic/cardfaces";
```

Then inside the component:

```tsx
const face = getActiveFace(product, showBack);
```

Now you can use:

```tsx
face.type_line
face.name
face.mana_cost
face.oracle_text
```

instead of:

```tsx
product.frontTypeLine
product.frontName
product.frontManaCost
product.frontOracleText
```

---

### 3. Add the fade only around the changing content

Same idea you just did:

```tsx
<div
  key={showBack ? "back" : "front"}
  className="animate-fade-in"
>
   your changing content
</div>
```

Do **not** wrap the background section.

---

For example, your Rules module will probably go from something like:

```tsx
<StatRow
  label="Rules"
  value={product.frontOracleText}
/>
```

to:

```tsx
<StatRow
  label="Rules"
  value={face.oracle_text}
/>
```

---

A good order to update them:

1. ✅ MagicCardHeader (done)
2. MagicCardRules
3. MagicCardInformation
4. Collector (probably stays the same)
5. Prices (probably stays the same)

The ones that usually need `showBack` are the ones using:

* `frontName`
* `frontTypeLine`
* `frontManaCost`
* `frontOracleText`
* `frontPower`
* `frontToughness`
* loyalty values

The ones using:

* product ID
* price
* condition
* inventory
* purchase info

usually stay tied to the product and don't need changing.

You have the architecture right now — adding dual-face support to each module is just replacing `product.frontSomething` with `face.something`. 👍
