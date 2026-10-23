import { useRef } from 'react';
import Split from './Split';
import useScrollAnimation from '../hooks/useScrollAnimation';

const chips = ['Zoho Certified', 'Client-Focused', 'Automation Specialist', 'Freelance Available'];

export default function About() {
  const ref = useRef();
  useScrollAnimation(ref);
  return (
    <section id="about" className="sec" ref={ref}>
      <div className="container-xl">
        <div className="row align-items-center g-5">
          <div className="col-lg-4">
            <div className="photo" data-reveal>
              <div className="photo-in" data-parallax="-6">
                <img src="{`${import.meta.env.BASE_URL}profile.webp" width="420" height="420" loading="lazy" decoding="async" alt="Portrait of Dinesh Kumar, Zoho developer" />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <Split as="h2" text="Certified Zoho Creator developer, built around real business workflows." />
            <p data-reveal className="copy">I&rsquo;m a certified Zoho Creator Developer with 3 years of hands-on experience building business applications, automations and integrations across the Zoho ecosystem.</p>
            <p data-reveal className="copy">I work closely with businesses to understand their workflows, identify automation opportunities and build scalable solutions using Zoho applications. Beyond Zoho, I also provide Shopify development, website development and development for other platforms.</p>
            <div className="stats" data-reveal>
              <div><b data-count="3" data-suffix="+">3+</b><span>Years experience</span></div>
              <div><b data-count="30" data-suffix="+">30+</b><span>Zoho apps used</span></div>
              <div><b data-count="5" data-suffix="">5</b><span>Major solutions delivered</span></div>
            </div>
            <ul className="chips" data-reveal>{chips.map(c => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
