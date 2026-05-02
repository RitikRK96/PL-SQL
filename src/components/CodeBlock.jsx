import { useState, useRef } from 'react';

export default function CodeBlock({ label, children, copyable = true }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopy = () => {
    const text = preRef.current?.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="bg-code-bg border border-border rounded-[10px] overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-surface2 border-b border-border font-mono text-[0.7rem] text-muted">
        <span className="text-accent">{label}</span>
        {copyable && (
          <button
            className="cursor-pointer bg-transparent border border-border text-muted font-mono text-[0.65rem] px-2 py-0.5 rounded hover:text-text-main hover:border-text-main transition-all duration-150"
            onClick={handleCopy}
          >
            {copied ? 'copied!' : 'copy'}
          </button>
        )}
      </div>
      <pre ref={preRef} dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}
