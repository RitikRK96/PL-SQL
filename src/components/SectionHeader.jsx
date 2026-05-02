export default function SectionHeader({ num, title, sub }) {
  return (
    <div className="flex items-start gap-5 mb-8">
      <span className="font-mono text-[0.7rem] text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded mt-1 whitespace-nowrap shrink-0">
        {num}
      </span>
      <div>
        <h2 className="font-heading text-[1.6rem] font-extrabold tracking-tight leading-tight">{title}</h2>
        {sub && <div className="text-muted text-[0.85rem] mt-1">{sub}</div>}
      </div>
    </div>
  );
}
