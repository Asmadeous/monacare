
export const wrap = "mx-auto max-w-[1920px] px-5 md:px-10 xl:px-20";

/** Hairline between consecutive Off-White sections, so each break reads as deliberate. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={wrap} aria-hidden>
      <div className={`h-px bg-teal-20 ${className}`} />
    </div>
  );
}

export function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`type-label flex items-center gap-4 ${light ? "text-offwhite" : "text-teal"}`}>
      <span className="gold-thread w-10" />
      {children}
    </p>
  );
}
