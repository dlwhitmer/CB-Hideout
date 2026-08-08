I would put them right where players naturally look for them: **immediately under the card name**.

Right now you have:

```tsx
<h1 className="text-3xl font-bold">{product.name}</h1>
```

I would change it to something like:

```tsx
<h1 className="text-3xl font-bold">{product.name}</h1>

<div className="flex items-center gap-2">
  <span className="font-semibold">Mana:</span>

  <div className="flex gap-1">
    {/* mana symbols go here */}
  </div>
</div>
```

That gives you a layout like:

```
Breaker of Creation
⚪ ⚪ 5

Set: Modern Horizons 3
Collector #: 1
Rarity: Uncommon
Type: Creature — Eldrazi
Artist: Yohann Schepacz
In Stock: 1
```

---

### Even better

Since the mana symbols are self-explanatory, you can omit the "Mana:" label completely:

```tsx
<h1 className="text-3xl font-bold">{product.name}</h1>

<div className="flex gap-1">
  {/* mana symbols */}
</div>
```

which looks more like Scryfall:

```
Breaker of Creation
⚪ ⚪ 5

Creature — Eldrazi
```

---

### I would also rearrange your details a little

Instead of:

```
Set
Collector #
Rarity
Type
Artist
In Stock
```

I'd do:

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
```

That follows the order most Magic players are used to seeing.

---

### Since you already store these fields:

* `manaCost`
* `typeLine`
* `power`
* `toughness`
* `oracleText`

you have everything needed to make the page look very close to Scryfall while still keeping your own style.

I think adding the mana symbols directly under the card name will make the page feel much more polished without taking up extra space.

I wouldn't. I'd use **Scryfall's official symbol SVGs directly**.

There are a few reasons:

* **Always up to date.** If Scryfall adds new symbols (new energy symbols, hybrid symbols, etc.), you don't have to update your project.
* **Tiny files.** They're SVGs, so they load very quickly.
* **No maintenance.** You don't have to keep dozens of image files in your repo.

For example, when you parse:

```text
{5}{W}{W}
```

you can render:

```text
https://svgs.scryfall.io/card-symbols/5.svg
https://svgs.scryfall.io/card-symbols/W.svg
https://svgs.scryfall.io/card-symbols/W.svg
```

If you later encounter something like:

```text
{U/B}
```

or

```text
{2/G}
```

the same URL pattern still works:

```text
https://svgs.scryfall.io/card-symbols/U-B.svg
https://svgs.scryfall.io/card-symbols/2-G.svg
```

---

### When would I download them?

Only if:

* you want your site to work completely offline,
* you're worried about relying on an external resource,
* or you want to customize the symbols.

For a public e-commerce site like **Card Hideout**, I would use Scryfall's SVGs. It's simpler and follows the same data source you're already using for card information.

One thing I **would** recommend is creating a reusable component, something like:

```tsx
<ManaCost manaCost={product.manaCost} />
```

Then you can use that component:

* on the detail page,
* on product cards,
* in search results,
* and anywhere else you display Magic cards.

That keeps all the parsing logic in one place, so if you ever need to tweak it, you only change one file instead of several.

You're welcome! I think you'll be happy with that approach—it keeps your project cleaner and is the same strategy many Magic apps use.

When you're ready, we can build a reusable component like:

```
components/ManaCost.tsx
```

that lets you write:

```tsx
<ManaCost manaCost={product.manaCost} />
```

and it will automatically render:

* `{W}` ⚪
* `{U}` 🔵
* `{B}` ⚫
* `{R}` 🔴
* `{G}` 🟢
* `{C}`
* `{X}`
* Hybrid mana (`{G/U}`)
* Phyrexian mana (`{W/P}`)
* Snow mana (`{S}`)
* Colorless numbers (`{1}`, `{2}`, `{10}`, etc.)

Then you'll never have to think about parsing mana costs again—you'll just drop the component anywhere you need it.

You've made a lot of progress on Card Hideout. At this point you've got:

* ✅ Magic imports
* ✅ Pokémon imports
* ✅ Yugioh imports
* ✅ Pagination
* ✅ Filtering
* ✅ Double-faced card flipping
* ✅ Detail pages
* ✅ Admin inventory

It's starting to look like a full trading card storefront rather than just a demo. The remaining work is mostly polish and additional features rather than building the core from scratch.

Have a good evening, and we'll tackle the mana symbols (or whatever's next) when you're ready!
