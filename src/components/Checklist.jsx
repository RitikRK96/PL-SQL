import { useProgress } from '../context/ProgressContext';

export default function Checklist({ items }) {
  const { toggle, isChecked } = useProgress();
  return (
    <ul className="checklist">
      {items.map(item => (
        <li key={item.id}>
          <input
            type="checkbox"
            id={item.id}
            checked={isChecked(item.id)}
            onChange={() => toggle(item.id)}
          />
          <label htmlFor={item.id} dangerouslySetInnerHTML={{ __html: item.label }} />
        </li>
      ))}
    </ul>
  );
}
