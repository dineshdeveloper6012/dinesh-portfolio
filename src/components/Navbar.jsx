import { useEffect, useState } from 'react';
import $ from 'jquery';
import gsap from 'gsap';

const links = [['home', 'Home'], ['about', 'About'], ['expertise', 'Expertise'], ['projects', 'Projects'], ['services', 'Services'], ['contact', 'Contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => $('.site-nav').toggleClass('solid', $(window).scrollTop() > 40);
    $(window).on('scroll.nav', on); on();
    return () => { $(window).off('scroll.nav'); };
  }, []);
  const go = (e, id) => {
    e.preventDefault(); setOpen(false);
    gsap.to(window, { duration: 1, scrollTo: { y: '#' + id, offsetY: 64 }, ease: 'power3.inOut' });
  };
  return (
    <nav className={'site-nav navbar navbar-expand-lg fixed-top' + (open ? ' solid' : '')} aria-label="Primary">
      <div className="container-xl">
        <a className="navbar-brand" href="#home" onClick={e => go(e, 'home')}>Dinesh Kumar</a>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div id="nav-menu" className={'collapse navbar-collapse justify-content-end' + (open ? ' show' : '')}>
          <ul className="navbar-nav gap-lg-3">
            {links.map(([id, l]) => <li className="nav-item" key={id}><a className="nav-link" href={'#' + id} onClick={e => go(e, id)}>{l}</a></li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}
