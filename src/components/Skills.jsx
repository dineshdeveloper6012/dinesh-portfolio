import { skills, groups } from '../data/skills';

/* Three always-visible clusters; hovering one softly dims the others (no hover needed to read anything) */
export default function Skills() {
  return (
    <div className="skills" data-reveal>
      <h3>Core skills</h3>
      <div className="sgroups">
        {Object.entries(groups).map(([k, label]) => (
          <div className="sgroup" key={k}>
            <h4>{label}</h4>
            <ul className="chips">{skills.filter(s => s[1] === k).map(([n]) => <li key={n}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
