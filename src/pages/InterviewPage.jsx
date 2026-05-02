import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { ConceptCard } from '../components/Cards';
import InterviewCard from '../components/InterviewCard';
import Checklist from '../components/Checklist';
import SEO from '../components/SEO';

export default function InterviewPage() {
  return (
    <>
      <SEO 
        title="Top 20 Interview Questions" 
        path="/interview" 
        description="The top 20 most frequently asked Oracle SQL and PL/SQL interview questions, explained with clear answers to help you get hired."
      />
      <div className="mb-6">
        <Link to="/module/4" className="text-muted text-sm hover:text-accent transition-colors">← Module 4: Expert Level</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Interview <span className="text-purple">Preparation</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">Top 20 questions asked in Oracle/PL/SQL interviews</p>

      <InterviewCard
        badge="Interview Q"
        title="Q1 — Frequently Asked"
        question={`"Explain the difference between a stored procedure and a function."`}
        answer={`A function <strong>must return exactly one value</strong> and can be called inside SQL statements (SELECT, WHERE). A procedure does not have to return a value (uses OUT parameters instead) and cannot be used in SQL expressions. Use functions for computations, procedures for processes/business logic that perform DML.`}
      />

      <InterviewCard
        title="Q2"
        question={`"What is a cursor and why do we need it? What are cursor attributes?"`}
        answer={`A cursor is a pointer to the result set of a SQL query. We need it because PL/SQL's SELECT INTO only works for single-row results. For multi-row results, a cursor lets us iterate one row at a time.<br/><br/>Cursor attributes: <strong>%FOUND</strong> (last FETCH returned a row), <strong>%NOTFOUND</strong> (no more rows), <strong>%ROWCOUNT</strong> (rows fetched so far), <strong>%ISOPEN</strong> (cursor is open).`}
      />

      <InterviewCard
        title="Q3"
        question={`"What are the types of triggers? When would you NOT use a trigger?"`}
        answer={`Types: BEFORE/AFTER × INSERT/UPDATE/DELETE (row-level or statement-level), INSTEAD OF (on views), DDL triggers, Database event triggers.<br/><br/>Avoid triggers for: complex business logic (use procedures instead), operations that could cause cascading triggers (mutating table errors), logic that needs to be testable independently, or when they would make debugging difficult.`}
      />

      <InterviewCard
        title="Q4"
        question={`"Explain BULK COLLECT and FORALL. Give a real use case."`}
        answer={`BULK COLLECT retrieves multiple rows into a collection in a single round trip. FORALL sends a batch DML operation in a single round trip.<br/><br/>Use case: Year-end salary processing — BULK COLLECT all 50,000 employees, apply tiered bonus logic in PL/SQL, then FORALL UPDATE back. Instead of 50,000 round trips, you get 2.`}
      />

      <InterviewCard
        title="Q5"
        question={`"What is the difference between TRUNCATE and DELETE? Can you ROLLBACK a TRUNCATE?"`}
        answer={`DELETE is DML — removes rows one at a time, generates undo logs, can have WHERE clause, fires triggers, can be ROLLBACKed.<br/><br/>TRUNCATE is DDL — deallocates all data pages, much faster, no WHERE clause, doesn't fire row-level triggers, auto-COMMITs (cannot be rolled back). TRUNCATE also resets the high-water mark.`}
      />

      <hr className="border-border my-8" />

      <ConceptCard title="Top Interview Topics Checklist">
        <Checklist items={[
          { id: 'iv_1', label: 'Difference between SQL and PL/SQL' },
          { id: 'iv_2', label: 'Procedure vs Function differences' },
          { id: 'iv_3', label: 'Implicit vs Explicit Cursors' },
          { id: 'iv_4', label: 'INNER JOIN vs OUTER JOIN' },
          { id: 'iv_5', label: 'WHERE vs HAVING' },
          { id: 'iv_6', label: 'DELETE vs TRUNCATE vs DROP' },
          { id: 'iv_7', label: 'Exception types: predefined, user-defined, OTHERS' },
          { id: 'iv_8', label: 'Package Spec vs Package Body' },
          { id: 'iv_9', label: 'BULK COLLECT and FORALL use case' },
          { id: 'iv_10', label: 'Trigger types and WHEN to avoid them' },
          { id: 'iv_11', label: 'What is SQL Injection and how to prevent it' },
          { id: 'iv_12', label: '%TYPE vs %ROWTYPE and why they matter' },
          { id: 'iv_13', label: 'SAVEPOINT and nested transactions' },
          { id: 'iv_14', label: 'What is an index? When does it help / hurt?' },
          { id: 'iv_15', label: 'ROWNUM vs ROW_NUMBER() — pagination difference' },
        ]} />
      </ConceptCard>

      <div className="flex justify-between pt-8">
        <Link to="/module/4" className="font-heading font-bold text-muted hover:text-accent transition-colors no-underline">← Module 4</Link>
        <Link to="/project" className="inline-block font-heading font-bold text-accent bg-accent/10 border border-accent/30 px-8 py-3 rounded-[10px] hover:bg-accent/20 transition-colors no-underline">
          Next → Final Project
        </Link>
      </div>
    </>
  );
}
