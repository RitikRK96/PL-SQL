import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { ConceptCard } from '../components/Cards';
import { AnalogyBox, TipBox, WarnBox } from '../components/Callouts';
import CodeBlock from '../components/CodeBlock';
import Checklist from '../components/Checklist';
import PracticeSection from '../components/PracticeSection';
import InterviewCard from '../components/InterviewCard';
import SEO from '../components/SEO';

export default function Module2Page() {
  return (
    <>
      <SEO 
        title="Module 2: PL/SQL Foundations" 
        path="/module/2" 
        description="Master the building blocks of PL/SQL: anonymous blocks, variables, control flow, loops, and conditional logic."
      />
      <div className="mb-6">
        <Link to="/module/1" className="text-muted text-sm hover:text-accent transition-colors">← Module 1: SQL Basics</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Module 2 <span className="text-accent2">— PL/SQL Foundations</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">Oracle's procedural extension to SQL — where logic meets data</p>

      {/* 2.1 What is PL/SQL */}
      <div className="mb-16 pb-12 border-b border-border" id="plsql-intro">
        <SectionHeader num="2.1" title="What is PL/SQL?" sub="Oracle's procedural extension to SQL" />

        <AnalogyBox icon="🏭 Analogy">
          If SQL is like sending individual orders to a factory ("make this", "ship that"), PL/SQL is like giving the factory a complete <em>production manual</em> — "if inventory is low, order more; if the order is urgent, prioritize it; for each item in the list, do this process." It's the difference between one instruction and a whole program.
        </AnalogyBox>

        <ConceptCard title="Why PL/SQL over plain SQL?">
          <ul className="ml-5 space-y-1">
            <li>✅ Add conditional logic (IF/THEN/ELSE) to database operations</li>
            <li>✅ Loop over result sets without fetching to application layer</li>
            <li>✅ Handle errors gracefully with exception blocks</li>
            <li>✅ Bundle logic into reusable stored procedures & functions</li>
            <li>✅ Dramatically reduces network round-trips (performance)</li>
            <li>✅ Business logic lives in the database — secure and centralized</li>
          </ul>
        </ConceptCard>

        <Checklist items={[
          { id: 'c_pi_1', label: 'Understand when to choose PL/SQL over application-layer code' },
          { id: 'c_pi_2', label: 'Know PL/SQL is Oracle-specific (PostgreSQL has PL/pgSQL, MySQL has its own)' },
        ]} />
      </div>

      {/* 2.2 Block Structure */}
      <div className="mb-16 pb-12 border-b border-border" id="block">
        <SectionHeader num="2.2" title="PL/SQL Block Structure" sub="The DNA of every PL/SQL program" />

        <AnalogyBox icon="📋 Analogy">
          A PL/SQL block is like a recipe card. It has: a <strong>DECLARE</strong> section (list your ingredients), a <strong>BEGIN</strong> section (the actual cooking steps), and an <strong>EXCEPTION</strong> section (what to do if something goes wrong — e.g., "if we're out of eggs, substitute with flax").
        </AnalogyBox>

        <CodeBlock label="PL/SQL — Block Structure">{`<span class="cmt">/*  PL/SQL Block Anatomy
    ┌─────────────────────────────────┐
    │  DECLARE  (optional)            │  ← Variables, constants, types
    │  BEGIN    (mandatory)           │  ← Your logic goes here
    │  EXCEPTION (optional)           │  ← Error handling
    │  END;     (mandatory)           │
    └─────────────────────────────────┘ */</span>

<span class="kw">DECLARE</span>
    <span class="var">v_emp_name</span>   <span class="type">VARCHAR2</span>(<span class="num">100</span>);
    <span class="var">v_salary</span>     <span class="type">NUMBER</span>(<span class="num">10</span>, <span class="num">2</span>) := <span class="num">0</span>;
    <span class="var">v_message</span>    <span class="type">VARCHAR2</span>(<span class="num">200</span>) := <span class="str">'Hello, PL/SQL!'</span>;
    <span class="var">c_max_sal</span>    <span class="kw">CONSTANT</span> <span class="type">NUMBER</span> := <span class="num">200000</span>;

<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> first_name || <span class="str">' '</span> || last_name, salary
    <span class="kw">INTO</span>   <span class="var">v_emp_name</span>, <span class="var">v_salary</span>
    <span class="kw">FROM</span>   employees
    <span class="kw">WHERE</span>  emp_id = <span class="num">1</span>;

    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Employee: '</span> || <span class="var">v_emp_name</span>);
    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Salary:   '</span> || <span class="var">v_salary</span>);

<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'No employee found!'</span>);
    <span class="kw">WHEN</span> OTHERS <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Error: '</span> || <span class="fn">SQLERRM</span>);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>

        <TipBox>
          Before running PL/SQL blocks, run: <code className="text-accent2 font-mono">SET SERVEROUTPUT ON;</code> — otherwise DBMS_OUTPUT.PUT_LINE won't show anything!
        </TipBox>

        <ConceptCard title="SELECT INTO — The core way to read data in PL/SQL">
          <p>In PL/SQL, you can't just SELECT freely. You must store the result in variables using <strong>INTO</strong>. This requires the query to return <em>exactly one row</em> — if it returns zero or more than one, Oracle throws an exception.</p>
        </ConceptCard>

        <PracticeSection
          title="Practice Questions — Block Structure"
          items={[
            { id: 'p_blk_1', label: '<strong>Q1:</strong> Write a PL/SQL block that retrieves the department name for dept_id=10 and prints it.' },
            { id: 'p_blk_2', label: '<strong>Q2:</strong> Declare a variable to hold today\'s date and print "Today is: [date]".' },
            { id: 'p_blk_3', label: '<strong>Q3:</strong> What happens if your SELECT INTO query returns more than 1 row? Test it!' },
          ]}
        />

        <Checklist items={[
          { id: 'c_blk_1', label: 'Know the DECLARE / BEGIN / EXCEPTION / END structure' },
          { id: 'c_blk_2', label: 'Can declare variables and use := for assignment' },
          { id: 'c_blk_3', label: 'Can use SELECT INTO and DBMS_OUTPUT.PUT_LINE' },
        ]} />
      </div>

      {/* 2.3 Variables & Types */}
      <div className="mb-16 pb-12 border-b border-border" id="variables">
        <SectionHeader num="2.3" title="Variables, Types & Anchors" sub="The smart way to declare variables" />

        <ConceptCard title="Anchored Declarations (%TYPE and %ROWTYPE)">
          <p className="mb-3">Hardcoding data types (like <code className="text-accent2 font-mono">VARCHAR2(50)</code>) is dangerous. If the database schema changes, your code breaks. Instead, <strong>anchor</strong> your variables to the database schema:</p>
          <ul className="ml-5 space-y-2">
            <li><code className="text-accent2 font-mono font-bold">%TYPE</code> — Inherits the exact data type of a specific <strong>column</strong>. <br/><span className="text-muted text-[0.8rem]">Example: <code>v_sal employees.salary%TYPE;</code></span></li>
            <li><code className="text-accent2 font-mono font-bold">%ROWTYPE</code> — Inherits the structure of an entire <strong>table row</strong> or view. <br/><span className="text-muted text-[0.8rem]">Example: <code>v_emp employees%ROWTYPE;</code></span></li>
          </ul>
        </ConceptCard>

        <CodeBlock label="PL/SQL — Variables & Anchored Types">{`<span class="kw">DECLARE</span>
    <span class="cmt">-- Hardcoded (Not Recommended)</span>
    <span class="var">v_name</span>    <span class="type">VARCHAR2</span>(<span class="num">50</span>)   := <span class="str">'Oracle'</span>;
    <span class="var">v_count</span>   <span class="type">NUMBER</span>          := <span class="num">0</span>;
    <span class="var">v_flag</span>    <span class="type">BOOLEAN</span>         := <span class="kw">TRUE</span>;

    <span class="cmt">-- %TYPE: Variable inherits the exact type of a table column</span>
    <span class="var">v_sal</span>     employees.salary%<span class="kw">TYPE</span>;
    <span class="var">v_fname</span>   employees.first_name%<span class="kw">TYPE</span>;

    <span class="cmt">-- %ROWTYPE: Variable holds an entire table row</span>
    <span class="var">v_emp</span>     employees%<span class="kw">ROWTYPE</span>;

<span class="kw">BEGIN</span>
    <span class="cmt">-- Fetching a whole row at once into a %ROWTYPE variable</span>
    <span class="kw">SELECT</span> * <span class="kw">INTO</span> <span class="var">v_emp</span>
    <span class="kw">FROM</span>   employees
    <span class="kw">WHERE</span>  emp_id = <span class="num">1</span>;

    <span class="cmt">-- Accessing fields via dot notation</span>
    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="var">v_emp</span>.first_name || <span class="str">' - Dept: '</span> || <span class="var">v_emp</span>.dept_id);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>

        <Checklist items={[
          { id: 'c_var_1', label: 'Understand %TYPE and %ROWTYPE anchored declarations' },
          { id: 'c_var_2', label: 'Know BOOLEAN, NUMBER, VARCHAR2, DATE variable types' },
          { id: 'c_var_3', label: 'Can access %ROWTYPE fields with dot notation' },
        ]} />
      </div>

      {/* 2.4 Control Structures */}
      <div className="mb-16 pb-12 border-b border-border" id="control">
        <SectionHeader num="2.4" title="Control Structures" sub="IF/THEN/ELSE and CASE — making decisions in code" />

        <CodeBlock label="PL/SQL — IF/ELSIF/ELSE and CASE">{`<span class="kw">DECLARE</span>
    <span class="var">v_salary</span>  employees.salary%<span class="kw">TYPE</span>;
    <span class="var">v_grade</span>   <span class="type">VARCHAR2</span>(<span class="num">10</span>);

<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> salary <span class="kw">INTO</span> <span class="var">v_salary</span>
    <span class="kw">FROM</span>   employees <span class="kw">WHERE</span> emp_id = <span class="num">1</span>;

    <span class="kw">IF</span>    <span class="var">v_salary</span> >= <span class="num">100000</span> <span class="kw">THEN</span>
        <span class="var">v_grade</span> := <span class="str">'A'</span>;
    <span class="kw">ELSIF</span> <span class="var">v_salary</span> >= <span class="num">70000</span>  <span class="kw">THEN</span>
        <span class="var">v_grade</span> := <span class="str">'B'</span>;
    <span class="kw">ELSE</span>
        <span class="var">v_grade</span> := <span class="str">'C'</span>;
    <span class="kw">END IF</span>;

    <span class="cmt">-- CASE expression (cleaner for multiple values)</span>
    <span class="var">v_grade</span> := <span class="kw">CASE</span>
        <span class="kw">WHEN</span> <span class="var">v_salary</span> >= <span class="num">100000</span> <span class="kw">THEN</span> <span class="str">'A - Executive'</span>
        <span class="kw">WHEN</span> <span class="var">v_salary</span> >= <span class="num">70000</span>  <span class="kw">THEN</span> <span class="str">'B - Senior'</span>
        <span class="kw">ELSE</span>                          <span class="str">'C - Junior'</span>
    <span class="kw">END</span>;
    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Level: '</span> || <span class="var">v_grade</span>);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>

        <PracticeSection
          title="Practice Questions — Control Structures"
          items={[
            { id: 'p_ctrl_1', label: '<strong>Q1:</strong> Write a block that classifies an employee\'s bonus: 20% if grade A, 15% if B, 10% if C, 5% otherwise.' },
            { id: 'p_ctrl_2', label: '<strong>Q2:</strong> Note that PL/SQL uses ELSIF (not ELSEIF). What happens if you use ELSEIF by mistake?' },
          ]}
        />

        <Checklist items={[
          { id: 'c_ctrl_1', label: 'Can write IF / ELSIF / ELSE blocks correctly' },
          { id: 'c_ctrl_2', label: 'Can use CASE expressions for cleaner multi-branch logic' },
        ]} />
      </div>

      {/* 2.5 Loops */}
      <div className="mb-16 pb-12 border-b border-border" id="loops">
        <SectionHeader num="2.5" title="Loops" sub="LOOP, WHILE, FOR — iterating in PL/SQL" />

        <CodeBlock label="PL/SQL — All Loop Types">{`<span class="kw">DECLARE</span>
    <span class="var">v_count</span>  <span class="type">NUMBER</span> := <span class="num">1</span>;
    <span class="var">v_sum</span>    <span class="type">NUMBER</span> := <span class="num">0</span>;

<span class="kw">BEGIN</span>
    <span class="cmt">-- 1. Basic LOOP (manually EXIT)</span>
    <span class="kw">LOOP</span>
        <span class="var">v_sum</span> := <span class="var">v_sum</span> + <span class="var">v_count</span>;
        <span class="var">v_count</span> := <span class="var">v_count</span> + <span class="num">1</span>;
        <span class="kw">EXIT WHEN</span> <span class="var">v_count</span> > <span class="num">10</span>;
    <span class="kw">END LOOP</span>;

    <span class="cmt">-- 2. WHILE LOOP</span>
    <span class="var">v_count</span> := <span class="num">1</span>; <span class="var">v_sum</span> := <span class="num">0</span>;
    <span class="kw">WHILE</span> <span class="var">v_count</span> <= <span class="num">10</span> <span class="kw">LOOP</span>
        <span class="var">v_sum</span> := <span class="var">v_sum</span> + <span class="var">v_count</span>;
        <span class="var">v_count</span> := <span class="var">v_count</span> + <span class="num">1</span>;
    <span class="kw">END LOOP</span>;

    <span class="cmt">-- 3. FOR LOOP (most common)</span>
    <span class="var">v_sum</span> := <span class="num">0</span>;
    <span class="kw">FOR</span> <span class="var">i</span> <span class="kw">IN</span> <span class="num">1</span>..<span class="num">10</span> <span class="kw">LOOP</span>
        <span class="var">v_sum</span> := <span class="var">v_sum</span> + <span class="var">i</span>;
    <span class="kw">END LOOP</span>;

    <span class="cmt">-- 4. REVERSE FOR LOOP</span>
    <span class="kw">FOR</span> <span class="var">i</span> <span class="kw">IN REVERSE</span> <span class="num">1</span>..<span class="num">5</span> <span class="kw">LOOP</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Count: '</span> || <span class="var">i</span>);
    <span class="kw">END LOOP</span>;
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>

        <PracticeSection
          title="Practice Questions — Loops"
          items={[
            { id: 'p_loop_1', label: '<strong>Q1:</strong> Print the multiplication table for 7 using a FOR loop.' },
            { id: 'p_loop_2', label: '<strong>Q2:</strong> Use a WHILE loop to find the first N where N! exceeds 1,000,000.' },
            { id: 'p_loop_3', label: '<strong>Q3:</strong> What is the risk of a basic LOOP without EXIT WHEN?' },
          ]}
        />

        <Checklist items={[
          { id: 'c_loop_1', label: 'Can write LOOP, WHILE, and FOR loops' },
          { id: 'c_loop_2', label: 'Know when to use each loop type' },
          { id: 'c_loop_3', label: 'Understand EXIT WHEN and CONTINUE statements' },
        ]} />
      </div>

      {/* 2.6 Intro to Cursors */}
      <div className="mb-16 pb-12 border-b border-border" id="cursors-intro">
        <SectionHeader num="2.6" title="Introduction to Cursors" sub="Implicit vs Explicit — A light intro before Module 3" />

        <ConceptCard title="What is a Cursor?">
          <p className="mb-3">When Oracle executes a SQL statement, it creates a temporary workspace in memory to hold the data. A <strong>cursor</strong> is simply a pointer or name for this workspace. There are two types:</p>
          <ul className="ml-5 space-y-2">
            <li><strong>Implicit Cursors:</strong> Oracle creates these automatically for every single DML statement (INSERT, UPDATE, DELETE) and <code>SELECT INTO</code> statement. You don't manage them, but you can check their status using attributes like <code>SQL%ROWCOUNT</code> or <code>SQL%FOUND</code>.</li>
            <li><strong>Explicit Cursors:</strong> You create these manually when your query returns <em>more than one row</em>. You must explicitly DECLARE, OPEN, FETCH, and CLOSE them. We will dive deep into these in Module 3.</li>
          </ul>
        </ConceptCard>

        <CodeBlock label="PL/SQL — Implicit Cursor Attributes">{`<span class="kw">BEGIN</span>
    <span class="kw">UPDATE</span> employees
    <span class="kw">SET</span> salary = salary * <span class="num">1.1</span>
    <span class="kw">WHERE</span> dept_id = <span class="num">50</span>;

    <span class="cmt">-- SQL%ROWCOUNT tells us how many rows the implicit cursor just updated!</span>
    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Employees updated: '</span> || SQL%ROWCOUNT);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>

        <TipBox>
          Remember: <code>SELECT INTO</code> uses an <strong>implicit cursor</strong>. It expects exactly one row. If it finds 0 rows, it throws <code>NO_DATA_FOUND</code>. If it finds 2+ rows, it throws <code>TOO_MANY_ROWS</code>. To handle multiple rows, you <em>must</em> learn Explicit Cursors in the next module!
        </TipBox>
      </div>

      <div className="flex justify-between pt-8">
        <Link to="/module/1" className="font-heading font-bold text-muted hover:text-accent transition-colors no-underline">← Module 1: SQL Basics</Link>
        <Link to="/module/3" className="inline-block font-heading font-bold text-accent bg-accent/10 border border-accent/30 px-8 py-3 rounded-[10px] hover:bg-accent/20 transition-colors no-underline">
          Next → Module 3: Advanced PL/SQL
        </Link>
      </div>
    </>
  );
}
