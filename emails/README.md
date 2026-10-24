# Emails

Mailing-list emails for Riviera Maya Tech Builders, styled like rivieramaya.tech.

## Make a new one

1. Copy `_template.html` to `emails/YYYY-MM-DD-chapter-event.html` (e.g. `2026-11-19-playa-built-in-paradise.html`).
2. Replace every `{{PLACEHOLDER}}` (search for `{{`). Delete any block you don't need.
3. Paste the HTML into your mailing tool and send yourself a test (Gmail on a phone + one desktop client).

Each email is also viewable at `https://rivieramaya.tech/emails/<file>.html` (marked `noindex`, so search engines skip it).

## Visual identity

| Token | Value | Use |
|---|---|---|
| Ink | `#0f172a` | Headings, strong text, MEETUP badge background |
| Body | `#334155` | Paragraphs |
| Secondary | `#475569` | Footer, small print |
| Teal (button) | `#0b7f76` | Main button background, white text (passes contrast) |
| Teal (links) | `#0a7d74` | Links, small kickers ("GOOD TO KNOW") |
| Sea | `#12c2b3` | Brand dot only (too light for text) |
| Sand | `#fff6e5` | Meetup card background |
| Sand border | `#f6dcae` | Meetup card border |
| Sand text | `#5b4a2a` | Text on sand; `#7c5e2a` for labels (WHERE, PRICE) |
| Page background | `#f1f7f6` | Behind the email |
| Soft panel | `#f8fafc` | "Good to know" box, footer |

- **Font:** Inter (700–800 for headings), falling back to Helvetica/Arial where clients block web fonts.
- **Shapes:** 20px outer card, 16px meetup card, pill buttons and badges.
- **No photos:** emails are text-only (faster, no blocked-image gaps, better deliverability).
- **Pattern:** dark `NEXT MEETUP` badge → event title → intro → sand meetup card (date box, WHERE, PRICE, teal RSVP button) → "Good to know" → sign-off. English first, Spanish below with an "En español ↓" link at the top.
- No emoji in labels; keep it as clean as the site.
