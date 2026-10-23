/* Small stroke-icon set (24x24). Extra keys (solar, users, cart) are ready for future projects. */
const P = {
  health: <><path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" /><path d="M6 12h3l1.5-2.5 3 5 1.5-2.5h3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18M9 15l2 2 4-4" /></>,
  bot: <><path d="M4 5h16v11h-9l-5 4v-4H4z" /><path d="M12 8l.9 2.1L15 11l-2.1.9L12 14l-.9-2.1L9 11l2.1-.9z" /></>,
  factory: <><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><path d="M7 18h1M12 18h1M17 18h1" /></>,
  workflow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M6 9v3a3 3 0 0 0 3 3h6" /></>,
  solar: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21M17 4.5a3.5 3.5 0 0 1 0 7M22 21v-1.5a5 5 0 0 0-3-4.6" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2l2-8H6.5" /><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></>
};
export default function Icon({ name, size = 22 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[name]}</svg>;
}
