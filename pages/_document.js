import { Html, Head, Main, NextScript } from 'next/document'
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '../data/site'
import { profile } from '../data/profile'
import { jsonLd } from '../lib/jsonld'

const SAME_AS = [profile.github, profile.scholar, profile.orcid, profile.twitter].filter(Boolean)

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content={`${profile.name}, Electrical Engineering, Data Center Power, Stochastic Modeling, Smart Grid, Power Systems, Machine Learning, ${profile.institution}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#070b14" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  "name": SITE_NAME,
                  "alternateName": SITE_SHORT_NAME,
                  "url": `${SITE_URL}/`,
                  "publisher": { "@id": `${SITE_URL}/#person` }
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  "name": SITE_NAME,
                  "url": `${SITE_URL}/`,
                  "mainEntityOfPage": `${SITE_URL}/about/`,
                  "email": `mailto:${profile.email}`,
                  "jobTitle": profile.title,
                  "description": profile.tagline,
                  "sameAs": SAME_AS,
                  "affiliation": {
                    "@type": "CollegeOrUniversity",
                    "name": profile.institution,
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Kolkata",
                      "addressCountry": "IN"
                    }
                  },
                  "knowsAbout": profile.researchInterests
                }
              ]
            })
          }}
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
