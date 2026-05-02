import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { Chip } from '../components/Cards';
import { TipBox } from '../components/Callouts';
import CodeBlock from '../components/CodeBlock';
import Checklist from '../components/Checklist';

export default function ProjectPage() {
  return (
    <>
      <div className="mb-6">
        <Link to="/interview" className="text-muted text-sm hover:text-accent transition-colors">← Interview Prep</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Final <span className="text-accent">Capstone Project</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">Apply everything you've learned in one real-world system</p>

      <div className="bg-gradient-to-br from-accent/[0.08] to-accent2/[0.06] border border-accent/25 rounded-[10px] p-8">
        <h3 className="font-heading text-[1.4rem] font-extrabold text-accent mb-3">🏦 Banking Transaction Management System</h3>
        <p className="text-[0.9rem] text-muted mb-5 leading-relaxed">
          Build a complete bank account management system using PL/SQL. This project covers every concept from the course in a real-world scenario.
        </p>

        <h4 className="font-heading text-base font-bold mb-3 text-accent2">Schema to Create:</h4>
        <CodeBlock label="SQL — Schema" copyable={true}>{`<span class="kw">CREATE TABLE</span> customers (
    customer_id  <span class="type">NUMBER</span>        <span class="kw">PRIMARY KEY</span>,
    full_name    <span class="type">VARCHAR2</span>(<span class="num">100</span>) <span class="kw">NOT NULL</span>,
    email        <span class="type">VARCHAR2</span>(<span class="num">150</span>) <span class="kw">UNIQUE</span>,
    phone        <span class="type">VARCHAR2</span>(<span class="num">15</span>),
    created_at   <span class="type">DATE</span>          <span class="kw">DEFAULT</span> <span class="fn">SYSDATE</span>
);

<span class="kw">CREATE TABLE</span> accounts (
    account_id   <span class="type">NUMBER</span>        <span class="kw">PRIMARY KEY</span>,
    customer_id  <span class="type">NUMBER</span>        <span class="kw">REFERENCES</span> customers,
    account_type <span class="type">VARCHAR2</span>(<span class="num">10</span>)  <span class="kw">CHECK</span>(account_type <span class="kw">IN</span>(<span class="str">'SAVINGS'</span>,<span class="str">'CURRENT'</span>)),
    balance      <span class="type">NUMBER</span>(<span class="num">15</span>,<span class="num">2</span>)  <span class="kw">DEFAULT</span> <span class="num">0</span>,
    status       <span class="type">VARCHAR2</span>(<span class="num">10</span>)  <span class="kw">DEFAULT</span> <span class="str">'ACTIVE'</span>,
    opened_date  <span class="type">DATE</span>          <span class="kw">DEFAULT</span> <span class="fn">SYSDATE</span>
);

<span class="kw">CREATE TABLE</span> transactions (
    txn_id       <span class="type">NUMBER</span>        <span class="kw">PRIMARY KEY</span>,
    account_id   <span class="type">NUMBER</span>        <span class="kw">REFERENCES</span> accounts,
    txn_type     <span class="type">VARCHAR2</span>(<span class="num">10</span>)  <span class="kw">CHECK</span>(txn_type <span class="kw">IN</span>(<span class="str">'DEPOSIT'</span>,<span class="str">'WITHDRAW'</span>,<span class="str">'TRANSFER'</span>)),
    amount       <span class="type">NUMBER</span>(<span class="num">15</span>,<span class="num">2</span>),
    balance_after <span class="type">NUMBER</span>(<span class="num">15</span>,<span class="num">2</span>),
    description  <span class="type">VARCHAR2</span>(<span class="num">200</span>),
    txn_date     <span class="type">TIMESTAMP</span>     <span class="kw">DEFAULT</span> <span class="fn">SYSTIMESTAMP</span>
);`}</CodeBlock>

        <h4 className="font-heading text-base font-bold mb-3 mt-8 text-accent2">What to Build (Milestones):</h4>
        <Checklist items={[
          { id: 'fp_1', label: '<strong>Milestone 1:</strong> Create schema, populate with 10 customers, 15 accounts, 30+ transactions.' },
          { id: 'fp_2', label: '<strong>Milestone 2:</strong> Write a PACKAGE <code class="text-accent2 font-mono">bank_ops</code> with: OPEN_ACCOUNT, DEPOSIT, WITHDRAW, TRANSFER_FUNDS, CLOSE_ACCOUNT.' },
          { id: 'fp_3', label: '<strong>Milestone 3:</strong> WITHDRAW must raise exception if balance insufficient. TRANSFER must be atomic.' },
          { id: 'fp_4', label: '<strong>Milestone 4:</strong> Create a TRIGGER that logs every account status change to ACCOUNT_AUDIT.' },
          { id: 'fp_5', label: '<strong>Milestone 5:</strong> Write FUNCTION GET_ACCOUNT_SUMMARY(account_id) returning formatted string.' },
          { id: 'fp_6', label: '<strong>Milestone 6:</strong> Write GENERATE_MONTHLY_STATEMENT using BULK COLLECT.' },
          { id: 'fp_7', label: '<strong>Milestone 7:</strong> Write SQL report: "Top 5 customers by total deposits in last 30 days".' },
          { id: 'fp_8', label: '<strong>BONUS:</strong> Add interest calculation — monthly 4% p.a. to SAVINGS accounts using FORALL.' },
        ]} />

        <TipBox>
          Don't start coding immediately. First: (1) Draw the ERD on paper. (2) List all business rules. (3) Design the package spec first (just the signatures). (4) Write test cases BEFORE implementation. (5) Implement one procedure at a time. This is how real developers think.
        </TipBox>
      </div>

      <div className="mt-8">
        <Checklist items={[
          { id: 'fin_1', label: 'Completed the full Banking System project' },
          { id: 'fin_2', label: 'Code reviewed and all edge cases handled' },
          { id: 'fin_3', label: 'Can explain every line of your code confidently' },
          { id: 'fin_4', label: 'Ready to demo in a job interview' },
        ]} />
      </div>

      {/* Congratulations */}
      <div className="text-center py-12 mt-12 border-t border-border">
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="font-heading text-[1.8rem] font-extrabold text-accent mb-2">You Did It.</h2>
        <p className="text-muted max-w-[500px] mx-auto text-[0.9rem] leading-relaxed">
          Completing this curriculum means you've gone from zero to covering every concept a PL/SQL developer uses on the job. Keep building, keep practicing, and never stop asking "why does this work this way?"
        </p>
        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          <Chip color="gold">SQL Master</Chip>
          <Chip color="cyan">PL/SQL Developer</Chip>
          <Chip color="purple">Package Architect</Chip>
          <Chip color="green">Performance Aware</Chip>
          <Chip color="red">Interview Ready</Chip>
        </div>
      </div>

      <div className="pt-8">
        <Link to="/" className="font-heading font-bold text-muted hover:text-accent transition-colors no-underline">← Back to Course Overview</Link>
      </div>
    </>
  );
}
