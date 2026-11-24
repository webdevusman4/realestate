import type { Item, Plan, Room } from "@/lib/plans";

const FILL: Record<Room["kind"], string> = {
  bed: "url(#wood)",
  bath: "url(#tile)",
  living: "url(#wood-light)",
  drawing: "url(#wood-light)",
  terrace: "#d9d5cb",
  balcony: "#d9d5cb",
};

function Defs() {
  return (
    <defs>
      <pattern id="wood" width="14" height="40" patternUnits="userSpaceOnUse">
        <rect width="14" height="40" fill="#b98a5e" />
        <rect width="1.4" height="40" fill="#a2764d" />
        <rect y="19" width="14" height="1" fill="#a97d54" opacity="0.5" />
      </pattern>
      <pattern id="wood-light" width="14" height="40" patternUnits="userSpaceOnUse">
        <rect width="14" height="40" fill="#e8d6b1" />
        <rect width="1.4" height="40" fill="#d6c093" />
        <rect y="19" width="14" height="1" fill="#d6c093" opacity="0.5" />
      </pattern>
      <pattern id="tile" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#e4e8e6" />
        <path d="M12 0H0V12" fill="none" stroke="#cfd6d3" strokeWidth="0.8" />
      </pattern>
    </defs>
  );
}

const INK = "#15120e";

/** The room an item sits in (the last-drawn room that contains its centre). */
function ownerOf(plan: Plan, it: Item) {
  const w = "w" in it ? it.w : 0;
  const h = "h" in it ? it.h : 0;
  const cx = it.x + w / 2;
  const cy = it.y + h / 2;
  const hit = plan.rooms.filter((r) => cx >= r.r[0] && cx <= r.r[0] + r.r[2] && cy >= r.r[1] && cy <= r.r[1] + r.r[3]);
  return hit.length ? hit[hit.length - 1].id : undefined;
}

function Furniture({ it }: { it: Item }) {
  switch (it.t) {
    case "bed": {
      const { x, y, w, h, head } = it;
      const horiz = head === "W" || head === "E";
      const pw = horiz ? 12 : (w - 12) / 2;
      const ph = horiz ? (h - 12) / 2 : 12;
      const p = (i: number) => {
        if (head === "W") return { x: x + 4, y: y + 4 + i * (ph + 4), w: pw, h: ph };
        if (head === "E") return { x: x + w - 4 - pw, y: y + 4 + i * (ph + 4), w: pw, h: ph };
        if (head === "N") return { x: x + 4 + i * (pw + 4), y: y + 4, w: pw, h: ph };
        return { x: x + 4 + i * (pw + 4), y: y + h - 4 - ph, w: pw, h: ph };
      };
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx="4" fill="#f4eee2" stroke="#8a7456" strokeWidth="1.2" />
          {[0, 1].map((i) => {
            const q = p(i);
            return <rect key={i} x={q.x} y={q.y} width={q.w} height={q.h} rx="3" fill="#fff" stroke="#b9a98a" strokeWidth="0.8" />;
          })}
        </g>
      );
    }
    case "sofa": {
      const { x, y, w, h, back } = it;
      const t = 7;
      const b =
        back === "N" ? { x, y, w, h: t } : back === "S" ? { x, y: y + h - t, w, h: t } : back === "W" ? { x, y, w: t, h } : { x: x + w - t, y, w: t, h };
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx="4" fill="#cdbb94" stroke="#8a7456" strokeWidth="1" />
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="#a8946b" />
        </g>
      );
    }
    case "table": {
      const { x, y, w, h, chairs } = it;
      const out = [];
      const side = Math.ceil(chairs / 2);
      const long = h >= w;
      for (let i = 0; i < side; i++) {
        const f = (i + 0.5) / side;
        if (long) {
          out.push(<rect key={`a${i}`} x={x - 9} y={y + f * h - 5} width="8" height="10" rx="2" fill="#a8946b" />);
          out.push(<rect key={`b${i}`} x={x + w + 1} y={y + f * h - 5} width="8" height="10" rx="2" fill="#a8946b" />);
        } else {
          out.push(<rect key={`a${i}`} x={x + f * w - 5} y={y - 9} width="10" height="8" rx="2" fill="#a8946b" />);
          out.push(<rect key={`b${i}`} x={x + f * w - 5} y={y + h + 1} width="10" height="8" rx="2" fill="#a8946b" />);
        }
      }
      return (
        <g>
          {out}
          <rect x={x} y={y} width={w} height={h} rx="6" fill="#f7f3ea" stroke="#8a7456" strokeWidth="1.2" />
        </g>
      );
    }
    case "rug":
      return (
        <g>
          <rect x={it.x} y={it.y} width={it.w} height={it.h} fill="#8c2f2a" stroke="#d9b45f" strokeWidth="2" />
          <rect x={it.x + 8} y={it.y + 8} width={it.w - 16} height={it.h - 16} fill="none" stroke="#d9b45f" strokeWidth="1" />
          <rect x={it.x + it.w / 2 - 10} y={it.y + it.h / 2 - 10} width="20" height="20" fill="#d9b45f" opacity="0.55" />
        </g>
      );
    case "tub":
      return (
        <g>
          <rect x={it.x} y={it.y} width={it.w} height={it.h} rx="6" fill="#fff" stroke="#8fa09b" strokeWidth="1.2" />
          <rect x={it.x + 4} y={it.y + 4} width={it.w - 8} height={it.h - 8} rx="5" fill="#eef3f1" stroke="#c4d0cc" strokeWidth="0.8" />
        </g>
      );
    case "wc": {
      const rot = { N: 0, E: 90, S: 180, W: 270 }[it.dir];
      return (
        <g transform={`translate(${it.x} ${it.y}) rotate(${rot})`}>
          <rect x="-8" y="-12" width="16" height="7" rx="2" fill="#fff" stroke="#8fa09b" strokeWidth="1" />
          <ellipse cx="0" cy="2" rx="7.5" ry="9.5" fill="#fff" stroke="#8fa09b" strokeWidth="1" />
        </g>
      );
    }
    case "counter":
      return <rect x={it.x} y={it.y} width={it.w} height={it.h} fill="#4a3a2d" stroke="#2c2219" strokeWidth="1" />;
    case "wardrobe":
      return <rect x={it.x} y={it.y} width={it.w} height={it.h} fill="#7a5a3c" stroke="#3b2a1b" strokeWidth="1" />;
  }
}

