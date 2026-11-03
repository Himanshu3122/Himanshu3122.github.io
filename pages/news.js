import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Newspaper, Calendar, BookOpen, Code2, ArrowRight } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { SITE_URL, SITE_NAME } from '../data/site'
import { jsonLd } from '../lib/jsonld'

// Edit your future news items here!
// Each item only requires id, date, and title.
export const newsData = [
  {
    id: 9,
    date: 'October 2026',
    title: 'Preprint released: Risk-Calibrated Communication and Adaptive Safe Recovery in Hierarchical Multi-Agent Reinforcement Learning under Compound Communication Failures',
  },
  {
    id: 8,
    date: 'October 2026',
    title: 'Paper accepted: A Non-Homogeneous Poisson Process Framework for Dynamic Load Modeling of LLM Inference in GPU Clusters — ICEPE 2026',
  },
  {
    id: 7,
    date: 'June 2026',
    title: 'Started IoT internship at NIELIT Lucknow',
  },
  {
    id: 6,
    date: 'May 2026',
    title: 'Started research internship at Jadavpur University on Green Data Center power analysis, advised by Dr. Bhimsen Tudu',
  },
  {
    id: 5,
    date: 'March 2026',
    title: 'Qualified GATE EE 2026 in the third year of undergraduate study',
  },
  {
    id: 4,
    date: 'August 12, 2025',
    title: 'Finalist at IEEE TechSangam national-level hackathon — IEEE Computer Society & IEEE EMBS Pune Chapter',
  },
  {
    id: 3,
    date: 'August 2025',
    title: 'Selected as a delegate (top 2%) for the HPAIR Asia Conference 2025 — Harvard University',
  },
  {
    id: 2,
    date: 'August 2025',
    title: 'Completed project: Design & Optimization of a V2G-Enabled Smart City Infrastructure on the IEEE 33-Bus System',
  },
  {
    id: 1,
    date: 'April 2025',
    title: 'Won the Posternova Technical Poster Presentation Competition — IEI-IEM Students\' Chapter',
  },
]

export default function News() {
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  const NEWS_JSONLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Academic News & Research Milestones | ${SITE_NAME}`,
    url: `${SITE_URL}/news/`,
    description: `Chronological timeline of paper acceptances, internships, awards, and research milestones by ${SITE_NAME}.`,
    numberOfItems: sortedNews.length,
    itemListElement: sortedNews.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: item.title,
        datePublished: item.date,
        author: {
          '@type': 'Person',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      },
    })),
  }

  return (
    <>
      <Meta
        title="News & Updates"
        description={`Latest research news, paper acceptances, internships, and academic milestones by ${SITE_NAME}.`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(NEWS_JSONLD) }}
        />
      </Head>

      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <SectionReveal>
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gold-400">Updates</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  Latest <span className="gold-text italic">News</span>
                </h1>
                <p className="font-body text-parchment-300 max-w-2xl mb-8">
                  Chronological updates on my research and other activities.
                </p>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            {/* NEWS LIST */}
            <SectionReveal>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-8">
                  <Newspaper size={16} className="text-gold-400" aria-hidden="true" />
                  <h2 className="font-display text-2xl text-parchment-100">News Feed</h2>
                </div>

                <div className="relative border-l border-gold-500/20 ml-3 sm:ml-4 space-y-10 pb-4">
                  {sortedNews.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="relative pl-6 sm:pl-8"
                    >
                      {/* Timeline dot */}
                      <span
                        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-500 ring-4 ring-noir-900"
                        aria-hidden="true"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 mb-1">
                        <div className="flex items-center gap-1.5 text-gold-400 font-mono text-xs whitespace-nowrap mt-1">
                          <Calendar size={12} />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-display text-lg text-parchment-100 leading-snug flex-1">
                          {(() => {
                            const dashIndex = item.title.indexOf(' — ') !== -1 
                              ? item.title.indexOf(' — ') 
                              : item.title.indexOf('—');
                            
                            if (dashIndex !== -1) {
                              const mainText = item.title.substring(0, dashIndex);
                              const isSpaced = item.title.substring(dashIndex, dashIndex + 3) === ' — ';
                              const venueText = item.title.substring(dashIndex + (isSpaced ? 3 : 1));
                              
                              return (
                                <>
                                  {mainText}{' '}
                                  <span className="text-gold-400 font-mono text-sm sm:text-base">
                                    — {venueText.trim()}
                                  </span>
                                </>
                              );
                            }
                            return item.title;
                          })()}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {sortedNews.length === 0 && (
                  <div className="text-center py-20 text-parchment-400 font-mono text-sm" role="status">
                    No news items yet.
                  </div>
                )}
              </div>
            </SectionReveal>

            {/* Cross-linking to Research Archive & Projects */}
            <SectionReveal delay={0.2}>
              <div className="mt-12 grid sm:grid-cols-2 gap-4">
                <Link
                  href="/research/"
                  className="glass-card p-6 border border-gold-500/15 hover:border-gold-500/40 transition-all group flex items-start gap-4"
                >
                  <div className="w-10 h-10 border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <BookOpen size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-parchment-100 group-hover:text-gold-300 transition-colors">
                      Publications
                    </h3>
                    <p className="font-body text-xs text-parchment-400 mt-1 leading-relaxed">
                      Papers and manuscripts behind these updates.
                    </p>
                    <span className="font-mono text-xs text-gold-400/80 mt-3 inline-flex items-center gap-1 group-hover:underline">
                      Explore Publications <ArrowRight size={11} aria-hidden="true" />
                    </span>
                  </div>
                </Link>

                <Link
                  href="/projects/"
                  className="glass-card p-6 border border-gold-500/15 hover:border-gold-500/40 transition-all group flex items-start gap-4"
                >
                  <div className="w-10 h-10 border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Code2 size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-parchment-100 group-hover:text-gold-300 transition-colors">
                      Research Projects
                    </h3>
                    <p className="font-body text-xs text-parchment-400 mt-1 leading-relaxed">
                      Explore the simulation and modeling projects connected to this work.
                    </p>
                    <span className="font-mono text-xs text-gold-400/80 mt-3 inline-flex items-center gap-1 group-hover:underline">
                      View Projects <ArrowRight size={11} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            </SectionReveal>

          </div>
        </div>
      </PageTransition>
    </>
  )
}
