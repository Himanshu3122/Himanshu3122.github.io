# Himanshu Singh — Academic Portfolio

Personal academic website of Himanshu Singh, B.Tech. Electrical Engineering student at the Institute of Engineering & Management, Kolkata. Research focus: power modeling of cloud and AI data centers, stochastic simulation, and smart-grid optimization.

**Live:** [himanshu3122.github.io](https://himanshu3122.github.io/)

Built with Next.js (static export), Tailwind CSS, Framer Motion, and D3.

---

## Quick start

Requires **Node.js 20+**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to out/
```

## Deploying to GitHub Pages

1. Create a GitHub repository named **`Himanshu3122.github.io`** and push this project to its `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.

If you use a different repo name (e.g. `portfolio`), the site is served at `https://himanshu3122.github.io/portfolio/`. In that case set `basePath: '/portfolio'` in `next.config.js` and update `SITE_URL` in `data/site.js` and `scripts/generate_sitemap.js`.

---

## Editing content

All content lives in `data/`; the pages read from it.

| File | What it holds |
|------|---------------|
| `data/profile.js` | Name, bio, email, links, research interests, skills, education, experience, achievements |
| `data/site.js` | Site URL and name (used for SEO tags) |
| `data/publications.js` | Accepted/published papers with BibTeX. Add `abstract`, `doi`, `pdf` when available |
| `data/underReview.js` | Manuscripts under review (same shape, `status: "under_review"`) |
| `data/projects.js` | Research projects |
| `data/blog.js` | Research notes |
| `data/researchThemes.js` | Knowledge-graph nodes and edges on the home page |
| `pages/news.js` | News timeline (`newsData` at the top of the file) |

**Hiding/showing links:** in `data/profile.js`, set `linkedin`, `scholar`, or `orcid` to a URL to show it across the site, or `null` to hide it.

### Profile photo

The site intentionally shows no photo; the navbar uses an "H" monogram instead.

### CV

`public/Himanshu_Singh_CV.pdf` is linked from the navbar and home page. Replace the file to update it.

### Graphical abstracts (optional)

Put source PNGs in `assets/graphical-abstracts/`, run `npm run images`, then set `graphicalAbstract: "<slug>"` on a publication or note.

---

## Structure

```
data/         content (see table above)
components/   Navbar, Footer, PublicationCard, ProjectCard, ResearchGraph, ...
pages/        index, about, research, projects, blog, news, contact, 404
public/       CV, favicons, og-image, robots.txt, sitemap.xml
scripts/      generate_sitemap.js (runs on build), optimize_images.js
styles/       globals.css (theme)
```

## License

MIT. Originally adapted from an open academic portfolio template.
