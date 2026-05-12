# idnex.de — Design System & Stylebook

**Projekt**: idnex.de — IT-Automatisierung & ERPNext-Beratung  
**Inhaberin**: Iryna Dohadailo · Feldstraße 24, 25335 Elmshorn  
**Dateipfade**: `/root/idnex_site/idnex/` · Live: `https://idnex.de/idnex/`

---

## 1. Farbpalette

| Token | Dark Mode | Light Mode | Verwendung |
|---|---|---|---|
| `--color-cyan` | `#1ABCAC` | `#0A8880` | Primärer Akzent, Links, Icons, Akzentwörter |
| `--color-teal` | `#0D9E90` | `#087A6E` | Hover, sekundärer Akzent |
| `--color-dark` | `#0A0E1A` | `#F0F7F6` | Seitenhintergrund |
| `--color-light` | `#F0F4F8` | `#0A1A18` | Haupttext |

Sektionswechsel: `#0A0E1A` ↔ `#0E1828` (dunkle Abwechslung)

**Verboten**: Andere Akzentfarben, Weiß als Hintergrund im Dark Mode, border-radius außer 0.

---

## 2. Typografie

| Schriftart | Gewichte | Einsatz |
|---|---|---|
| **Orbitron** | 400, 600, 700, 900 | Überschriften, Buttons, Navigation, Eyebrow-Labels, UI-Elemente |
| **Exo 2** | 300, 400, 500, 700, 800 | Absätze, Fließtext, lange Texte, juristische Blöcke |

```css
--font-body: 'Orbitron', sans-serif;   /* Überschriften & UI */
--font-text: 'Exo 2', sans-serif;      /* Fließtext */
```

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,700;0,800;1,300&display=swap
```

---

## 3. Buttons

**Kein `border-radius`** — alle Buttons haben 0px Radius oder den Clip-Path.

### Primär (Solid)
```css
clip-path: polygon(4% 0%, 96% 0%, 100% 5%, 100% 95%, 96% 100%, 4% 100%, 0% 95%, 0% 5%);
background: linear-gradient(135deg, var(--color-cyan), var(--color-teal));
color: var(--color-dark);
font-family: var(--font-body);
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.08em;
```

### Ghost (Sekundär)
```css
clip-path: polygon(4% 0%, 96% 0%, 100% 5%, 100% 95%, 96% 100%, 4% 100%, 0% 95%, 0% 5%);
background: rgba(13,158,144,0.06);
border: 1px solid rgba(13,158,144,0.55);
color: var(--color-light);
```

---

## 4. Abstandssystem (8px-Raster)

`8 · 16 · 24 · 32 · 48 · 64 · 96px`

Keine anderen Werte außer diesen, es sei denn, es ist ein visuell notwendiges Fine-Tuning.

---

## 5. Sektionsstruktur

Jede Inhaltssektion folgt diesem Schema:

```html
<section class="[name]-section section" id="[name]-section">
  <div class="container">
    <p class="section-eyebrow">KATEGORIE</p>   <!-- Orbitron, 12px, cyan, uppercase -->
    <h2 class="section__title">Titel</h2>       <!-- Exo 2, 700, linksbündig -->
    <p class="[name]-section__lead">Lead...</p> <!-- Exo 2, 400, max 560px -->
    <!-- Inhalt -->
  </div>
</section>
```

**Padding**: `16px 0` (mobil) · `48px 0` (ab 768px)

---

## 6. Karten — Service Cards (`.format-card--service`)

```css
background: rgba(26,188,172,0.04);
border: 1px solid rgba(26,188,172,0.22);
border-top: 2px solid rgba(26,188,172,0.45);
border-radius: 0;

/* Hover */
background: rgba(26,188,172,0.08);
border-color: rgba(26,188,172,0.45);
border-top-color: #1ABCAC;
```

Das Kontakt-Info-Panel (`.contact-section__info`) verwendet dasselbe Styling.

---

## 7. Logo-Filter (Teal-Einfärbung)

Das Logo (`logo.png`, `logo_futer.png`) wird per CSS-Filter auf Teal getönt:

```css
/* Dark Mode */
filter: grayscale(1) sepia(1) saturate(3) hue-rotate(125deg) brightness(1.05);

/* Light Mode */
filter: grayscale(1) sepia(1) saturate(4) hue-rotate(125deg) brightness(0.65);
```

---

## 8. Foto-Rahmen (Team)

Foto von Iryna Dohadailo: Clip-Path im Site-Stil statt border-radius.

```css
.chef-card__photo {
  clip-path: polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%);
  filter: drop-shadow(0 0 8px rgba(26,188,172,0.28));
  border-radius: 0;
  object-fit: cover;
  object-position: center top;
}
```

---

## 9. Clip-Path — Abgeschnittene Ecken

Für Buttons, Foto-Rahmen und Stat-Items:

```css
/* Buttons (4% Ecken) */
clip-path: polygon(4% 0%, 96% 0%, 100% 5%, 100% 95%, 96% 100%, 4% 100%, 0% 95%, 0% 5%);

