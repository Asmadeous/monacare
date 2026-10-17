"use client";

/**
 * Intro with two tabs, after lpas.com's BlockIntroDouble (script-BuM9p9KM.js and its stylesheet):
 *  - a header row of tab buttons with a hairline below and an underline that slides to the active tab's
 *    width and position over 0.3s (lpas also greys out the inactive tab; tinted text is not used here);
 *  - the first tab: a large statement, then the main text in two columns, offset to the right;
 *  - the second tab: details. Switching resizes the block over 0.3s while the panels cross-fade (0.2s).
 * With no details, only the first tab shows.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { wrap } from "../ui";
import { FadeInUp } from "../ui/appear";

export function IntroDouble({
  tabs,
  statement,
  text,
  details,
}: {
  tabs: [string] | [string, string];
  statement: string;
  text?: string;
  details?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [line, setLine] = useState({ left: 0, width: 0 });
  const [height, setHeight] = useState<number | undefined>(undefined);

  const measure = () => {
    const b = buttons.current[active];
    if (b) setLine({ left: b.offsetLeft, width: b.offsetWidth });
    const p = panels.current[active];
    if (p) setHeight(p.offsetHeight);
  };
  useLayoutEffect(measure, [active]);
  // Re-measure when the panel's own size changes (fonts loading, window resizing)
  useEffect(() => {
    const p = panels.current[active];
    if (!p) return;
    const ro = new ResizeObserver(measure);
    ro.observe(p);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  });

  return (
    <section className="my-20 overflow-clip bg-offwhite md:my-24">
      <div className={wrap}>
        <FadeInUp className="relative mb-10 border-b border-teal-20 py-4">
          <div role="tablist" className="relative flex w-fit gap-20">
            {tabs.map((t, i) => (
              <button
                key={t}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="type-label -my-3 min-h-11 text-teal"
              >
                {t}
              </button>
            ))}
            <span
              className="absolute -bottom-[17px] h-px bg-teal transition-[left,width] duration-300"
              style={{ left: line.left, width: line.width }}
              aria-hidden
            />
          </div>
        </FadeInUp>

        <div className="relative transition-[height] duration-300" style={{ height }}>
          <div
            ref={(el) => {
              panels.current[0] = el;
            }}
            role="tabpanel"
            className="absolute inset-x-0 top-0 grid transition-opacity duration-200 md:grid-cols-12 md:gap-x-6"
            style={{ opacity: active === 0 ? 1 : 0, pointerEvents: active === 0 ? "auto" : "none", transitionDelay: active === 0 ? "0.3s" : "0s" }}
            aria-hidden={active !== 0}
          >
            <FadeInUp order={1} as="p" className="type-h1 text-teal md:col-span-10 xl:col-span-9">
              {statement}
            </FadeInUp>
            {text && (
              <FadeInUp
                order={2}
                // lpas sets the main text in two columns; short text stays in one so a column is never a single line
                className={`mt-12 text-[1rem] leading-[1.625rem] text-teal md:col-span-8 md:col-start-5 md:mt-16 xl:col-span-6 xl:col-start-7 ${text.length > 320 ? "sm:columns-2 sm:gap-8" : "max-w-[60ch]"}`}
              >
                <p>{text}</p>
              </FadeInUp>
            )}
          </div>
          {details && tabs[1] && (
            <div
              ref={(el) => {
                panels.current[1] = el;
              }}
              role="tabpanel"
              className="absolute inset-x-0 top-0 transition-opacity duration-200"
              style={{ opacity: active === 1 ? 1 : 0, pointerEvents: active === 1 ? "auto" : "none", transitionDelay: active === 1 ? "0.3s" : "0s" }}
              aria-hidden={active !== 1}
            >
              {details}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
