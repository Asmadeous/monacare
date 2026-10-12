// Graphic language from the brand guidelines. Every element is drawn from the symbol:
// the frond field (fronds repeated from a central spine, cropped at edges, 10–20% opacity)
// and the frond line (one sweeping curve from a palm frond). One device per layout.

export function FrondField({ className = "" }: { className?: string }) {
  const rows = Array.from({ length: 12 }, (_, i) => i * 110 - 40);
  return (
    <svg viewBox="0 0 600 1240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
        <path d="M300 0V1240" vectorEffect="non-scaling-stroke" />
        {rows.map((y) => (
          <g key={y}>
            <path d={`M0 ${y + 70}C110 ${y - 30} 230 ${y - 20} 300 ${y + 64}`} vectorEffect="non-scaling-stroke" />
            <path d={`M300 ${y + 64}C370 ${y - 20} 490 ${y - 30} 600 ${y + 70}`} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function FrondLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className={className} aria-hidden fill="none">
      <path
        d="M40 360C260 120 560 40 1000 150"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
