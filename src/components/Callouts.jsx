export function AnalogyBox({ icon, children }) {
  return (
    <div className="bg-accent2/[0.07] border border-accent2/20 border-l-[3px] border-l-accent2 rounded-[10px] px-5 py-4 my-4 text-[0.87rem]">
      <strong className="text-accent2 text-[0.75rem] uppercase tracking-wider block mb-1">{icon}</strong>
      {children}
    </div>
  );
}

export function TipBox({ children }) {
  return (
    <div className="bg-accent/[0.07] border border-accent/20 border-l-[3px] border-l-accent rounded-[10px] px-5 py-4 my-4 text-[0.87rem]">
      <strong className="text-accent text-[0.75rem] uppercase tracking-wider block mb-1">💡 Developer Tip</strong>
      {children}
    </div>
  );
}

export function WarnBox({ title = '⚠️ Warning', children }) {
  return (
    <div className="bg-accent3/[0.07] border border-accent3/20 border-l-[3px] border-l-accent3 rounded-[10px] px-5 py-4 my-4 text-[0.87rem]">
      <strong className="text-accent3 text-[0.75rem] uppercase tracking-wider block mb-1">{title}</strong>
      {children}
    </div>
  );
}
