# How to Edit the USF Website

This guide is for the person who looks after the United Standards Federation
website but is **not a developer**. You can change every word that appears on
the website — headlines, paragraphs, leadership bios, contact details — by
editing one single file:

> `src/content/site.json`

You do **not** need to install anything. You can do it all from your web
browser on GitHub. Whenever you save a change, the website automatically
rebuilds and goes live within about 30–60 seconds.

---

## Quick orientation

| What you want to change                   | Where to look in `site.json` |
| ----------------------------------------- | ---------------------------- |
| Site name, meta description, copyright    | `site`                       |
| Email, phone, address, office hours       | `contact`                    |
| Top menu items, "Become a Member" label   | `nav`                        |
| Hero headline, description, buttons       | `hero`                       |
| Statistics under the hero (25+, 100+ …)   | `stats`                      |
| Four ecosystem cards (Industry, Edu, …)   | `ecosystem`                  |
| About USF — paragraphs, pull quote, facts | `about`                      |
| Mission & Vision statements               | `missionVision`              |
| Eight service descriptions                | `services`                   |
| Global Resourcing service page (full)     | `globalResourcing`           |
| Why-Join benefits (6 cards)               | `whyJoin`                    |
| Industries we support (12 sectors)        | `industries`                 |
| Global Consortium copy and CTAs           | `consortium`                 |
| International Development pillars         | `internationalDevelopment`   |
| Country list under Global Presence        | `globalPresence`             |
| Leadership names, roles, bios             | `leadership`                 |
| Membership tiers and benefits             | `membership`                 |
| Final "Join the Federation" section       | `finalCta`                   |
| Footer columns, newsletter, legal links   | `footer`                     |

---

## How to make an edit (the easy way — using GitHub in your browser)

### Step 1 — Open the file

1. Go to your repository on GitHub (`https://github.com/higleemy-gif/usf`).
2. Click into the folder `src/`, then `content/`.
3. Click on `site.json`.

You'll see a long structured document. Don't worry — you don't need to
understand all of it. You only need to find the line you want to change.

### Step 2 — Edit the file

1. Click the **pencil icon** (top right of the file view) labelled "Edit
   this file."
2. The file becomes a big text editor in your browser.
3. Use **Ctrl + F** (Windows) or **Cmd + F** (Mac) to search for the text you
   want to change. For example, search for "Building Global Synergy" to find
   the hero headline.
4. Change the text **only between the quotation marks**.

### Step 3 — Save your change

1. Scroll down to the section called "Commit changes."
2. Write a short note describing what you changed, e.g. _"Updated phone
   number"_ or _"New CEO bio"_.
3. Click the green button **Commit changes**.

That's it. Within about a minute the live website will show your update.

---

## The four rules of editing this file

JSON is strict about its own punctuation. Follow these four rules and you'll
never break anything.

### Rule 1 — Only edit text inside the quotation marks

```json
"headline": "Building Global Synergy Through Standards"
```

Change the words between the two `"` quotation marks. **Do not** change the
word on the left (`"headline"`), and **do not** delete the quotation marks.

✅ Good:

```json
"headline": "Connecting Standards Across Borders"
```

❌ Bad — broke a quotation mark:

```json
"headline": "Connecting Standards Across Borders
```

### Rule 2 — Keep the commas at the end of every line except the last

In a group of items, every line ends with a comma `,` **except** the last
line of the group.

```json
{
  "title": "Industry Partners",
  "description": "Multinationals and mid-market leaders.",
  "items": ["Pharmaceuticals", "Biotechnology"]
}
```

If you delete the comma after `"Industry Partners"`, the site breaks.

### Rule 3 — Use straight quotes, not curly quotes

`"` is correct. `"` and `"` (curly / typographic quotes) are wrong and will
break the file.

If you copy text from Word, Google Docs, or Pages, the quotes may auto-curl.
**Type your text directly in the GitHub editor**, or paste into a plain
text editor first.

### Rule 4 — Quotation marks inside text need a backslash

If you need a quotation mark **inside** a sentence, type `\"` instead of
just `"`.

```json
"quote": "We call this the \"Federation Charter\" — and it endures."
```

That's the only special character you'll encounter. Apostrophes (`'`) and
dashes (`–`, `—`) are fine to type normally.

---

## Common edits — walked through step by step

### Changing the hero headline

Search for: `"headlineStart"`

You'll find three lines:

```json
"headlineStart": "Building Global Synergy Through ",
"headlineHighlight": "Standards",
"headlineEnd": " & Collaboration",
```

These three pieces fit together to form the headline. The word in
`headlineHighlight` gets the red underline accent. To change "Standards" to
"Excellence", just edit:

```json
"headlineHighlight": "Excellence",
```

### Changing the phone or email

