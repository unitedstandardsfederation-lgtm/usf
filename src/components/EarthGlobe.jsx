import { useEffect, useMemo, useRef, useState } from 'react';
import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  geoDistance,
  geoInterpolate,
} from 'd3-geo';
import { feature, merge } from 'topojson-client';
import worldTopo from 'world-atlas/countries-110m.json';
import UsFlyingFlag from './UsFlyingFlag.jsx';

/**
 * EarthGlobe — institutional orthographic earth for the USF hero.
 * Land + rotation unchanged; network layer uses geodesic arcs, tiered
 * routes, and minimal pin markers (no overlapping ribbon / glow blobs).
 */

const ORIGIN = [-75.14, 38.77]; // Lewes, Delaware — federation headquarters

const PARTNERS = [
  { id: 'us', name: 'United States', coords: ORIGIN, origin: true, lx: -16, ly: -14, anchor: 'end' },
  { id: 'uk', name: 'United Kingdom', coords: [-2, 54], tier: 'primary', lx: -20, ly: -10, anchor: 'end' },
  { id: 'de', name: 'Germany', coords: [10.4, 51], tier: 'primary', lx: 18, ly: 12, anchor: 'start' },
  { id: 'in', name: 'India', coords: [79, 22], tier: 'primary', lx: 16, ly: 6, anchor: 'start' },
  { id: 'sg', name: 'Singapore', coords: [103.8, 1.3], tier: 'primary', lx: 18, ly: 14, anchor: 'start' },
  { id: 'nl', name: 'Netherlands', coords: [5.3, 52.1], tier: 'secondary', lx: 14, ly: -6, anchor: 'start' },
  { id: 'dk', name: 'Denmark', coords: [10, 56], tier: 'secondary', lx: -14, ly: 2, anchor: 'end' },
];

// Sparse global presence — small dots, no labels
const SECONDARY = [
  [-79.4, 43.7],  // Toronto
  [-46.6, -23.5], // São Paulo
  [139.7, 35.7],  // Tokyo
  [55.3, 25.2],   // Dubai
  [151.2, -33.9], // Sydney
];

const SIZE = 1000;
const CENTER = SIZE / 2;
const RADIUS = 430;
const BASE_TILT = -12;

function buildArc(from, to, steps = 56) {
  const interp = geoInterpolate(from, to);
  return {
    type: 'LineString',
    coordinates: Array.from({ length: steps }, (_, i) => interp(i / (steps - 1))),
  };
}

