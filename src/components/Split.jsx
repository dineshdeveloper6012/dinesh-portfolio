import { Fragment } from 'react';
/* SplitText-style word/char masks rendered by React (no DOM mutation, so cleanup is safe).
   Word spaces live BETWEEN the inline-block masks: whitespace inside an inline-block collapses and used to vanish. */
export default function Split({ text, as: T = 'span', chars = false, className = '' }) {
  return (
    <T className={className} aria-label={text} data-split={chars ? 'c' : 'w'}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="sw" aria-hidden="true">
            <span className="si">{chars ? [...w].map((c, j) => <span key={j} className="sc">{c}</span>) : w}</span>
          </span>
        </Fragment>
      ))}
    </T>
  );
}
