/**
 * Five small isometric constructions, one per capability. Same 30°
 * projection as the mark; each says something about the work.
 */

const COS30 = Math.cos(Math.PI / 6);
const U = 26;

function p(x: number, y: number, z: number, cx = 90, cy = 118): [number, number] {
  return [cx + (x - y) * COS30 * U, cy + (x + y) * 0.5 * U - z * U];
}

const l = (a: [number, number, number], b: [number, number, number]) => {
  const s = p(...a);
  const e = p(...b);
  return `M${s[0].toFixed(1)} ${s[1].toFixed(1)}L${e[0].toFixed(1)} ${e[1].toFixed(1)}`;
};

const tile = (x: number, y: number, z: number) =>
  [p(x, y, z), p(x + 1, y, z), p(x + 1, y + 1, z), p(x, y + 1, z)]
    .map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`)
    .join(" ");

type Art = { solid: string[]; lines: string[]; dots: Array<[number, number, number]> };

/** 01 Build — something rising out of nothing. */
const build: Art = {
  solid: [tile(-1, -1, 0), tile(0, -1, 1), tile(-1, 0, 1), tile(0, 0, 2)],
  lines: [l([-1, -1, 0], [-1, -1, 3]), l([1, 1, 0], [1, 1, 1])],
  dots: [[0.5, 0.5, 2.4]],
};

/** 02 Modernize — a block being replaced piece by piece. */
const modernize: Art = {
  solid: [tile(-1.5, -0.5, 0), tile(0.5, -0.5, 0)],
  lines: [
    l([-0.5, -0.5, 0], [-0.5, 1.5, 0]),
    l([-1.5, 0.5, 1], [-0.5, 0.5, 1]),
    l([0.5, -0.5, 1], [1.5, -0.5, 1]),
  ],
  dots: [[1, 0, 0.9], [0, 1, 0.4]],
};

/** 03 Add AI — a field of signals resolving into one path. */
const addAi: Art = {
  solid: [tile(-0.5, -0.5, 0)],
  lines: [
    l([-1.5, -1.5, 1.2], [-0.5, -0.5, 0.4]),
    l([1.5, -1.5, 1.2], [0.5, -0.5, 0.4]),
    l([-1.5, 1.5, 1.2], [-0.5, 0.5, 0.4]),
    l([0.5, 0.5, 0.4], [0.5, 0.5, 1.8]),
  ],
  dots: [[-1.5, -1.5, 1.2], [1.5, -1.5, 1.2], [-1.5, 1.5, 1.2], [0.5, 0.5, 1.9]],
};

/** 04 Scale — one unit becoming a lattice. */
const scale: Art = {
  solid: [tile(-1.5, -1.5, 0), tile(-0.5, -1.5, 0), tile(-1.5, -0.5, 0), tile(-0.5, -0.5, 0)],
  lines: [
    l([-1.5, 0.5, 0], [1.5, 0.5, 0]),
    l([0.5, -1.5, 0], [0.5, 1.5, 0]),
    l([-1.5, -1.5, 0], [-1.5, -1.5, 1.6]),
    l([1.5, 1.5, 0], [1.5, 1.5, 0.9]),
  ],
  dots: [[1, 1, 1], [-1, 1, 0.2]],
};

/** 05 Improve delivery — a track with things moving along it. */
const delivery: Art = {
  solid: [tile(-1.5, 0, 0)],
  lines: [
    l([-1.5, 0.5, 0], [1.5, 0.5, 0]),
    l([-1.5, 0.5, 0.9], [1.5, 0.5, 0.9]),
    l([-0.5, 0.5, 0], [-0.5, 0.5, 0.9]),
    l([0.5, 0.5, 0], [0.5, 0.5, 0.9]),
  ],
  dots: [[-0.5, 0.5, 1.1], [0.9, 0.5, 1.1]],
};

const ART: Art[] = [build, modernize, addAi, scale, delivery];

export default function TileArt({ index }: { index: number }) {
  const art = ART[index % ART.length];
  return (
    <svg viewBox="0 0 180 168" aria-hidden="true" style={{ inlineSize: "100%", blockSize: "auto" }}>
      {art.solid.map((pts) => (
        <polygon
          key={pts}
          points={pts}
          fill="rgba(45,216,224,0.10)"
          stroke="rgba(45,216,224,0.45)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      ))}
      {art.lines.map((d) => (
        <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      ))}
      {art.dots.map((d, i) => {
        const [x, y] = p(...d);
        return (
          <path
            key={i}
            d={`M${x} ${y - 3.4}L${x + 5.6} ${y}L${x} ${y + 3.4}L${x - 5.6} ${y}Z`}
            fill="var(--accent)"
          />
        );
      })}
    </svg>
  );
}
