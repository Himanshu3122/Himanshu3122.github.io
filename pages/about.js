import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Award, BookOpen, Microscope, GraduationCap, Github, Linkedin, Mail, Link2, Code2, ExternalLink } from 'lucide-react'
import Meta from '../components/Meta'
import PageTransition from '../components/PageTransition'
import SectionReveal from '../components/SectionReveal'
import { profile } from '../data/profile'
import { publications } from '../data/publications'
import { underReviewPublications } from '../data/underReview'
import { projects } from '../data/projects'
import { SITE_URL } from '../data/site'
import { jsonLd } from '../lib/jsonld'

/*
  Only the counts are needed here. Computing them at build time keeps the full
  publication records (abstracts, BibTeX) out of this page's JavaScript.
*/
export async function getStaticProps() {
  return {
    props: {
      totalPapers: publications.length + underReviewPublications.length,
      totalProjects: projects.length,
    },
  }
}

export default function About({ totalPapers, totalProjects }) {
  const socialLinks = [
    { icon: <Github   size={16} />, href: profile.github,            label: 'GitHub' },
    { icon: <Linkedin size={16} />, href: profile.linkedin,          label: 'LinkedIn' },
    { icon: <Mail     size={16} />, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: <Link2    size={16} />, href: profile.orcid,             label: 'ORCID Profile' },
  ].filter(s => s.href)

  const ABOUT_JSONLD = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `About ${profile.name}`,
    url: `${SITE_URL}/about/`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: profile.name,
      url: `${SITE_URL}/`,
      jobTitle: profile.title,
      description: profile.tagline,
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: profile.institution,
      },
      knowsAbout: profile.researchInterests,
      award: profile.awards.map(a => `${a.title} (${a.issuer}, ${a.year})`),
      sameAs: [profile.github, profile.scholar, profile.orcid].filter(Boolean),
    },
  }

  return (
    <>
      <Meta
        title="About"
        description={`About ${profile.name} — Electrical Engineering undergraduate at ${profile.institutionShort} researching data-center power modeling and smart grids.`}
        type="profile"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(ABOUT_JSONLD) }}
        />
      </Head>


      <PageTransition>
        <div className="min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <SectionReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gold-400">About</span>
                </div>
                <h1
                  className="font-display font-light text-parchment-100 mb-6"
                  style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)' }}
                >
                  The <span className="gold-text italic">Researcher</span>
                </h1>
                <div className="section-divider" />
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">

              {/* Sidebar */}
              <div className="md:col-span-1">
                <SectionReveal>
                  <div className="space-y-3 mb-8">
                    {[
                      { icon: <MapPin        size={14} />, text: profile.location },
                      { icon: <GraduationCap size={14} />, text: profile.institution },
                      ...(profile.scholar ? [{ icon: <BookOpen size={14} />, text: 'Google Scholar', href: profile.scholar }] : []),
                      ...(profile.orcid ? [{ icon: <Link2 size={14} />, text: 'ORCID', href: profile.orcid }] : []),
                      { icon: <Github        size={14} />, text: `github.com/${profile.githubHandle}`, href: profile.github },
                      { icon: <Microscope    size={14} />, text: `${totalPapers} Publications` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-parchment-300">
                        <div className="text-gold-400 flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs hover-underline text-gold-400 break-words"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="font-mono text-xs break-words">{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Social links — 44px min touch targets */}
                  <div className="flex gap-3 mb-8 flex-wrap">
                    {socialLinks.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target={s.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="text-parchment-400 hover:text-gold-400 transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <span aria-hidden="true">{s.icon}</span>
                      </a>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gold-400 mb-4">Research Areas</h3>
                    <div className="space-y-2">
                      {profile.researchInterests.map(interest => (
                        <div key={interest} className="flex items-start gap-2 text-parchment-300">
                          <div className="w-1 h-1 rounded-full bg-gold-400 mt-2 flex-shrink-0" aria-hidden="true" />
                          <span className="font-body text-sm leading-relaxed">{interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Main content */}
              <div className="md:col-span-2 space-y-12">

                <SectionReveal delay={0.1}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-4">Biography</h2>
                    <p className="font-body text-parchment-300 text-base leading-relaxed">
                      {profile.bio}
                    </p>
                    <p className="font-body text-parchment-300 text-base leading-relaxed mt-4">
                      I have authored or co-authored{' '}
                      <span className="text-gold-400 font-semibold">{totalPapers}</span>{' '}
                      papers and manuscripts, including one accepted at ICEPE 2026, spanning the power behavior
                      of data centers and GPU clusters, stochastic models of multi-agent LLM workflows, and
                      safe multi-agent reinforcement learning for EV charging and communication-constrained
                      control. I qualified GATE EE 2026 in my third year and hold a CGPA of 9.2/10.
                    </p>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Education</h2>
                    {profile.education.map(edu => (
                      <motion.div
                        key={`${edu.degree}-${edu.institution}`}
                        whileHover={{ x: 4 }}
                        className="glass-card pub-card-accent p-5 sm:p-6 pl-7 mb-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl text-parchment-100">{edu.degree}</h3>
                            <p className="font-mono text-xs text-gold-400 mt-1">{edu.institution}</p>
                            <p className="font-mono text-xs text-parchment-400">{edu.location}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Calendar size={12} className="text-parchment-400" aria-hidden="true" />
                            <span className="font-mono text-xs text-parchment-400">{edu.period}</span>
                            {edu.current && (
                              <span className="font-mono text-xs bg-green-900/30 text-green-400 border border-green-700/30 px-2 py-0.5 rounded-lg">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className="space-y-1.5 mb-4">
                          {edu.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-parchment-300">
                              <div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
                              <span className="font-body text-sm">{d}</span>
                            </li>
                          ))}
                        </ul>
                        {edu.thesisInterest && (
                          <div className="p-3 bg-gold-500/5 border border-gold-500/10 rounded-lg">
                            <p className="text-xs font-semibold text-gold-400 mb-1">Thesis Interest</p>
                            <p className="font-body text-sm text-parchment-200">{edu.thesisInterest}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Research & Professional Experience</h2>
                    {profile.experience.map(exp => (
                      <motion.div
                        key={`${exp.role}-${exp.institution}`}
                        whileHover={{ x: 4 }}
                        className="glass-card pub-card-accent p-5 sm:p-6 pl-7 mb-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl text-parchment-100">{exp.role}</h3>
                            <p className="font-mono text-xs text-gold-400 mt-1">{exp.institution}</p>
                            {exp.location && <p className="font-mono text-xs text-parchment-400">{exp.location}</p>}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Calendar size={12} className="text-parchment-400" aria-hidden="true" />
                            <span className="font-mono text-xs text-parchment-400">{exp.period}</span>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-parchment-300">
                              <div className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
                              <span className="font-body text-sm leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-gold-400 hover:underline"
                          >
                            <ExternalLink size={11} aria-hidden="true" /> {exp.linkLabel || 'Link'}
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.22}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Technical Skills</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {profile.skills.map((item, i) => (
                        <div key={i} className="glass-card p-5 border border-gold-500/10">
                          <h4 className="text-sm font-semibold text-gold-400 mb-2">{item.title}</h4>
                          <p className="font-body text-sm text-parchment-300 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.25}>
                  <div>
                    <h2 className="font-display text-2xl text-parchment-100 mb-6">Achievements &amp; Recognitions</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {profile.awards.map((award, i) => (
                        <motion.div
                          key={award.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ y: -2 }}
                          className="glass-card p-5"
                        >
                          <div className="flex items-start gap-3">
                            <Award size={16} className="text-gold-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div className="min-w-0">
                              <h4 className="font-display text-base text-parchment-100 leading-snug mb-1">{award.title}</h4>
                              <p className="font-mono text-xs text-gold-400/80">{award.issuer}</p>
                              <p className="font-body text-xs text-parchment-400 mt-2 leading-relaxed">{award.description}</p>
                              <p className="font-mono text-[10px] text-parchment-400/50 mt-2">{award.year}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                {/* Cross-navigation to Research, Projects, and Contact */}
                <SectionReveal delay={0.3}>
                  <div className="pt-8 border-t border-gold-500/10 grid sm:grid-cols-3 gap-4">
                    <Link
                      href="/research/"
                      className="glass-card p-5 border border-gold-500/15 hover:border-gold-500/40 transition-all group"
                    >
                      <BookOpen size={18} className="text-gold-400 mb-2" aria-hidden="true" />
                      <h4 className="font-display text-base text-parchment-100 group-hover:text-gold-300 transition-colors">
                        Publications
                      </h4>
                      <p className="font-body text-xs text-parchment-400 mt-1">
                        {totalPapers} papers and manuscripts.
                      </p>
                    </Link>

                    <Link
                      href="/projects/"
                      className="glass-card p-5 border border-gold-500/15 hover:border-gold-500/40 transition-all group"
                    >
                      <Code2 size={18} className="text-gold-400 mb-2" aria-hidden="true" />
                      <h4 className="font-display text-base text-parchment-100 group-hover:text-gold-300 transition-colors">
                        Research Projects
                      </h4>
                      <p className="font-body text-xs text-parchment-400 mt-1">
                        {totalProjects} modeling and simulation projects.
                      </p>
                    </Link>

                    <Link
                      href="/contact/"
                      className="glass-card p-5 border border-gold-500/15 hover:border-gold-500/40 transition-all group"
                    >
                      <Mail size={18} className="text-gold-400 mb-2" aria-hidden="true" />
                      <h4 className="font-display text-base text-parchment-100 group-hover:text-gold-300 transition-colors">
                        Get In Touch
                      </h4>
                      <p className="font-body text-xs text-parchment-400 mt-1">
                        Collaborations, internships &amp; graduate opportunities.
                      </p>
                    </Link>
                  </div>
                </SectionReveal>

              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
