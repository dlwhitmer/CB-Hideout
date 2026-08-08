Yes, it is absolutely possible. In fact, what you wrote is valid React. You can have multiple conditional render blocks using the same `showBack` boolean.

Your logic is basically:

```text
showBack = false
    ↓
show front name
show front stats

showBack = true
    ↓
show back name
show back stats
```

There is nothing wrong with having:

```tsx
{!showBack ? (
  // front name
) : (
  // back name
)}
```

and later:

```tsx
{!showBack ? (
  // front stats
) : (
  // back stats
)}
```

---

However, you can make this much cleaner by doing the condition **once** and storing the active values.

Example:

```tsx
export default function MagicCardHeader({ product, showBack }: Props) {
  const name = showBack ? product.backName : product.frontName;
  const manaCost = showBack ? product.backManaCost : product.frontManaCost;
  const typeLine = showBack ? product.backTypeLine : product.frontTypeLine;

  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4 w-full">
      <div className="text-xl text-center font-extrabold">
        <h2>Card Name:</h2>

        <div className="text-lg font-semibold">{name}</div>
      </div>

      <div className="text-lg grid grid-cols-1 gap-1">
        <StatRow
          label="Mana Cost:"
          value={<ManaSymbols manaCost={manaCost ?? ""} />}
        />

        <StatRow label="Type Line" value={typeLine} />

        <StatRow
          label="Color Identity"
          value={
            product.colorIdentity
              ? JSON.parse(product.colorIdentity).join(", ")
              : ""
          }
        />
      </div>
    </section>
  );
}
```

The advantage:

- You only check `showBack` once.
- Your JSX becomes much shorter.
- You don't risk accidentally doing:

  ```tsx
  frontName;
  ```

  with:

  ```tsx
  backManaCost;
  ```

  later.

---

That said, your original approach is **not wrong**. For a few fields, two `{!showBack}` blocks are perfectly fine. I would only switch to the `const name = ...` pattern once you start having lots of front/back fields.

Given your Magic schema has a lot of:

```text
frontName
frontManaCost
frontTypeLine
frontOracleText

backName
backManaCost
backTypeLine
backOracleText
```

the active-value approach will probably save you a lot of typing as you build the other modules. 👍

Honestly, I think that is the better direction for your Magic modules. 👍

What you just discovered is basically the pattern that your original `getActiveFace()` helper was trying to solve, but this version fits your schema better.

Instead of every module doing:

```tsx id="m2r1ws"
{
  !showBack ? (
    <StatRow value={product.frontSomething} />
  ) : (
    <StatRow value={product.backSomething} />
  );
}
```

over and over, you make the module decide the active values once:

```tsx id="8h8s3a"
const name = showBack ? product.backName : product.frontName;
const manaCost = showBack ? product.backManaCost : product.frontManaCost;
const typeLine = showBack ? product.backTypeLine : product.frontTypeLine;
```

Then the rest of the module doesn't care which side is showing:

```tsx id="4m9w0j"
<StatRow label="Name" value={name} />
<StatRow label="Type Line" value={typeLine} />
<StatRow label="Mana Cost" value={manaCost} />
```

---

The really nice part is your modules become consistent:

### MagicCardHeader

```tsx
const name = showBack ? product.backName : product.frontName;
const manaCost = showBack ? product.backManaCost : product.frontManaCost;
```

### MagicCardRules

```tsx
const oracleText = showBack ? product.backOracleText : product.frontOracleText;
```

### MagicCardInformation

```tsx
const power = showBack ? product.backPower : product.frontPower;

const toughness = showBack ? product.backToughness : product.frontToughness;
```

Same pattern everywhere.

---

You can even make it cleaner later with a helper:

```tsx
const active = {
  name: showBack ? product.backName : product.frontName,
  manaCost: showBack ? product.backManaCost : product.frontManaCost,
  typeLine: showBack ? product.backTypeLine : product.frontTypeLine,
  oracleText: showBack ? product.backOracleText : product.frontOracleText,
};
```

Then:

```tsx
<StatRow label="Type Line" value={active.typeLine} />
```

---

And this actually solves a problem you were running into yesterday:

You were thinking:

> "Why can't `face.oracle_text` just work everywhere?"

The reason is your database isn't structured as:

```text
faces:
 [
   {
     name,
     mana_cost,
     oracle_text
   }
 ]
```

It is structured more like:

```text
frontName
frontManaCost
frontOracleText

backName
backManaCost
backOracleText
```

So creating an "active side" object inside each module is a very natural bridge between your database design and your UI.

I would definitely use this pattern for:

- Magic
- Pokémon (if you have alternate forms)
- Yu-Gi-Oh (if you ever have extra data sides)

This is one of those refactors that will make your code **much easier to maintain** as Card Hideout grows. 👍

Exactly. This is one of those changes that looks like a little extra work at first, but it pays off quickly.

The biggest advantage is that your **JSX stops caring about front/back logic**.

Without the pattern, every module becomes:

```tsx
if front:
   show frontName
   show frontManaCost
   show frontTypeLine
else:
   show backName
   show backManaCost
   show backTypeLine
```

Then you repeat that in:

- Header
- Rules
- Information
- Collector
- Prices (if needed)
- Purchase section (if needed)

Pretty soon every file has the same conditional blocks.

---

With the active values pattern:

```tsx
const name = showBack ? product.backName : product.frontName;
const manaCost = showBack ? product.backManaCost : product.frontManaCost;
```

your JSX becomes about **what you are displaying**, not **where the data came from**.

Example:

```tsx
<StatRow label="Name" value={name} />
<StatRow label="Mana Cost" value={manaCost} />
<StatRow label="Type" value={typeLine} />
```

Much easier to read.

---

Another benefit you will appreciate later: debugging.

Right now if something is wrong you have to ask:

> "Did I use the wrong front/back field in this condition?"

With an active object you can temporarily do:

```tsx
console.log(active);
```

and see:

```js
{
  name: "Ajani, Nacatl Pariah",
  manaCost: "{1}{W}",
  typeLine: "Legendary Creature — Cat Warrior",
  oracleText: "..."
}
```

You immediately know the module is receiving the correct side.

---

One thing I would suggest as you convert modules: don't rush to make a huge global helper again. Keep it local first.

For example:

```tsx
export default function MagicCardRules({ product, showBack }: Props) {
  const oracleText = showBack
    ? product.backOracleText
    : product.frontOracleText;

  return <section>{oracleText}</section>;
}
```

After you have 3-4 modules working this way, you will know whether a shared helper is worth it.

---

Also, this fits really well with the way you have Card Hideout structured now:

- `MagicDisplay` → controls the state (`showBack`)
- Image → changes the state
- Modules → display active data
- `StatRow` → controls the visual style

That is a very clean separation of responsibilities. 👍

I think this approach will make adding the Pokémon and Yu-Gi-Oh detail pages easier too because the UI components can follow the same idea: **normalize the data first, render second.**
