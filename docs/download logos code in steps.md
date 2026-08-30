Absolutely. And I found something useful: the **Magic set logos category currently has 335 files**, so this is exactly the kind of job where automation makes sense. ([MTG Wiki][1])

Also, MediaWiki's API supports exactly what we need: `categorymembers` can enumerate the files in a category, and `imageinfo` can give us the actual image information/URL. ([MediaWiki][2])

### Let's do it one step at a time

Since you've used Python before, I'd make a little standalone script **outside your Next.js app**.

First, create:

```text
download_magic_logos.py
```

Put this in it:

```python
import requests

API_URL = "https://mtg.wiki/api.php"

params = {
    "action": "query",
    "list": "categorymembers",
    "cmtitle": "Category:Magic set logos",
    "cmtype": "file",
    "cmlimit": "500",
    "format": "json",
}

response = requests.get(API_URL, params=params)

print("Status:", response.status_code)

data = response.json()

for file in data["query"]["categorymembers"]:
    print(file["title"])
```

Then run:

```text
python download_magic_logos.py
```

### What this first step does

It **doesn't download anything yet**.

It simply asks the wiki:

> Give me every file in the `Magic set logos` category.

MediaWiki allows up to 500 category members per request, and your category currently has 335, so **one request should be enough for the current list**. ([MediaWiki][2])

You should start seeing:

```text
Status: 200
File:20 Ways to Win.jpg
File:2021 Starter Kit logo.png
File:2X2logo.png
File:30th Anniversary Edition.jpg
File:5DN logo.jpg
...
```

**Run just that first.**

If it gives you the list successfully, tell me what you get, and then we'll add the next piece that takes each `File:` entry and gets its actual image URL. After that we'll make it download them into your Card Hideout `public/images/magic-sets` folder.

One step at a time so we don't end up with another giant script that's hard to debug.

[1]: https://mtg.fandom.com/wiki/Category%3AMagic_set_logos?utm_source=chatgpt.com "Category:Magic set logos - MTG Wiki"
[2]: https://www.mediawiki.org/wiki/API%3ACategorymembers?utm_source=chatgpt.com "API:Categorymembers - MediaWiki"

Perfect! 👍 That means the first part is working exactly as intended.

You've successfully got:

```text
mtg.wiki
   ↓
MediaWiki API
   ↓
all files in "Magic set logos"
   ↓
Python
   ↓
your console
```

Now let's make the **next small step**: instead of just getting the filenames, we'll ask MediaWiki for the **actual image URL** for each file.

Replace your current loop with this version:

```python id="m8q4vx"
for file in data["query"]["categorymembers"]:
    title = file["title"]

    image_params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }

    image_response = requests.get(API_URL, params=image_params)
    image_data = image_response.json()

    pages = image_data["query"]["pages"]

    for page in pages.values():
        image_url = page["imageinfo"][0]["url"]
        print(title)
        print(image_url)
        print()
```

Now run it again:

```text id="7c1m2n"
python download_magic_logos.py
```

You should start seeing something like:

```text id="t0r7yk"
File:2X2logo.png
https://mtg.wiki/images/...

File:30th_Anniversary_Edition.jpg
https://mtg.wiki/images/...

File:...
https://mtg.wiki/images/...
```

### Don't download anything yet

Let's just make sure **we're getting valid image URLs first**.

Once you confirm that you're seeing the actual URLs, we'll make the next tiny change that downloads the files into:

```text
public/images/magic-sets/
```

Then you'll have all those logos sitting right inside your Card Hideout project. 😎

Perfect. 😎 We have the hard part working.

Now let's make Python actually **download the files** into your Card Hideout project.

### 1. Create the folder

Inside your project, make:

```text id="k4s8np"
public/
└── images/
    └── magic-sets/
```

### 2. Change your Python script

Replace the current code with this:

```python id="d3m7qa"
import os
import requests

API_URL = "https://mtg.wiki/api.php"

OUTPUT_DIR = "public/images/magic-sets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

params = {
    "action": "query",
    "list": "categorymembers",
    "cmtitle": "Category:Magic set logos",
    "cmtype": "file",
    "cmlimit": "500",
    "format": "json",
}

response = requests.get(API_URL, params=params)
response.raise_for_status()

data = response.json()

for file in data["query"]["categorymembers"]:
    title = file["title"]

    image_params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }

    image_response = requests.get(API_URL, params=image_params)
    image_response.raise_for_status()

    image_data = image_response.json()
    pages = image_data["query"]["pages"]

    for page in pages.values():
        image_url = page["imageinfo"][0]["url"]

        filename = title.replace("File:", "")
        filepath = os.path.join(OUTPUT_DIR, filename)

        print(f"Downloading: {filename}")

        image = requests.get(image_url)
        image.raise_for_status()

        with open(filepath, "wb") as f:
            f.write(image.content)

print("DONE!")
```

### 3. Run it

From your project folder:

```text id="y6t1vb"
python download_magic_logos.py
```

You should see:

```text id="j3c8pm"
Downloading: 2X2logo.png
Downloading: 30th Anniversary Edition.jpg
Downloading: ...
...
DONE!
```

And when it's finished, check:

```text id="f8v2mx"
public/images/magic-sets/
```

You should have a whole bunch of image files there.

### One important thing

**Don't worry about connecting these to your database yet.**

Let's first make sure the download works and that the images actually open.

Once you've confirmed the images are sitting in `public/images/magic-sets/`, we'll do the next step: **automatically matching those filenames to your `magic_sets` records and putting the correct local path into `logoUrl`.**

That's where this is going to get really useful.
