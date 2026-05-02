import { useState } from 'react';
import Checklist from './Checklist';
import CodeBlock from './CodeBlock';

export default function PracticeSection({ title, items, answerLabel, answerContent }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-surface2 border border-border rounded-[10px] p-6 mt-6">
      <h4 className="font-heading text-[0.9rem] font-bold text-purple mb-4 flex items-center gap-1.5 before:content-['✦'] before:text-[0.7rem]">
        {title}
      </h4>
      <Checklist items={items} />
      {answerLabel && (
        <>
          <div
            className="mt-2 cursor-pointer text-[0.78rem] text-accent font-mono select-none inline-flex items-center gap-1 hover:underline"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '▼ Hide Answer' : `▶ ${answerLabel}`}
          </div>
          {showAnswer && answerContent && (
            <div className="mt-3">
              {typeof answerContent === 'string' ? (
                <CodeBlock label="SQL — Answer">{answerContent}</CodeBlock>
              ) : (
                answerContent
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
