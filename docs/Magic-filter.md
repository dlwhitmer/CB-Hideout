Nice! 👍 Your Magic page is in a good spot now.

For Magic filters, I would think about what customers actually search for when buying cards. Magic is different from Pokémon — **set, color, rarity, card type, and price** are probably your most useful filters.

Based on your `magicSingles` schema, you already have a lot of good fields:

```ts
setCode
setName
manaCost
colors
colorIdentity
typeLine
rarity
price
foil_price
quantity
```

I would build your public filters around these:

---

### 1. Set (most important)

You already have this pattern from Pokémon.

Example:

```tsx
<select name="set">
  <option value="">All Sets</option>
  {sets.map((s: any) => (
    <option key={s.setCode} value={s.setCode}>
      {s.setName}
    </option>
  ))}
</select>
```

Players often search by set:

* Modern Horizons 3
* Commander Masters
* Wilds of Eldraine
* etc.

---

### 2. Card Type

Use your `typeLine`.

Examples:

```tsx
<option value="Creature">Creature</option>
<option value="Instant">Instant</option>
<option value="Sorcery">Sorcery</option>
<option value="Artifact">Artifact</option>
<option value="Enchantment">Enchantment</option>
<option value="Planeswalker">Planeswalker</option>
<option value="Land">Land</option>
```

Your API already does:

```ts
like(magicSingles.typeLine, `%${type}%`)
```

so this will work.

---

### 3. Rarity

Definitely include this.

```tsx
<option value="common">Common</option>
<option value="uncommon">Uncommon</option>
<option value="rare">Rare</option>
<option value="mythic">Mythic Rare</option>
<option value="basic lands">Basic Lands</option>
```

Your API already supports:

```ts
eq(magicSingles.rarity, rarity)
```

---

### 4. Color

This one is very useful.

Your `colors` field is JSON:

```json
["G","W"]
```

So you can filter like Pokémon:

```ts
like(magicSingles.colors, `%${color}%`)
```

Options:

```tsx
<option value="W">White</option>
<option value="U">Blue</option>
<option value="B">Black</option>
<option value="R">Red</option>
<option value="G">Green</option>
```

---

### 5. Price

You already have this from Pokémon.

I would use:

```tsx
<option value=".01to5">$0.01 - $5</option>
<option value="5to20">$5 - $20</option>
<option value="20to50">$20 - $50</option>
<option value="50plus">$50+</option>
```

Magic has a lot more expensive cards than Pokémon, so I would add higher ranges.

---

### 6. Foil / Nonfoil

Since you have:

```ts
price
foil_price
```

this is a really nice Magic-specific filter.

Example:

```tsx
<select name="finish">
  <option value="">Any Finish</option>
  <option value="normal">Nonfoil</option>
  <option value="foil">Foil</option>
</select>
```

---

### 7. Mana Value (CMC)

This is another very Magic-specific filter.

You already store:

```ts
cmc
```

You could have:

```tsx
<option value="0">0 Mana</option>
<option value="1">1 Mana</option>
<option value="2">2 Mana</option>
<option value="3">3 Mana</option>
<option value="4">4+ Mana</option>
```

This is actually useful for deck builders.

---

If I were ordering them on your page, I would do:

```
[Set]
[Type]
[Rarity]
[Color]
[Price]
[Finish]
[Mana Cost]
```
Name
Mana Symbols
Type Line
Power / Toughness
Set
Collector #
Rarity
Artist
Price
That gives customers the filters they expect without overwhelming them.

One more thing: since you are building this as a card shop for your daughter, I would **not** put every Scryfall field into filters. Things like:

* artist
* keywords
* oracle text
* collector number

are great for the detail page, but not really browsing filters.

Your Pokémon filters are already close to a retail site; I would make Magic follow the same layout so the site feels consistent. 👍
