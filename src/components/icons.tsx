import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import s from "./site.module.css";

export function WhatsAppLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.69L.57 23.3l5.67-1.49a11.36 11.36 0 0 0 5.8 1.48h.01c6.27 0 11.38-5.1 11.38-11.37 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  );
}

/** Horizontal lockup for the header and footer: the logo mark plus the name set in Archivo, like the logo's wordmark. */
export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link className={s.brand} href="/" aria-label={`${SITE.name}, home`} onClick={onClick}>
      <Image src="/brand/mark-dark.png" alt="" width={583} height={760} className={s.brandMark} priority />
      <span className={s.brandText}>
        <b>Ali Zeeshan</b>
        <small>Enterprises</small>
      </span>
    </Link>
  );
}
