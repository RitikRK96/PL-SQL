import { useState } from 'react';

export default function InterviewCard({ badge = 'Interview Q', title, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple/10 to-accent/5 border border-purple/30 rounded-[10px] p-6 my-6">
      <h4 className="font-heading text-[0.88rem] font-bold text-purple mb-3 flex items-center gap-2">
        <span className="bg-purple text-white text-[0.6rem] font-mono px-2 py-px rounded-full uppercase tracking-wide">
          {badge}
        </span>
        {title}
      </h4>
      <p className="text-[0.88rem]">{question}</p>
      <div
        className="mt-2 cursor-pointer text-[0.78rem] text-accent font-mono select-none inline-flex items-center gap-1 hover:underline"
        onClick={() => setOpen(!open)}
      >
        {open ? '▼ Hide Answer' : '▶ Show Answer'}
      </div>
      {open && (
        <div className="mt-3 text-[0.87rem] text-text-main leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
      )}
    </div>
  );
}
