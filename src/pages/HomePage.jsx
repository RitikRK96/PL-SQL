import { Link } from 'react-router-dom';
import { ConceptCard, Chip } from '../components/Cards';
import Checklist from '../components/Checklist';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Zero to Job-Ready" 
        path="/" 
        description="A complete PL/SQL Masterclass covering SQL fundamentals, cursors, packages, performance tuning, and an interview guide."
      />
      {/* HERO */}
      <div className="pb-10 border-b border-border mb-12">
        <div className="inline-block font-mono text-[0.7rem] text-accent2 border border-accent2 px-2.5 py-0.5 rounded-full mb-4 tracking-wide">
          // COMPLETE LEARNING TRACK
        </div>
        <h1 className="font-heading text-[2.8rem] font-extrabold leading-[1.1] tracking-tighter mb-4">
          Master <span className="text-accent">PL/SQL</span><br />
          From Zero to<br />
          Job-Ready
        </h1>
        <p className="text-muted max-w-[580px] text-[0.95rem] leading-relaxed">
          A structured, mentor-guided curriculum covering every concept you need — from your first SELECT query to advanced performance tuning. Built for absolute beginners aiming for professional-level mastery.
        </p>
        <div className="flex gap-8 mt-8 pt-6 border-t border-border">
          {[
            { num: '4', label: 'Modules' },
            { num: '17', label: 'Topics' },
            { num: '50+', label: 'Code Examples' },
            { num: '40+', label: "Practice Q's" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-[1.6rem] font-extrabold text-accent">{s.num}</div>
              <div className="text-[0.7rem] text-muted uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROADMAP */}
      <div className="mb-16 pb-12 border-b border-border">
        <SectionHeader num="ROADMAP" title="Your Learning Path" sub="Follow this sequence for maximum retention" />
        <div className="roadmap">
          {[
            { title: 'Week 1–2 — SQL Fundamentals', desc: 'SELECT, INSERT, UPDATE, DELETE, JOINs, Aggregations, Subqueries' },
            { title: 'Week 3–4 — PL/SQL Core', desc: 'Blocks, Variables, Control Flow, Loops, Basic Queries inside PL/SQL' },
            { title: 'Week 5–6 — Cursors & Exception Handling', desc: 'Explicit/Implicit Cursors, Named Exceptions, RAISE, SQLCODE, SQLERRM' },
            { title: 'Week 7–8 — Procedures, Functions, Triggers & Packages', desc: 'Reusable code units, business logic layer, database event automation' },
            { title: 'Week 9–10 — Advanced & Project', desc: 'Bulk Collect, FORALL, Dynamic SQL, Performance Tuning, Final Project' },
          ].map((item, i) => (
            <div key={i} className="roadmap-item">
              <h5 className="font-heading text-[0.9rem] font-bold mb-0.5">{item.title}</h5>
              <p className="text-[0.82rem] text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ENVIRONMENT SETUP */}
      <div className="mb-16 pb-12 border-b border-border" id="setup">
        <SectionHeader num="SETUP" title="Environment Setup" sub="Get your tools ready before writing a single line" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ConceptCard title="Option 1 — Oracle LiveSQL (Recommended)">
            <p>Free, browser-based Oracle SQL environment. No installation needed. Go to <strong>livesql.oracle.com</strong> and sign up.</p>
          </ConceptCard>
          <ConceptCard title="Option 2 — Oracle XE (Local)">
            <p>Download Oracle Database Express Edition (free). Install <strong>SQL*Plus</strong> or <strong>SQL Developer</strong> (GUI tool).</p>
          </ConceptCard>
          <ConceptCard title="Option 3 — Docker">
            <p>Run Oracle XE in a container: <code className="text-accent2 font-mono text-[0.78rem]">docker run -d -p 1521:1521 ...</code></p>
          </ConceptCard>
        </div>

        <Checklist items={[
          { id: 's1', label: 'Create Oracle LiveSQL account at livesql.oracle.com' },
          { id: 's2', label: 'Run your first SQL query: SELECT * FROM DUAL;' },
          { id: 's3', label: 'Explore the sample HR schema tables (EMPLOYEES, DEPARTMENTS)' },
        ]} />
      </div>

      {/* RESOURCES */}
      <div className="mb-16 pb-12 border-b border-border" id="resources">
        <SectionHeader num="RESOURCES" title="Tools & Learning Resources" sub="Everything you need, curated and rated" />

        <table>
          <thead>
            <tr><th>Resource</th><th>Type</th><th>Cost</th><th>Best For</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Oracle LiveSQL</strong> — livesql.oracle.com</td><td><Chip color="cyan">Online IDE</Chip></td><td><Chip color="green">FREE</Chip></td><td>Practice & experiments</td></tr>
            <tr><td><strong>Oracle SQL Developer</strong></td><td><Chip color="cyan">Desktop IDE</Chip></td><td><Chip color="green">FREE</Chip></td><td>Full development</td></tr>
            <tr><td><strong>Oracle Docs</strong> — docs.oracle.com</td><td><Chip color="gold">Documentation</Chip></td><td><Chip color="green">FREE</Chip></td><td>Official reference</td></tr>
            <tr><td><strong>Oracle Database 19c PL/SQL Language Reference</strong></td><td><Chip color="gold">Manual</Chip></td><td><Chip color="green">FREE PDF</Chip></td><td>Deep dives</td></tr>
            <tr><td><strong>Udemy — Oracle SQL & PL/SQL</strong></td><td><Chip color="purple">Video Course</Chip></td><td><Chip color="red">Paid (~$15)</Chip></td><td>Structured learning</td></tr>
            <tr><td><strong>w3resource.com/oracle</strong></td><td><Chip color="cyan">Exercises</Chip></td><td><Chip color="green">FREE</Chip></td><td>Practice problems</td></tr>
            <tr><td><strong>plsql.co.uk</strong></td><td><Chip color="cyan">Tutorials</Chip></td><td><Chip color="green">FREE</Chip></td><td>Quick references</td></tr>
            <tr><td><strong>Stack Overflow</strong></td><td><Chip color="purple">Community</Chip></td><td><Chip color="green">FREE</Chip></td><td>Debugging help</td></tr>
            <tr><td><strong>"Oracle PL/SQL Programming"</strong> — Steven Feuerstein</td><td><Chip color="gold">Book</Chip></td><td><Chip color="red">Paid</Chip></td><td>The definitive bible</td></tr>
            <tr><td><strong>asktom.oracle.com</strong></td><td><Chip color="cyan">Q&A Forum</Chip></td><td><Chip color="green">FREE</Chip></td><td>Expert answers</td></tr>
          </tbody>
        </table>
      </div>

      {/* Module Navigation Cards */}
      <div className="mb-16">
        <SectionHeader num="MODULES" title="Start Learning" sub="Choose a module to begin" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/module/1" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-accent transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(240,165,0,0.08)]">
            <div className="font-mono text-[0.7rem] text-accent uppercase tracking-widest mb-2">01</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">SQL Basics</h3>
            <p className="text-[0.82rem] text-muted">SELECT, DDL, DML, JOINs, Aggregations</p>
          </Link>
          <Link to="/module/2" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-accent2 transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(62,207,207,0.08)]">
            <div className="font-mono text-[0.7rem] text-accent2 uppercase tracking-widest mb-2">02</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">PL/SQL Foundations</h3>
            <p className="text-[0.82rem] text-muted">Blocks, Variables, Control Flow, Loops</p>
          </Link>
          <Link to="/module/3" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-purple transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(139,110,255,0.08)]">
            <div className="font-mono text-[0.7rem] text-purple uppercase tracking-widest mb-2">03</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">Advanced PL/SQL</h3>
            <p className="text-[0.82rem] text-muted">Cursors, Exceptions, Procedures, Triggers</p>
          </Link>
          <Link to="/module/4" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-green transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(76,175,130,0.08)]">
            <div className="font-mono text-[0.7rem] text-green uppercase tracking-widest mb-2">04</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">Expert Level</h3>
            <p className="text-[0.82rem] text-muted">Collections, Bulk Ops, Dynamic SQL, Perf</p>
          </Link>
          <Link to="/interview" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-purple transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(139,110,255,0.08)]">
            <div className="font-mono text-[0.7rem] text-purple uppercase tracking-widest mb-2">⚡</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">Interview Prep</h3>
            <p className="text-[0.82rem] text-muted">Top 20 questions asked in PL/SQL interviews</p>
          </Link>
          <Link to="/project" className="group block bg-surface border border-border rounded-[10px] p-6 hover:border-accent transition-all duration-200 no-underline hover:translate-y-[-2px] hover:shadow-[0_4px_24px_rgba(240,165,0,0.08)]">
            <div className="font-mono text-[0.7rem] text-accent uppercase tracking-widest mb-2">🏦</div>
            <h3 className="font-heading text-lg font-bold text-text-main mb-1">Final Project</h3>
            <p className="text-[0.82rem] text-muted">Banking System — apply everything you learned</p>
          </Link>
        </div>
      </div>
    </>
  );
}
