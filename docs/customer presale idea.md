Yes — if you eventually want to offer **"build me the whole set"** orders, I'd treat that as a **special-order workflow**, not as a normal product.

The key is: **don't let the customer place the order until your daughter has confirmed the price and availability.**

### A good workflow

```text id="4w8k2p"
Customer clicks "Request Complete Set"
                ↓
      Selects the set/possibly condition
                ↓
        Sends a set request
                ↓
       Admin receives request
                ↓
 Daughter checks inventory / availability
                ↓
      Daughter sets final price
                ↓
       Customer is notified
                ↓
       Customer pays upfront
                ↓
       Order becomes confirmed
                ↓
          Ship the set
```

That solves the problem you identified: **your daughter doesn't have to buy missing cards before getting paid.**

### What I'd store

You could eventually have a `set_requests` table:

```text id="m3j7qz"
id
customerName
customerEmail
game
setCode
setName
status
quotedPrice
notes
createdAt
expiresAt
```

And `status` could be something like:

```text id="c6p2vy"
Requested
↓
Checking Availability
↓
Quote Sent
↓
Awaiting Payment
↓
Paid
↓
Fulfilled
```

If she can't get the set together:

```text id="b8n4ws"
Unavailable
```

### The important part

I **wouldn't automatically calculate a price** from the individual cards and immediately charge the customer.

For a complete set, your daughter may need to:

* Check which cards she already has
* Check which cards she can acquire
* Account for card condition
* Decide whether the set is worth assembling
* Add acquisition costs
* Add her desired margin
* Decide on shipping

So the website should really say:

> **Request Complete Set**

rather than:

> **Buy Complete Set — $XXX**

until she's approved the quote.

### And you could make it really simple for her

In the admin:

```text id="j1r8cx"
Complete Set Request

Pokémon — Jungle
Customer: John
Email: john@example.com

Cards needed: 64
Cards currently available: 51

[ Quoted Price: $425.00 ]

[ Send Quote ]
[ Decline Request ]
```

Once she clicks **Send Quote**, the customer gets a payment option.

That gives you the best of both worlds: **the cool set-browsing feature can eventually generate real sales, but your daughter stays in control of the financial commitment.**

I wouldn't build this yet, though. 😄 It's a **Phase 2/3 feature** after your normal singles and sealed-product checkout is working.
