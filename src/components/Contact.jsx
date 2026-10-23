import { useRef } from 'react';
import Split from './Split';
import SocialLinks from './SocialLinks';
import { CONTACT } from '../data/contact';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Contact() {
  const ref = useRef();
  useScrollAnimation(ref);
  return (
    <section id="contact" className="sec contact" ref={ref}>
      <div className="container-xl">
        <Split as="h2" text="Let&rsquo;s automate your business." />
        <p className="copy" data-reveal>Have a business process that can be improved, automated or connected? Let&rsquo;s talk.</p>
        <dl className="cd" data-reveal>
          <dt>Phone</dt><dd><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd>
          <dt>WhatsApp</dt><dd><a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">{CONTACT.whatsapp}</a></dd>
          <dt>Email</dt><dd><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a></dd>
          <dt>LinkedIn</dt><dd><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a></dd>
        </dl>
        <div className="final">
          <Split as="h2" className="big" text="Ready to automate what&rsquo;s next?" />
          <p className="copy" data-reveal>Let&rsquo;s turn your business processes into smarter, connected workflows.</p>
          <div className="d-flex flex-wrap gap-3 mb-4" data-reveal>
            <a className="btn btn-brand" href={'mailto:' + CONTACT.email}>Start a Conversation</a>
            <a className="btn btn-ghost" href="#projects">View My Projects</a>
          </div>
          <SocialLinks inline />
        </div>
        <footer className="foot"><b>Dinesh Kumar</b><span>Zoho Developer</span><span>Available for Freelance Projects</span></footer>
      </div>
    </section>
  );
}