Search for: `"contact"`. You'll find:

```json
"contact": {
  "email": "secretariat@usfederation.org",
  "phone": "+1 (202) 555-USF1",
  "address": "16192 Coastal Highway, Lewes DE 19958, USA",
  "hours": "Mon–Fri · 09:00–18:00 ET"
}
```

Change any value between its `"…"` quotes. Phone and email update **everywhere**
on the site (top bar, footer, "Contact Us" section).

### Changing a leadership bio

Search for: `"leaders"`. You'll find a list — each leader is one block:

```json
{
  "id": "varsha",
  "name": "Varsha Harle",
  "role": "Founder",
  "initials": "VH",
  "bio": "Founder of the United Standards Federation, leading the …",
  "region": "United States",
  "linkedin": "#"
}
```

Edit the `name`, `role`, `bio`, or `linkedin` URL. The `id` and `initials`
are used internally — change `initials` if the name changes (e.g. JD for
John Doe). Don't touch `id` — keep it short and lowercase.

### Updating a statistic

Search for: `"stats"`. You'll find:

```json
{ "value": 25, "suffix": "+", "label": "Countries Connected", "sub": "Multi-region federation reach" }
```

- `value` is the **big number** (no quotes — it's a number).
- `suffix` is what appears after it (`+`, ` Programs`, etc.).
- `label` is the headline under it.
- `sub` is the small grey caption.

To change 25 to 30 countries, edit:

```json
{ "value": 30, "suffix": "+", "label": "Countries Connected", "sub": "Multi-region federation reach" }
```

### Adding a new bullet point

Some lists let you add items. Example — the "Why Join" benefits:

```json
"items": [
  { "id": "recognition", "title": "Global Recognition", "body": "…" },
  { "id": "visibility",  "title": "International Visibility", "body": "…" }
]
```

To add a seventh benefit, copy the last block, paste it after, **add a
comma after the previous block**, and edit the new one:

```json
"items": [
  { "id": "recognition", "title": "Global Recognition", "body": "…" },
  { "id": "visibility",  "title": "International Visibility", "body": "…" },
  { "id": "innovation",  "title": "Innovation Access",       "body": "Access to USF research forums and pilots." }
]
```

Pick a new `id` (a short lowercase word, unique within the section).

Note: new items will fall back to a default icon. If you want a specific
icon for a new item, ask the developer to add it — but the text will
appear correctly even without the icon work.

---

## What happens after you save

1. Your change is committed to GitHub.
2. Cloudflare Pages sees the new commit and rebuilds the website (about
   30–60 seconds).
3. The live website at your USF domain updates automatically.
4. If anything goes wrong (e.g. you broke the JSON), the build **fails** and
   the **old version stays live** — your visitors never see a broken site.

You can see whether the build succeeded:

- **GitHub:** the green ✅ or red ❌ tick next to your commit on the commits page.
- **Cloudflare Pages:** the deployments list shows build status and a preview link for every commit.

---

## If something breaks

**You broke the JSON.** Don't panic — the live site is still showing the old
version. Cloudflare will not deploy a broken build.

The most common mistakes:

| Symptom in the build log                | What it usually means                                          |
| --------------------------------------- | -------------------------------------------------------------- |
| `Unexpected token` / `Expected ','`     | A missing or extra comma somewhere.                            |
| `Unexpected end of JSON input`          | A missing closing `}` or `]`.                                  |
| `Bad control character in string`       | You pasted a curly quote `"`. Replace it with a straight `"`. |
| The build succeeds but text looks wrong | You edited the wrong field. See the orientation table above.   |

To fix:

1. Go back to GitHub and open `src/content/site.json`.
2. Click the pencil icon.
3. Look for any red squiggly underlines or error markers GitHub shows.
4. Compare your edit with the surrounding lines — make sure the punctuation
   matches.
5. Commit again.

If you're stuck, you can also **revert** to a previous working version:

1. Open `src/content/site.json` on GitHub.
2. Click "History" (top right of the file).
3. Find the last working commit.
4. Click "…" → "Revert" — or copy that version's contents back.

---

## Want to preview before publishing?

Every time you commit, Cloudflare Pages also creates a **preview URL** for
that specific commit (visible in the Cloudflare dashboard). You can share
that link with someone for review before merging — or simply review it
yourself before announcing the change.

If you want a more formal "draft → review → publish" workflow, ask the
developer to set up a `draft` branch. Then your edits go to `draft` first
(with a preview URL), and you merge to `main` only when you're happy.

---

## Things you cannot change from this file

These require a developer:

- Colours, fonts, layouts, spacing
- Animations, the rotating globe
- Adding entirely new sections
- Changing icons (the small symbols next to each card)
- Adding new pages

Everything visible as **text** on the homepage, however, you can edit yourself.
