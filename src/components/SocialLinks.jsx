import { useState } from 'react';
import { CONTACT } from '../data/contact';

const I = {
  whatsapp: <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm4 11.5c-.2.6-1.2 1.1-1.7 1.1-.4 0-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.1 0 .3 0 .5l-.4.5c-.1.1-.2.3-.1.5.5.8 1.1 1.5 2 2 .8.5 1.2.5 1.4.3l.7-.9c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1z" />,
  email: <path d="M3 6h18v12H3zM3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  phone: <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.6 3.6a1 1 0 0 1-.25 1z" />,
  linkedin: <path d="M5 9h3v10H5zM6.5 4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h2.9v1.4c.5-.9 1.6-1.6 3.1-1.6 3 0 3.5 2 3.5 4.5V19h-3v-5c0-1.2 0-2.6-1.7-2.600S13 12.7 13 14v5h-3z" />
};
const items = [ // [key, label, text, href, brand colour]
  ['whatsapp', 'WhatsApp', CONTACT.whatsapp, CONTACT.whatsappHref, '#25D366'],
  ['phone', 'Phone', CONTACT.phone, CONTACT.phoneHref, '#334E7A'],
  ['email', 'Email', CONTACT.email, 'mailto:' + CONTACT.email, '#EA4335'],
  ['linkedin', 'LinkedIn', 'LinkedIn', CONTACT.linkedin, '#0A66C2']
];

export default function SocialLinks({ inline = false }) {
  const [open, setOpen] = useState(null);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  const narrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 575.98px)').matches; // phone bar: tap opens the link directly
  return (
    <div className={'socials' + (inline ? ' inline' : '')} role="group" aria-label="Contact links">
      {items.map(([k, label, text, href, col]) => (
        <a key={k} href={href} className={'soc' + (open === k ? ' open' : '')} aria-label={`${label}: ${text}`}
          style={{ '--sc': col }} target={k === 'whatsapp' || k === 'linkedin' ? '_blank' : undefined} rel="noopener noreferrer"
          onClick={e => { if (!inline && !canHover && !narrow && open !== k) { e.preventDefault(); setOpen(k); } }}
          onBlur={() => setOpen(null)}>
          <span className="soc-ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{I[k]}</svg></span>
          <span className="soc-tx">{text}</span>
        </a>
      ))}
    </div>
  );
}
