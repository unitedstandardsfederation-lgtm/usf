import { useMemo } from 'react';

/**
 * Institutional dotted world map.
 * Coordinates are stylized regional clusters (lon/lat → x/y) — designed
 * to read at a glance, not as a geographic source of truth.
 *
 * We render thousands of small dots that approximate continental landmasses,
 * then overlay highlighted nodes with subtle connection lines.
 */

// Stylized continent contours rendered as dot clouds.
// Each tuple is a relative path of (x, y) points within the 1000x500 viewbox.
const CONTINENT_BANDS = [
  // North America
  { cx: 215, cy: 175, rx: 130, ry: 95, density: 0.55 },
  // South America
  { cx: 305, cy: 340, rx: 65, ry: 110, density: 0.55 },
  // Europe
  { cx: 510, cy: 165, rx: 75, ry: 55, density: 0.55 },
  // Africa
  { cx: 540, cy: 290, rx: 95, ry: 115, density: 0.55 },
  // Middle East / Central Asia
  { cx: 620, cy: 215, rx: 60, ry: 45, density: 0.5 },
  // Asia
  { cx: 760, cy: 200, rx: 130, ry: 90, density: 0.55 },
  // South & Southeast Asia
  { cx: 730, cy: 290, rx: 70, ry: 50, density: 0.55 },
  // Oceania
  { cx: 855, cy: 380, rx: 60, ry: 35, density: 0.55 },
];

// Deterministic pseudo-random
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateDots() {
  const rand = mulberry32(7);
  const dots = [];
  CONTINENT_BANDS.forEach((band, bandIdx) => {
    const area = Math.PI * band.rx * band.ry;
    const count = Math.floor(area * 0.05 * band.density);
    for (let i = 0; i < count; i++) {
      // Sample uniformly in unit disk
      const r = Math.sqrt(rand());
      const theta = rand() * Math.PI * 2;
      const u = Math.cos(theta) * r;
      const v = Math.sin(theta) * r;
      // Add a touch of noise to break the perfect ellipse
      const wobble = (rand() - 0.5) * 14;
      const x = band.cx + u * band.rx + wobble * 0.5;
      const y = band.cy + v * band.ry + wobble * 0.4;
      // Drop occasional points for texture
      if (rand() < 0.18) continue;
      dots.push({ x, y, b: bandIdx });
    }
  });
  return dots;
}

// Highlighted federation nodes — approximate positions on the 1000x500 grid.
export const FEDERATION_NODES = [
  { id: 'us', name: 'United States', x: 215, y: 175, anchor: 'right' },
  { id: 'uk', name: 'United Kingdom', x: 488, y: 148, anchor: 'left' },
  { id: 'nl', name: 'Netherlands', x: 510, y: 152, anchor: 'right' },
  { id: 'dk', name: 'Denmark', x: 522, y: 138, anchor: 'right' },
  { id: 'de', name: 'Germany', x: 525, y: 162, anchor: 'right' },
  { id: 'in', name: 'India', x: 712, y: 248, anchor: 'right' },
  { id: 'sg', name: 'Singapore', x: 765, y: 305, anchor: 'right' },
];

export default function WorldMap({
  className = '',
  variant = 'dark',
  showLabels = false,
  showLines = true,
  showPulses = true,
}) {
  const dots = useMemo(() => generateDots(), []);

  const palette =
    variant === 'dark'
      ? {
          dot: 'rgba(180, 200, 230, 0.22)',
          dotStrong: 'rgba(210, 225, 245, 0.55)',
          line: 'rgba(214, 20, 27, 0.55)',
          lineSoft: 'rgba(180, 200, 230, 0.18)',
          nodeFill: '#D6141B',
          nodeRing: 'rgba(214, 20, 27, 0.35)',
          label: '#F5F7FA',
        }
      : {
          dot: 'rgba(12, 43, 91, 0.18)',
          dotStrong: 'rgba(12, 43, 91, 0.55)',
          line: 'rgba(214, 20, 27, 0.55)',
          lineSoft: 'rgba(12, 43, 91, 0.18)',
          nodeFill: '#D6141B',
          nodeRing: 'rgba(214, 20, 27, 0.30)',
          label: '#0C2B5B',
        };

  // Connection pairs (great-circle-ish stylized arcs)
  const connections = [
    ['us', 'uk'],
    ['us', 'de'],
    ['uk', 'in'],
    ['de', 'in'],
    ['nl', 'sg'],
    ['in', 'sg'],
    ['dk', 'us'],
    ['us', 'sg'],
  ];

  const nodeById = Object.fromEntries(FEDERATION_NODES.map((n) => [n.id, n]));

  function arcPath(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lift = Math.min(120, dist * 0.35);
    const cx = mx;
    const cy = my - lift;
    return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
  }

  return (
    <svg
      viewBox="0 0 1000 500"
      className={className}
      role="img"
      aria-label="World map showing USF federation nodes"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="usf-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D6141B" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#D6141B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D6141B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="usf-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D6141B" stopOpacity="0" />
          <stop offset="50%" stopColor="#D6141B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D6141B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Continent dot field */}
      <g>
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.b === 0 || d.b === 2 || d.b === 5 || d.b === 6 ? 1.35 : 1.15}
            fill={palette.dot}
          />
        ))}
      </g>

      {/* Connection arcs */}
      {showLines && (
        <g fill="none" strokeLinecap="round">
          {connections.map(([fromId, toId], i) => {
            const a = nodeById[fromId];
            const b = nodeById[toId];
            if (!a || !b) return null;
            return (
              <path
                key={i}
                d={arcPath(a, b)}
                stroke="url(#usf-line-grad)"
                strokeWidth="1.2"
                opacity="0.85"
              />
            );
          })}
        </g>
      )}

      {/* Highlighted federation nodes */}
      <g>
        {FEDERATION_NODES.map((n) => (
          <g key={n.id}>
            {showPulses && (
              <>
                <circle cx={n.x} cy={n.y} r="14" fill="url(#usf-node-glow)" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="5"
                  fill="none"
                  stroke={palette.nodeRing}
                  strokeWidth="1.2"
                  className="origin-center"
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    animation: `usfPulse 2.8s ${(n.x % 7) * 0.15}s ease-out infinite`,
                  }}
                />
              </>
            )}
            <circle cx={n.x} cy={n.y} r="3.4" fill={palette.nodeFill} />
            <circle cx={n.x} cy={n.y} r="1.2" fill="#fff" />
            {showLabels && (
              <text
                x={n.anchor === 'right' ? n.x + 10 : n.x - 10}
                y={n.y + 3}
                textAnchor={n.anchor === 'right' ? 'start' : 'end'}
                fill={palette.label}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {n.name}
              </text>
            )}
          </g>
        ))}
      </g>

      <style>{`
        @keyframes usfPulse {
          0%   { transform: scale(1);   opacity: 0.9; }
          80%, 100% { transform: scale(3.6); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
