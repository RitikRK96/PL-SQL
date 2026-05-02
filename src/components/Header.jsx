import { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';

const QUOTES = [
  "The only way to learn SQL is to write SQL. — Chris Date",
  "Data is the new oil — but only if you know how to refine it.",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Code is read more often than it is written. — Guido van Rossum",
  "The best error message is the one that never shows up.",
  "Simplicity is the soul of efficiency. — Austin Freeman",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Every expert was once a beginner. Keep going!",
  "A database is only as good as the queries that run on it.",
  "Learning PL/SQL is learning to think in sets, not loops.",
  "Debugging is twice as hard as writing code. — Brian Kernighan",
  "The function of good software is to make the complex appear simple.",
  "Don't comment bad code — rewrite it. — Brian Kernighan",
  "Premature optimization is the root of all evil. — Donald Knuth",
  "In theory, there's no difference between theory and practice.",
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

export default function Header() {
  const { userName, setUserName } = useProgress();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(userName);

  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  const handleSave = () => {
    setUserName(draft.trim());
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setEditing(false); setDraft(userName); }
  };

  return (
    <header className="fixed top-0 right-0 left-[270px] h-14 bg-surface/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-8 max-[800px]:left-0">
      {/* Quote */}
      <p className="text-[0.72rem] text-white italic truncate max-w-[60%] hidden sm:block">
        "{quote}"
      </p>

      {/* Greeting */}
      <div className="flex items-center justify-end gap-3 min-w-0 flex-1">
        {!userName && !editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-accent font-medium bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full hover:bg-accent/20 transition-colors cursor-pointer"
          >
            👋 What's your name?
          </button>
        ) : editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              placeholder="Enter your name..."
              className="bg-surface2 border border-border text-text-main text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-accent w-40 font-body"
            />
            <button
              onClick={handleSave}
              className="text-xs text-accent font-mono bg-accent/10 px-2 py-1 rounded cursor-pointer hover:bg-accent/20 transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">{getGreeting()},</span>
            <span
              className="text-sm font-semibold text-accent cursor-pointer hover:underline"
              onClick={() => { setEditing(true); setDraft(userName); }}
              title="Click to change name"
            >
              {userName} 👋
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
