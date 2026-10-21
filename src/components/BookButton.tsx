"use client";

import { site } from "@/content/site";
import ConsultationForm from "./ConsultationForm";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogTrigger,
  useMorphingDialog,
} from "./ui/morphing-dialog";
import { cn } from "@/lib/utils";

/**
 * "Book a consultation": the button morphs into the booking form (Motion Primitives Morphing Dialog).
 * `interest` preselects a programme. `variant="link"` renders as an underlined text link.
 */
export default function BookButton({
  children = "Book a consultation",
  interest = "",
  className,
  variant = "primary",
}: {
  children?: React.ReactNode;
  interest?: string;
  className?: string;
  variant?: "primary" | "light" | "link";
}) {
  const look = {
    primary: "btn bg-teal text-offwhite hover:bg-teal-80",
    light: "btn bg-offwhite text-teal hover:bg-white",
    link: "link text-left",
  }[variant];

  return (
    <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: 0.45 }}>
      <MorphingDialogTrigger className={cn(look, className)} label={typeof children === "string" ? children : "Book a consultation"}>
        {children}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative flex h-full w-full flex-col overflow-y-auto bg-white text-teal sm:h-auto sm:max-h-[calc(100dvh-4rem)] sm:w-[min(40rem,calc(100vw-4rem))]">
          <div className="border-b border-teal-20 px-6 py-5 pr-16 sm:px-10 sm:py-7">
            <MorphingDialogTitle>
              <h2 className="type-h2">Request a consultation</h2>
            </MorphingDialogTitle>
            <p className="type-caption mt-1">Sixty minutes with a specialist. We reply within one working day.</p>
            <p className="type-caption mt-1">
              Open {site.hours}. Prefer to call?{" "}
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="link">
                {site.phone}
              </a>
            </p>
          </div>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <FormWithClose interest={interest} />
          </div>
          <MorphingDialogClose className="top-5 right-5 grid h-11 w-11 place-items-center rounded-[8px] text-teal hover:bg-teal-10 sm:top-7 sm:right-7" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

function FormWithClose({ interest }: { interest: string }) {
  const { setIsOpen } = useMorphingDialog();
  return <ConsultationForm interest={interest} onClose={() => setIsOpen(false)} />;
}