/**
 * Clean vector floor plan. With `focus` it zooms to a single room (used for the room-by-room section).
 * Not to scale: sizes are the ones printed on the brochure.
 */
export default function FloorPlan({ plan, focus, label, fit }: { plan: Plan; focus?: string; label: string; fit?: boolean }) {
  const room = focus ? plan.rooms.find((r) => r.id === focus) : undefined;
  let view = plan.view;
  if (room) {
    const [x, y, w, h] = room.r;
    const pad = 22;
    // Keep a pleasant 4:3-ish frame around the room.
    const vw = Math.max(w + pad * 2, (h + pad * 2) * 1.1);
    const vh = Math.max(h + pad * 2, vw / 1.5);
    view = [x + w / 2 - vw / 2, y + h / 2 - vh / 2, vw, vh];
  }
  const full = !room;
  return (
    <svg viewBox={view.join(" ")} role="img" aria-label={label} style={{ display: "block", width: "100%", height: fit ? "100%" : "auto" }} fontFamily="Inter, system-ui, sans-serif">
      <Defs />
      <rect x={view[0]} y={view[1]} width={view[2]} height={view[3]} fill="#fbf9f4" />
      {plan.rooms.filter((r) => !room || r.id === room.id).map((r) => (
        <rect key={r.id} x={r.r[0]} y={r.r[1]} width={r.r[2]} height={r.r[3]} fill={FILL[r.kind]} stroke={INK} strokeWidth={room?.id === r.id ? 4 : 3} strokeLinejoin="round" />
      ))}
      {plan.items
        .filter((it) => !room || ownerOf(plan, it) === room.id)
        .map((it, i) => (
          <Furniture key={i} it={it} />
        ))}
      {plan.rooms.map((r) => {
        if (room || r.hideLabel) return null;
        const [x, y, w, h] = r.r;
        const [lx, ly] = r.label ?? [x + w / 2, y + h / 2];
        const lines = [...(full && r.lines ? r.lines : [r.name]), r.size].filter(Boolean) as string[];
        const fs = full ? 10.5 : Math.max(8, view[2] / 24);
        const bw = Math.max(...lines.map((l) => l.length)) * fs * 0.58 + 12;
        return (
          <g key={`l-${r.id}`}>
            <rect x={lx - bw / 2} y={ly - fs} width={bw} height={lines.length * (fs + 3) + 4} rx="4" fill="#fbf9f4" opacity="0.92" />
            {lines.map((l, i) => (
              <text key={l} x={lx} y={ly + i * (fs + 3)} textAnchor="middle" fontSize={fs} fontWeight={i === 0 ? 700 : 500} fill={i === 0 ? INK : "#5d564b"}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
      {full &&
        plan.dims.map((d, i) => (
          <text key={i} x={d.x} y={d.y} textAnchor="middle" fontSize="9.5" fill="#7a7366" transform={d.rot ? `rotate(${d.rot} ${d.x} ${d.y})` : undefined}>
            {d.text}
          </text>
        ))}
      {full && plan.entrance && (
        <g>
          <path d={`M${plan.entrance.x - 16} ${plan.entrance.y + 6} h32`} stroke="#c99a3f" strokeWidth="4" strokeLinecap="round" />
          <text x={plan.entrance.x} y={plan.entrance.y + 20} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#a97d2a" letterSpacing="1.2">
            ENTRANCE
          </text>
        </g>
      )}
    </svg>
  );
}
