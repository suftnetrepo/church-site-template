export function FoodBankIllustration({ large = false }: { large?: boolean }) {
  if (large) {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a basket of bread and produce" className="w-full h-full">
        <rect width="400" height="500" fill="#E6EBDD" />
        <path d="M120 250 Q120 200 200 200 Q280 200 280 250" stroke="#F4E3C1" strokeWidth="7" fill="none" opacity="0.8" />
        <path d="M95 260 L305 260 L275 400 Q200 424 125 400 Z" fill="#4A5B40" />
        <g stroke="#F4E3C1" strokeWidth="3" opacity="0.4">
          <path d="M104 288 L296 288" />
          <path d="M110 320 L290 320" />
          <path d="M118 352 L282 352" />
          <path d="M128 384 L272 384" />
        </g>
        <ellipse cx="165" cy="222" rx="46" ry="28" fill="#E8D4A0" />
        <circle cx="235" cy="232" r="24" fill="#D9A441" />
        <circle cx="272" cy="252" r="19" fill="#8C6420" />
        <circle cx="205" cy="256" r="17" fill="#D9A441" opacity="0.9" />
        <circle cx="150" cy="260" r="15" fill="#71875F" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a basket of bread and produce" className="w-full h-full">
      <path d="M150 78 Q150 58 200 58 Q250 58 250 78" stroke="#F4E3C1" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M140 82 L260 82 L248 128 Q200 136 152 128 Z" fill="#3E4E37" opacity="0.55" />
      <g stroke="#F4E3C1" strokeWidth="1.4" opacity="0.4">
        <path d="M144 92 L256 92" />
        <path d="M147 104 L253 104" />
        <path d="M150 116 L250 116" />
      </g>
      <ellipse cx="185" cy="66" rx="20" ry="12" fill="#E8D4A0" />
      <circle cx="220" cy="70" r="10" fill="#D9A441" opacity="0.9" />
      <circle cx="238" cy="76" r="8" fill="#8C6420" opacity="0.85" />
      <circle cx="205" cy="78" r="7" fill="#D9A441" opacity="0.8" />
    </svg>
  );
}
