/*
  Small line-art header for project cards. Each project picks a `cover`
  in data/projects.js; unknown or missing values fall back to `circuit`.
  Drawn with currentColor so it follows the theme's accent colour.
*/
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const COVERS = {
  /* Server racks with status LEDs */
  datacenter: (
    <g {...S}>
      {[110, 150, 190].map(x => (
        <g key={x}>
          <rect x={x} y="22" width="30" height="76" rx="3" />
          {[34, 50, 66, 82].map(y => (
            <g key={y}>
              <line x1={x + 6} y1={y} x2={x + 18} y2={y} />
              <circle cx={x + 24} cy={y} r="1.6" fill="currentColor" />
            </g>
          ))}
        </g>
      ))}
      <path d="M40 92 Q60 60 80 78 T100 52" strokeOpacity="0.6" />
      <path d="M230 52 Q250 80 270 64 T295 90" strokeOpacity="0.6" />
    </g>
  ),
  /* Transmission tower and a load curve */
  grid: (
    <g {...S}>
      <path d="M150 100 L165 24 L180 100 M156 72 H174 M160 50 H170 M140 40 H190 M146 62 H184" />
      <path d="M30 88 C60 88 70 40 95 52 S120 92 135 70" />
      <path d="M195 70 C215 40 235 96 255 60 S285 36 295 50" />
      <line x1="140" y1="40" x2="40" y2="30" strokeOpacity="0.4" />
      <line x1="190" y1="40" x2="290" y2="30" strokeOpacity="0.4" />
    </g>
  ),
  /* Car connected to the grid with a two-way arrow */
  v2g: (
    <g {...S}>
      <path d="M70 84 V72 L84 54 H128 L142 72 V84 Z" />
      <circle cx="88" cy="86" r="7" />
      <circle cx="126" cy="86" r="7" />
      <path d="M160 70 H200 M190 62 L200 70 L190 78 M200 86 H160 M170 78 L160 86 L170 94" />
      <path d="M230 100 L242 34 L254 100 M234 62 H250 M226 48 H258" />
    </g>
  ),
  /* GPU chip with pins */
  gpu: (
    <g {...S}>
      <rect x="125" y="30" width="70" height="60" rx="6" />
      <rect x="143" y="46" width="34" height="28" rx="3" strokeOpacity="0.6" />
      {[40, 52, 64, 76].map(y => (
        <g key={y}>
          <line x1="110" y1={y} x2="125" y2={y} />
          <line x1="195" y1={y} x2="210" y2={y} />
        </g>
      ))}
      <path d="M40 80 L60 60 L75 70 L95 44" strokeOpacity="0.6" />
      <path d="M225 44 L245 64 L262 52 L285 78" strokeOpacity="0.6" />
    </g>
  ),
  /* Queue of jobs flowing into a server */
  queue: (
    <g {...S}>
      {[40, 70, 100, 130].map(x => <rect key={x} x={x} y="48" width="22" height="22" rx="4" />)}
      <path d="M160 59 H195 M186 51 L196 59 L186 67" />
      <circle cx="235" cy="59" r="26" />
      <path d="M222 59 H248 M235 46 V72" strokeOpacity="0.6" />
    </g>
  ),
  /* Hierarchy of agents (tree) */
  hierarchy: (
    <g {...S}>
      <circle cx="160" cy="26" r="9" />
      <circle cx="105" cy="62" r="8" /><circle cx="215" cy="62" r="8" />
      {[75, 135, 185, 245].map(x => <circle key={x} cx={x} cy="96" r="7" />)}
      <path d="M154 33 L110 55 M166 33 L210 55 M100 69 L79 90 M110 69 L131 90 M210 69 L189 90 M220 69 L241 90" />
      <path d="M131 96 H185" strokeDasharray="3 5" strokeOpacity="0.6" />
    </g>
  ),
  /* EV with charging bolt */
  ev: (
    <g {...S}>
      <path d="M95 82 V70 L110 52 H160 L176 70 V82 Z" />
      <circle cx="116" cy="84" r="7" />
      <circle cx="156" cy="84" r="7" />
      <rect x="205" y="38" width="30" height="56" rx="4" />
      <path d="M222 48 L214 64 H226 L218 82" />
      <path d="M205 70 C190 70 190 74 178 74" />
    </g>
  ),
  /* Ring of agents reaching consensus */
  consensus: (
    <g {...S}>
      {[0, 60, 120, 180, 240, 300].map(a => {
        const r = (a * Math.PI) / 180
        return <circle key={a} cx={160 + 42 * Math.cos(r)} cy={60 + 38 * Math.sin(r)} r="7" />
      })}
      <circle cx="160" cy="60" r="10" fill="currentColor" fillOpacity="0.25" />
      {[0, 60, 120, 180, 240, 300].map(a => {
        const r = (a * Math.PI) / 180
        return <line key={a} x1="160" y1="60" x2={160 + 34 * Math.cos(r)} y2={60 + 31 * Math.sin(r)} strokeOpacity="0.5" />
      })}
      <path d="M216 52 L226 60 L216 68" strokeOpacity="0.6" />
    </g>
  ),
  /* Grid under attack: shield over a power line */
  shield: (
    <g {...S}>
      <path d="M160 24 L188 34 V58 C188 76 175 88 160 96 C145 88 132 76 132 58 V34 Z" />
      <path d="M148 60 L157 69 L174 50" />
      <path d="M40 80 H110 M210 80 H285" strokeDasharray="4 4" />
    </g>
  ),
  circuit: (
    <g {...S}>
      <path d="M30 40 H120 L140 60 H200 M200 60 L220 40 H290 M60 90 H150 L170 70 H260" />
      {[[120, 40], [200, 60], [150, 90], [260, 70]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="currentColor" />)}
    </g>
  ),
}

export default function ProjectCover({ cover }) {
  return (
    <div
      className="relative h-28 -mx-6 -mt-6 mb-5 rounded-t-2xl overflow-hidden border-b border-gold-500/10 bg-gradient-to-br from-gold-500/15 via-noir-700/40 to-noir-800/60 text-gold-400"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-60" style={{ backgroundSize: '22px 22px' }} />
      <svg viewBox="0 0 320 120" className="relative w-full h-full" preserveAspectRatio="xMidYMid meet">
        {COVERS[cover] || COVERS.circuit}
      </svg>
    </div>
  )
}