/* Foto / größere Elemente (6% Ecken) */
clip-path: polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%);
```

---

## 10. Dark/Light Theme

Toggle-Button: `#theme-toggle` im Header.  
Gespeichert in `localStorage` unter dem Key `idnex-theme`.

```js
// FOUC-Prevention (inline im <head>)
(function(){var t=localStorage.getItem('idnex-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}());
```

Light Mode wird aktiviert durch: `<html data-theme="light">`  
Light Mode CSS-Override-Block beginnt ca. bei Zeile 3176 in `main.css`.

---

## 11. Dateistruktur

```
/root/idnex_site/idnex/
├── index.html              ← einzige HTML-Seite
├── css/main.css            ← alle Stile (~3950 Zeilen); neue Regeln ans Ende
├── js/
│   ├── formats-slider.js   ← Swiper (Leistungen-Karussell)
│   ├── modal.js            ← Modals mit Schließanimation
│   ├── sidebar.js          ← Schnellmenü + kombiniertes Panel
│   └── mobile-menu.js      ← Hamburger (inaktiv, Sidebar ersetzt es)
└── images/
    ├── logo.png            ← Header-Logo
    ├── logo_futer.png      ← Footer-Logo mit Slogan
    ├── heronew.png         ← Hero-Hintergrund (Dark)
    ├── hero_light.png      ← Hero-Hintergrund (Light)
    ├── my_photo.jpg        ← Foto Iryna Dohadailo (Team-Sektion)
    └── icons.svg           ← SVG-Sprite: arrow, facebook, instagram, linkedin,
                               home, menu, close, languages, cookie, envelope,
                               phone, sun, moon
```

---

## 12. Seitenstruktur (index.html)

| Reihenfolge | ID / Klasse | Inhalt |
|---|---|---|
| 1 | `header` | Navigation: Über uns / Leistungen / Team / Kontakt + Sprache + Theme |
| 2 | `#hero-section` | Hero: Slogan + CTA |
| 3 | `#traditions-section` | Über uns + Kennzahlen |
| 4 | `#formats-section` | Leistungen (Swiper-Karussell) |
| 5 | `#chefs-section` | Team: Iryna Dohadailo |
| 6 | `#contact-section` | Kontaktformular → FormSubmit → info@idnex.de |
| 7 | `footer` | Navigation, Adresse, Social, Impressum, Datenschutz |
| — | Sidebar | Quick-Menü + kombiniertes Panel |
| — | Modals | Cookie, Impressum, Datenschutz, Beratungsformular |

---

## 13. Formulare

Kontaktformular: `https://formsubmit.co/info@idnex.de`  
Antworten gehen an: `info@idnex.de`

```html
<input type="hidden" name="_subject" value="Neue Anfrage — idnex.de">
<input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_next" value="https://idnex.de/idnex/#contact-section">
```

---

## 14. CSS-Workflow

1. Neue Regeln **immer ans Ende** von `main.css` anhängen (Override-Prinzip)
2. Block-Header verwenden: `/* ======= FIXES vXX ======= */`
3. Braces-Balance prüfen: `opens == closes` (Python-Check)
4. Version in `index.html` hochzählen: `?v=20260512X` nach jeder Änderung
5. Kein `border-radius`, keine anderen Schriften, keine nicht-tealfarbenen Akzente

---

## 15. SEO-Checkliste

- `<html lang="de">` — nicht ändern
- `<title>`: 50–60 Zeichen, Primary Keyword enthalten
- `<meta name="description">`: 150–160 Zeichen, CTA enthalten
- H1: einmal pro Seite, Primary Keyword
- Alt-Texte: alle `<img>` beschriftet
- Schema.org: LocalBusiness + Person (in `<head>` vorhanden)
- OG-Tags: `og:title`, `og:description`, `og:image` (vorhanden)
- Canonical: `https://idnex.de/idnex/`

---

## 16. Kontaktdaten (Trust-Signale)

```
Iryna Dohadailo
info@idnex.de
+49 175 253 8771
Feldstraße 24, 25335 Elmshorn
USt-IdNr: DE461318962
LinkedIn: linkedin.com/in/iryna-dohadailo
```

---

*Zuletzt aktualisiert: 2026-05-12 (FIXES v14)*
