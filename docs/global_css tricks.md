Yes, you can absolutely do that, and honestly for your project it is a **great idea** because you are starting to have repeated design patterns.

The clean way is to create a CSS variable specifically for your detail page menu panels.

In `globals.css`:

```css
:root {
  --dpm-bg: rgba(255, 255, 255, 0.6);
}
```

Then in your detail modules:

```tsx
<section className="bg-[var(--dpm-bg)] rounded shadow p-4">
```

Now everywhere you use:

```tsx
bg-[var(--dpm-bg)]
```

is tied together.

Later, if you decide:

```css
:root {
  --dpm-bg: rgba(30, 30, 30, 0.85);
}
```

every detail page panel changes.

---

You can do this for more than just background:

```css
:root {
  --dpm-bg: rgba(255, 255, 255, 0.6);
  --dpm-shadow: 0 2px 8px rgba(0,0,0,0.25);
  --dpm-radius: 0.5rem;
  --dpm-label-color: #111827;
}
```

Then:

```tsx
<section
  className="bg-[var(--dpm-bg)] rounded-[var(--dpm-radius)] shadow-[var(--dpm-shadow)] p-4"
>
```

---

You can even make game-specific versions:

```css
:root {
  --magic-dpm-bg: rgba(255,255,255,0.6);
  --pokemon-dpm-bg: rgba(255,220,0,0.4);
  --yugioh-dpm-bg: rgba(120,80,180,0.4);
}
```

Then:

```tsx
<section className="bg-[var(--magic-dpm-bg)]">
```

---

One thing I would suggest for naming: I like your idea of `dpm`, but maybe make it slightly more descriptive:

```css
--detail-panel-bg
```

or:

```css
--detail-menu-bg
```

because six months from now:

```css
--dpm-bg
```

might make you think:

> "What was dpm again?" 😄

But technically your naming idea is perfectly fine.

Your app is actually at the point where this kind of thing starts paying off. You have enough repeated modules now that a small theme layer will save you a lot of editing. 👍

Yes, exactly. 👍

CSS variables use:

* **two hyphens (`--`) at the beginning**
* **hyphens (`-`) between words**
* **not underscores (`_`)**

So this is correct:

```css
:root {
  --detail-panel-bg: rgba(255, 255, 255, 0.6);
}
```

And you use it like:

```tsx
<section className="bg-[var(--detail-panel-bg)]">
```

---

These are **not** the standard CSS variable style:

❌ Underscores:

```css
--detail_panel_bg: rgba(255,255,255,0.6);
```

Technically CSS allows underscores in names, but the common convention is hyphens.

❌ Single dash:

```css
-detail-panel-bg
```

That is not a CSS variable.

---

A good naming pattern for your project could be:

```css
:root {
  --detail-panel-bg: rgba(255,255,255,0.6);
  --detail-panel-shadow: 0 2px 8px rgba(0,0,0,0.2);
  --detail-panel-radius: 0.5rem;

  --stat-label-width: 150px;

  --magic-accent: #22c55e;
  --pokemon-accent: #facc15;
  --yugioh-accent: #a855f7;
}
```

Then your components read almost like English:

```tsx
bg-[var(--detail-panel-bg)]
text-[var(--magic-accent)]
grid-cols-[var(--stat-label-width)_1fr]
```

This is one of those small CSS habits that makes a project much easier to maintain later. 👍