export default function EarthGlobe() {
  const [reducedMotion, setReducedMotion] = useState(false);

  const landRef = useRef(null);
  const usaRef = useRef(null);
  const gridRef = useRef(null);
  const routeBaseRefs = useRef([]);
  const routeFlowRefs = useRef([]);
  const routeGroupRefs = useRef([]);
  const nodeRefs = useRef({});
  const labelRefs = useRef({});
  const secRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  const geo = useMemo(() => {
    const land = merge(worldTopo, worldTopo.objects.countries.geometries);
    const usaGeom = worldTopo.objects.countries.geometries.find((g) => g.id === '840');
    const usa = usaGeom ? feature(worldTopo, usaGeom) : null;
    const graticule = geoGraticule().step([20, 20])();

    const routes = PARTNERS.filter((p) => !p.origin).map((p) => ({
      id: p.id,
      tier: p.tier,
      from: ORIGIN,
      to: p.coords,
      line: buildArc(ORIGIN, p.coords),
    }));

    return { land, usa, graticule, routes };
  }, []);

  const projection = useMemo(
    () =>
      geoOrthographic()
        .scale(RADIUS)
        .translate([CENTER, CENTER])
        .clipAngle(90)
        .precision(0.8),
    []
  );

  const pathGen = useMemo(() => geoPath(projection), [projection]);

  useEffect(() => {
    let lambda = 98;
    let raf;
    let last = performance.now();
    let acc = 0;
    const FRAME_MS = 1000 / 30;
    const DEG_PER_MS = reducedMotion ? 0 : 360 / 200000;

    const nodeOpacity = (coords, center) => {
      const dist = geoDistance(coords, center);
      if (dist >= Math.PI / 2) return 0;
      const depth = Math.cos(dist);
      return Math.max(0.18, 0.25 + depth * 0.75);
    };

    const routeOpacity = (from, to, center) => {
      const d0 = geoDistance(from, center);
      const d1 = geoDistance(to, center);
      if (d0 >= Math.PI / 2 || d1 >= Math.PI / 2) return 0;
      const depth = Math.min(Math.cos(d0), Math.cos(d1));
      return Math.max(0.12, depth * 0.92);
    };

    const render = () => {
      projection.rotate([lambda, BASE_TILT]);
      const center = [-lambda, -BASE_TILT];

      if (landRef.current) landRef.current.setAttribute('d', pathGen(geo.land) || '');
      if (gridRef.current) gridRef.current.setAttribute('d', pathGen(geo.graticule) || '');
      if (usaRef.current) usaRef.current.setAttribute('d', (geo.usa && pathGen(geo.usa)) || '');

      for (let i = 0; i < geo.routes.length; i++) {
        const r = geo.routes[i];
        const d = pathGen(r.line) || '';
        const base = routeBaseRefs.current[i];
        const flow = routeFlowRefs.current[i];
        const group = routeGroupRefs.current[i];
        if (base) base.setAttribute('d', d);
        if (flow) flow.setAttribute('d', d);
        if (group) {
          group.style.opacity = routeOpacity(r.from, r.to, center).toFixed(2);
        }
      }

      for (let i = 0; i < PARTNERS.length; i++) {
        const p = PARTNERS[i];
        const group = nodeRefs.current[p.id];
        const label = labelRefs.current[p.id];
        if (!group) continue;

        const opacity = nodeOpacity(p.coords, center);
        const [px, py] = projection(p.coords);
        group.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`);
        group.style.opacity = opacity.toFixed(2);

        if (label) {
          label.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`);
          const dist = geoDistance(p.coords, center);
          const depth = Math.cos(dist);
          label.style.opacity =
            depth > 0.42 ? Math.min(0.95, (depth - 0.42) * 2.2).toFixed(2) : '0';
        }
      }

      for (let i = 0; i < SECONDARY.length; i++) {
        const el = secRefs.current[i];
        if (!el) continue;
        const c = SECONDARY[i];
        const opacity = nodeOpacity(c, center) * 0.55;
        const [px, py] = projection(c);
        el.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`);
        el.style.opacity = opacity.toFixed(2);
      }
    };

    const tick = (now) => {
      const dt = now - last;
      last = now;
      acc += dt;
      lambda += dt * DEG_PER_MS;
      if (lambda > 360) lambda -= 360;
      if (acc >= FRAME_MS || reducedMotion) {
        acc = 0;
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    render();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [geo, projection, pathGen, reducedMotion]);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      role="img"
      aria-label="Earth showing the United Standards Federation network — a USA-based federation connecting partner organizations across North America, Europe, Asia, and other global regions."
    >
      <defs>
        <radialGradient id="usfOcean" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#16386f" />
          <stop offset="55%" stopColor="#0b2a59" />
          <stop offset="100%" stopColor="#05142e" />
        </radialGradient>

        <radialGradient id="usfSphereShade" cx="63%" cy="70%" r="68%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(2,8,22,0.55)" />
        </radialGradient>

        <radialGradient id="usfAtm" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="rgba(120,170,255,0)" />
          <stop offset="92%" stopColor="rgba(130,180,255,0.18)" />
          <stop offset="100%" stopColor="rgba(130,180,255,0)" />
        </radialGradient>

        <clipPath id="usfSphereClip">
          <circle cx={CENTER} cy={CENTER} r={RADIUS} />
        </clipPath>
      </defs>

      <circle cx={CENTER} cy={CENTER} r={RADIUS * 1.05} fill="url(#usfAtm)" />
      <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#usfOcean)" />

      <g clipPath="url(#usfSphereClip)">
        <path
          ref={gridRef}
          fill="none"
          stroke="rgba(168,192,228,0.14)"
          strokeWidth="0.6"
        />

        <path
          ref={landRef}
          fill="#33619e"
          fillOpacity="0.95"
          stroke="rgba(150,185,235,0.35)"
          strokeWidth="0.5"
        />

        <path
          ref={usaRef}
          fill="#5d8fd1"
          stroke="rgba(255,235,235,0.7)"
          strokeWidth="0.7"
        />

        {/* Federation routes — faint track + staggered flow pulse per corridor */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {geo.routes.map((r, i) => {
            const isPrimary = r.tier === 'primary';
            const flowDur = isPrimary ? 5.5 + i * 0.7 : 7 + i * 0.5;
            const flowDelay = i * 0.85;
            return (
              <g
                key={r.id}
                ref={(el) => (routeGroupRefs.current[i] = el)}
                style={{ opacity: 0, transition: 'opacity 0.5s ease-out' }}
              >
                <path
                  ref={(el) => (routeBaseRefs.current[i] = el)}
                  stroke="rgba(180,205,240,0.22)"
                  strokeWidth={isPrimary ? 0.75 : 0.55}
                />
                <path
                  ref={(el) => (routeFlowRefs.current[i] = el)}
                  stroke={isPrimary ? 'rgba(253,253,253,0.72)' : 'rgba(253,253,253,0.45)'}
                  strokeWidth={isPrimary ? 0.9 : 0.65}
                  strokeDasharray={isPrimary ? '1.5 22' : '1 28'}
                  pathLength="100"
                  opacity="0.85"
                >
                  {!reducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-23.5"
                      dur={`${flowDur}s`}
                      begin={`${flowDelay}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              </g>
            );
          })}
        </g>

        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#usfSphereShade)" />
      </g>

      {/* Secondary presence — minimal dots */}
      <g>
        {SECONDARY.map((_, i) => (
          <g
            key={i}
            ref={(el) => (secRefs.current[i] = el)}
            style={{ opacity: 0, transition: 'opacity 0.4s ease-out' }}
          >
            <circle r="1.8" fill="rgba(253,253,253,0.55)" />
            <circle r="0.7" fill="#D6141B" />
          </g>
        ))}
      </g>

      {/* Partner pins — institutional marker, not glow orb */}
      <g>
        {PARTNERS.map((p) => (
          <g
            key={p.id}
            ref={(el) => (nodeRefs.current[p.id] = el)}
            style={{ opacity: 0, transition: 'opacity 0.45s ease-out' }}
          >
            {p.origin ? (
              <>
                <circle r="9" fill="none" stroke="rgba(253,253,253,0.22)" strokeWidth="0.7" />
                <circle r="5.5" fill="rgba(214,20,27,0.18)" />
                <circle r="3.2" fill="#D6141B" stroke="#FDFDFD" strokeWidth="1.1" />
                <circle r="1" fill="#FDFDFD" />
                <UsFlyingFlag reducedMotion={reducedMotion} />
              </>
            ) : (
              <>
                <circle
                  r="5"
                  fill="none"
                  stroke="rgba(253,253,253,0.35)"
                  strokeWidth="0.65"
                />
                <circle r="2.2" fill="#FDFDFD" stroke="rgba(214,20,27,0.5)" strokeWidth="0.5" />
                <circle r="0.9" fill="#D6141B" />
              </>
            )}
          </g>
        ))}
      </g>

      {/* Labels — leader line + outlined uppercase type */}
      <g
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        {PARTNERS.map((p) => (
          <g
            key={`label-${p.id}`}
            ref={(el) => (labelRefs.current[p.id] = el)}
            style={{ opacity: 0, transition: 'opacity 0.55s ease-out' }}
          >
            <line
              x1="0"
              y1="0"
              x2={p.lx * 0.62}
              y2={p.ly * 0.62}
              stroke="rgba(253,253,253,0.28)"
              strokeWidth="0.55"
            />
            <text
              x={p.lx}
              y={p.ly}
              textAnchor={p.anchor}
              fill="rgba(253,253,253,0.9)"
              stroke="rgba(8,30,64,0.75)"
              strokeWidth="2.5"
              paintOrder="stroke"
              style={{ textTransform: 'uppercase' }}
            >
              {p.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
