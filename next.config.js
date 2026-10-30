/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  /*
    Pin the workspace root. A stray package-lock.json in a parent directory
    made Turbopack infer that folder as the root and warn on every build.
    Pinning here fixes it inside the repo, without touching files outside it.
  */
  turbopack: { root: __dirname },
  // GitHub Pages: no basePath is needed when the repo is named Himanshu3122.github.io.
  // For any other repo name, set basePath to '/repo-name' (and update SITE_URL in data/site.js).
  // basePath: '/portfolio',
}
module.exports = nextConfig
