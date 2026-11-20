/*
  Decorative circuit-board traces for the hero, with small pulses of
  "current" travelling along them. Pure SVG + CSS: no JS work per frame.
  The centre is masked out so the name and bio stay readable, and the
  global prefers-reduced-motion rule in globals.css stops the pulses.
*/
const TRACES = [
  'M0 120 H180 L220 160 H380',
  'M0 260 H120 L160 220 H300 L340 260 H420',
  'M0 420 H90 L130 460 H260',
  'M0 560 H200 L240 520 H330',
  'M140 0 V70 L180 110 H260',
  'M300 700 V610 L340 570 H430',
  'M1200 110 H1010 L970 150 H820',
  'M1200 250 H1080 L1040 290 H900 L860 250 H780',
  'M1200 410 H1100 L1060 450 H940',
  'M1200 570 H990 L950 530 H860',
  'M1060 0 V80 L1020 120 H930',
  'M900 700 V620 L860 580 H760',
]

/* End points of each trace get a solder pad */
const PADS = [
  [380, 160], [420, 260], [260, 460], [330, 520], [260, 110], [430, 570],
  [820, 150], [780, 250], [940, 450], [860, 530], [930, 120], [760, 580],
  [220, 160], [160, 220], [340, 260], [1040, 290], [860, 250], [970, 150],
]

export default function CircuitBackground() {
  return (
    <div className="circuit-bg absolute inset-0 pointer-events-none text-gold-400" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d, i) => (
            <path key={`t${i}`} d={d} strokeOpacity="0.16" />
          ))}
          {TRACES.map((d, i) => (
            <path
              key={`p${i}`}
              d={d}
              pathLength="1000"
              className="circuit-pulse"
              strokeWidth="2"
              strokeDasharray="60 1000"
              style={{ animationDuration: `${5 + (i % 5)}s`, animationDelay: `${(i * 0.9) % 6}s` }}
            />
          ))}
        </g>
        <g fill="currentColor">
          {PADS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fillOpacity="0.35" />
          ))}
        </g>
      </svg>

      <style jsx>{`
        .circuit-bg {
          -webkit-mask-image: radial-gradient(ellipse 55% 60% at 50% 45%, transparent 30%, #000 75%);
          mask-image: radial-gradient(ellipse 55% 60% at 50% 45%, transparent 30%, #000 75%);
        }
        .circuit-bg :global(.circuit-pulse) {
          stroke-opacity: 0.9;
          stroke-dashoffset: 1060;
          animation-name: circuit-flow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 0 4px currentColor);
        }
        @keyframes circuit-flow {
          from { stroke-dashoffset: 1060; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
