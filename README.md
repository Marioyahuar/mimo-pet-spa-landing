# Mimo Pet Spa & Wellness — Landing Page

React + Vite + Tailwind CSS implementation of the Stitch "Mimo Pet Spa" landing screen.

## Stack

- **React 18** + **Vite** for the build.
- **Tailwind CSS 3** with all design tokens declared in `tailwind.config.js`
  (colors, spacing scale `space-*`, typography `display/headline/title/body/label`,
  radii). Class names match the original Stitch export 1:1.
- Fonts: Playfair Display + Plus Jakarta Sans, plus Material Symbols for icons
  (loaded in `index.html`).

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
tailwind.config.js        Design tokens (single source of truth)
src/
  App.jsx                  Page composition
  data/content.js          All copy + image URLs
  components/
    ui/                    Primitives: Button, Icon, Pill, Container, SectionHeading
    Header.jsx
    Hero.jsx
    SensoryStrip.jsx
    Services.jsx
    AddOns.jsx
    WhyUs.jsx
    Testimonials.jsx
    CtaBanner.jsx
    Faq.jsx
    Footer.jsx
```

Each landing section is its own component and reads its content from
`src/data/content.js`, so copy changes never touch layout code.
