export function ConceptCard({ title, children }) {
  return (
    <div className="bg-surface border border-border rounded-[10px] p-6 mb-5">
      {title && (
        <h3 className="font-heading text-base font-bold mb-3 text-accent2">{title}</h3>
      )}
      <div className="text-[0.88rem] text-text-main leading-relaxed">{children}</div>
    </div>
  );
}

export function Chip({ color = 'gold', children }) {
  const colors = {
    gold: 'text-accent border-accent/40 bg-accent/[0.07]',
    cyan: 'text-accent2 border-accent2/40 bg-accent2/[0.07]',
    purple: 'text-purple border-purple/40 bg-purple/[0.07]',
    green: 'text-green border-green/40 bg-green/[0.07]',
    red: 'text-accent3 border-accent3/40 bg-accent3/[0.07]',
  };
  return (
    <span className={`inline-block font-mono text-[0.7rem] px-2.5 py-0.5 rounded-full border mx-0.5 ${colors[color] || colors.gold}`}>
      {children}
    </span>
  );
}

export function ProjectCard({ children }) {
  return (
    <div className="bg-gradient-to-br from-accent/[0.08] to-accent2/[0.06] border border-accent/25 rounded-[10px] p-8 mt-6">
      {children}
    </div>
  );
}
