I see the issue now. Your `Card Name:` is centered because it is in this:

```tsx
<div className="text-xl text-center font-extrabold">
  <h2>Card Name:</h2>
</div>
```

That div is a normal block that spans the whole section.

But your `StatRow` is inside this:

```tsx
<div className="text-lg grid pl-20 grid-cols-2 gap-2">
  <StatRow label="" value={product.frontName} align="center" />
</div>
```

The problem is this wrapper:

```css
grid grid-cols-2 pl-20
```

You are creating **two columns** and adding **left padding** before the `StatRow`.

So your layout is basically:

```
|  column 1  |  column 2  |
|            |  Card Name |
```

Your `StatRow` is centering **inside the grid column**, not inside the whole 700px section.

---

For the card name, remove the grid wrapper:

```tsx
{!showBack ? (
  <div className="text-lg">
    <StatRow 
      label="" 
      value={product.frontName} 
      align="center" 
    />
  </div>
) : (
  <div className="text-lg">
    <StatRow 
      label="" 
      value={product.backName} 
      align="center" 
    />
  </div>
)}
```

Or even simpler:

```tsx
{!showBack ? (
  <StatRow 
    label="" 
    value={product.frontName} 
    align="center" 
  />
) : (
  <StatRow 
    label="" 
    value={product.backName} 
    align="center" 
  />
)}
```

Your `StatRow` already has:

```tsx
<p className={alignment[align]}>
```

so it already knows how to center.

---

Also, since this is a **header/title**, I would probably not use a grid at all. Your header could be:

```tsx
<section className="bg-[var(--dpm)] w-[700px] rounded shadow p-4">
  <h2 className="text-xl text-center font-extrabold mb-2">
    Card Name:
  </h2>

  {!showBack ? (
    <StatRow 
      label="" 
      value={product.frontName} 
      align="center" 
    />
  ) : (
    <StatRow 
      label="" 
      value={product.backName} 
      align="center" 
    />
  )}
</section>
```

The key thing: **your StatRow is not the problem. The grid wrapper is moving it.**

Your debugging instinct was good — you narrowed it down to the exact component causing the difference. 👍

Ah, now I can see exactly why it is not behaving the way you expected.

Your `StatRow` is **not using a grid anymore**. It is returning a single `<p>`:

```tsx
return (
  <p className={alignment[align]}>
    <span>{label}</span>{" "}
    <span>{value}</span>
  </p>
);
```

So `align="center"` **should work** on the `<p>`.

Your usage:

```tsx
<StatRow label="" value={product.frontName} align="center" />
```

should center the text.

However, this part is probably affecting what you see:

```tsx
<span className="text-[var(--dplbltext)] pl-10 font-semibold">
  {label}
</span>
```

Even though the label is empty, that span still exists and has:

```css
pl-10
```

which adds left padding.

So your "empty" label is actually adding space before your value.

---

### Simple fix

Change your return to only render the label span if there is a label:

```tsx
return (
  <p className={alignment[align]}>
    {label && (
      <span className="text-[var(--dplbltext)] pl-10 font-semibold">
        {label}{" "}
      </span>
    )}

    <span className="text-[var(--dpvtext)] font-semibold">
      {value}
    </span>
  </p>
);
```

Now:

```tsx
<StatRow 
  label="" 
  value={product.frontName} 
  align="center"
/>
```

will truly center.

And:

```tsx
<StatRow
  label="Mana Cost"
  value={product.frontManaCost}
/>
```

will still work normally.

---

One other small thing: your default is currently:

```tsx
align = "center"
```

That means every StatRow you don't specify will center. If most of your stats are meant to be:

```
Name: value
Type: value
Mana: value
```

you may want:

```tsx
align = "left"
```

and only use:

```tsx
align="center"
```

for titles like card names.

Your component is actually set up well — it was just the empty label still taking up space. 👍
