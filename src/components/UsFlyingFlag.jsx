/**
 * US flag on a pole — federation origin only.
 * Wave motion uses SVG SMIL (reliable in SVG) + layered vertical segments.
 */

const FLAG_W = 36;
const FLAG_H = 21;
const STRIPES = 13;
const STRIPE_H = FLAG_H / STRIPES;
const CANTON_W = FLAG_W * 0.42;
const CANTON_H = STRIPE_H * 7;
const SEGMENTS = 8;
const SEG_W = FLAG_W / SEGMENTS;

const STARS = [
  [3, 2.5], [7.5, 2.5], [12, 2.5],
  [5.2, 5.5], [9.8, 5.5],
  [3, 8.5], [7.5, 8.5], [12, 8.5],
  [5.2, 11.5], [9.8, 11.5],
];

function FlagArtwork() {
  return (
    <>
      {Array.from({ length: STRIPES }, (_, i) => (
        <rect
          key={i}
          x="0"
          y={i * STRIPE_H}
          width={FLAG_W}
          height={STRIPE_H + 0.12}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
        />
      ))}
      <rect x="0" y="0" width={CANTON_W} height={CANTON_H} fill="#3C3B6E" />
      {STARS.map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r="0.85" fill="#FFFFFF" opacity="0.95" />
      ))}
      <line
        x1={FLAG_W}
        y1="0"
        x2={FLAG_W}
        y2={FLAG_H}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="0.45"
      />
    </>
  );
}

function WaveSegment({ index, reducedMotion }) {
  const phase = index * 0.14;
  const lift = 0.35 + (index % 3) * 0.12;
  const dur = 3.2 + (index % 4) * 0.25;

  return (
    <g clipPath={`url(#usfFlagSeg${index})`}>
      {!reducedMotion && (
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`0,0; 0,${-lift}; 0,${lift * 0.45}; 0,${-lift * 0.25}; 0,0`}
          keyTimes="0; 0.28; 0.55; 0.78; 1"
          dur={`${dur}s`}
          begin={`${phase}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
        />
      )}
      <FlagArtwork />
    </g>
  );
}

export default function UsFlyingFlag({ reducedMotion = false }) {
  return (
    <g transform="translate(10, -6)" aria-hidden="true">
      <line
        x1="0"
        y1="4"
        x2="0"
        y2={-20}
        stroke="rgba(220,228,240,0.55)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="0" cy="-20" r="1.2" fill="rgba(220,228,240,0.7)" />

      <g transform="translate(0, -20)">
        {/* Shadow follows the cloth */}
        <g>
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1; 0.94 1; 1.02 1; 1 1"
              keyTimes="0; 0.35; 0.7; 1"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            />
          )}
          <ellipse
            cx={FLAG_W * 0.45}
            cy={FLAG_H + 1.5}
            rx={FLAG_W * 0.42}
            ry="1.8"
            fill="rgba(0,0,0,0.22)"
          />
        </g>

        {/* Whole cloth — slow sway from the pole */}
        <g>
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 0 ${FLAG_H / 2}; 4.5 0 ${FLAG_H / 2}; -3 0 ${FLAG_H / 2}; 2 0 ${FLAG_H / 2}; 0 0 ${FLAG_H / 2}`}
              keyTimes="0; 0.25; 0.5; 0.75; 1"
              dur="6.5s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.37 0 0.63 1; 0.37 0 0.63 1; 0.37 0 0.63 1; 0.37 0 0.63 1"
            />
          )}

          {/* Ripple — each vertical slice moves with a staggered phase */}
          <g clipPath="url(#usfFlagClip)">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <WaveSegment key={i} index={i} reducedMotion={reducedMotion} />
            ))}
          </g>
        </g>
      </g>

      <defs>
        <clipPath id="usfFlagClip">
          <rect width={FLAG_W} height={FLAG_H} rx="0.4" />
        </clipPath>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <clipPath key={i} id={`usfFlagSeg${i}`}>
            <rect x={i * SEG_W} y="0" width={SEG_W + 0.2} height={FLAG_H} />
          </clipPath>
        ))}
      </defs>
    </g>
  );
}
