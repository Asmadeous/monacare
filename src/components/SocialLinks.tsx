import { FacebookLogo, Phone, WhatsappLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { social } from "@/content/site";

const icons = { whatsapp: WhatsappLogo, phone: Phone, facebook: FacebookLogo, x: XLogo };

/** WhatsApp, call and social links. A link the client hasn't sent yet shows as a placeholder, not a dead link. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {social.map((s) => {
        const Icon = icons[s.icon];
        const ring = "grid h-11 w-11 place-items-center rounded-full border border-current";
        return (
          <li key={s.label}>
            {s.href ? (
              <a
                href={s.href}
                aria-label={s.label}
                title={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${ring} transition-colors hover:bg-offwhite hover:text-teal`}
              >
                <Icon size={20} aria-hidden />
              </a>
            ) : (
              <span role="img" aria-label={`${s.label}, link to come`} title={`${s.label}: link to come`} className={`${ring} opacity-50`}>
                <Icon size={20} aria-hidden />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
