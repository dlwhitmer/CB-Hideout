That is actually a really good breakdown. You are basically building the detail page the way a card marketplace would: separate sections instead of one giant component.

For a **Magic card detail page**, I would probably organize it like this:

```
MagicCardDetail
│
├── MagicCardImage
│
├── CardInfo
│     ├── Name
│     ├── Mana Cost
│     ├── Type Line
│     └── Color Identity
│
├── CardRules
│     └── Oracle Text
│
├── CardStats
│     ├── Power
│     └── Toughness
│
├── CollectorInfo
│     ├── Set
│     ├── Set Code
│     ├── Collector Number
│     ├── Rarity
│     ├── Language
│     ├── Artist
│     └── Finishes
│
├── CardPricing
│     ├── Market Price
│     ├── Foil Price
│     └── Non-Foil Price
│
└── AddToCart
```

A couple things I would consider adding:

### Card Info

Good place for:

- Name
- Mana cost (with your symbols)
- Type line
- Colors

Example:

```
Amped Raptor

{1}{R}

Creature — Dinosaur Raptor

Colors: Red
```

---

### Card Stats

I would keep this separate because not every card has stats.

Creature:

```
Power: 2
Toughness: 1
```

Instant/Sorcery:

```
(no stats shown)
```

Your `StatRow` already handles hiding empty values, so this is perfect.

---

### Collector Info

I like this section. For collectors, this is the important stuff:

```
Set: Modern Horizons 3
Collector #: 118
Rarity: Rare
Language: English
Artist: Simon Dominic
Finishes: Nonfoil, Foil
```

---

### One more module I would add later:

## Card Actions

Something like:

```
[ Add To Cart ]

Quantity: [-] 1 [+]
```

Keep that separate from card information.

---

One thing I would **not** put on the detail page right now:

- legalities (Commander, Modern, Legacy, etc.)
- rulings
- print variations

Those are cool collector features, but they will make the page busy. They could become expandable sections later.

Your current modules are honestly a good foundation:

✅ Card Image
✅ Card Info
✅ Card Rules
✅ Card Stats
✅ Collector Info
✅ Pricing

You have basically created the same separation that a real marketplace would use. The nice part is when you add Pokémon and Yu-Gi-Oh later, you can reuse the idea but swap the sections that are game-specific. 👍
