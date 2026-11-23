/** Recurring graphic motif: solid black figure holding a red pod (as in the logo). */
export function Silhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="196 128 150 360"
      className={className}
      role="img"
      aria-label="Silueta sosteniendo un pod rojo"
    >
      <g fill="#000" stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        <polygon stroke="none" points="222,208 212,172 230,186 230,148 246,178 256,134 268,176 284,146 284,186 300,166 292,208" />
        <circle cx="256" cy="238" r="38" stroke="none" />
        <rect x="220" y="272" width="72" height="72" rx="16" stroke="none" />
        <path d="M212 284 L212 345" strokeWidth="22" fill="none" />
        <path d="M300 284 L300 345" strokeWidth="22" fill="none" />
        <path d="M240 340 L240 480" strokeWidth="26" fill="none" />
        <path d="M272 340 L272 480" strokeWidth="26" fill="none" />
      </g>
      <g transform="translate(322 338) rotate(14)">
        <rect x="-10" y="-62" width="20" height="74" rx="5" fill="#e10600" />
        <rect x="-6" y="-74" width="12" height="14" rx="3" fill="#7d0b10" />
        <rect x="-6" y="-56" width="4" height="60" rx="2" fill="#ff7a7e" opacity=".7" />
      </g>
    </svg>
  );
}
