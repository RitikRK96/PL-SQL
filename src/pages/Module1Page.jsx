import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { ConceptCard, Chip } from '../components/Cards';
import { AnalogyBox, TipBox, WarnBox } from '../components/Callouts';
import CodeBlock from '../components/CodeBlock';
import Checklist from '../components/Checklist';
import PracticeSection from '../components/PracticeSection';
import InterviewCard from '../components/InterviewCard';
import SEO from '../components/SEO';

export default function Module1Page() {
  return (
    <>
      <SEO 
        title="Module 1: SQL Basics" 
        path="/module/1" 
        description="Learn core SQL fundamentals: DDL, DML, aggregations, and JOINs. The foundation for every PL/SQL developer."
      />
      <div className="mb-6">
        <Link to="/" className="text-muted text-sm hover:text-accent transition-colors">← Back to Overview</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Module 1 <span className="text-accent">— SQL Basics</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">The foundation of everything — master SQL before diving into PL/SQL</p>

      {/* 1.1 What is SQL */}
      <div className="mb-16 pb-12 border-b border-border" id="sql-intro">
        <SectionHeader num="1.1" title="What is SQL?" sub="The language databases speak" />

        <AnalogyBox icon="🏪 Real-World Analogy">
          Think of a database as a <strong>massive filing cabinet</strong> in a company. Each drawer is a <strong>table</strong>, each folder is a <strong>row</strong>, and the label on the folder is a <strong>column</strong>. SQL is your <em>language</em> to tell the filing assistant what to find, add, change, or remove.
        </AnalogyBox>

        <ConceptCard title="SQL vs PL/SQL — What's the difference?">
          <table>
            <thead><tr><th>SQL</th><th>PL/SQL</th></tr></thead>
            <tbody>
              <tr><td>Structured Query Language</td><td>Procedural Language / SQL</td></tr>
              <tr><td>Single statements</td><td>Blocks of code with logic</td></tr>
              <tr><td>Only works with data</td><td>Has IF/ELSE, loops, variables</td></tr>
              <tr><td>Declarative: "what to get"</td><td>Procedural: "how to process"</td></tr>
              <tr><td>Run one at a time</td><td>Send whole programs to DB</td></tr>
            </tbody>
          </table>
        </ConceptCard>

        <ConceptCard title="SQL Command Categories">
          <ul className="ml-5 space-y-1">
            <li><Chip color="gold">DDL</Chip> Data Definition Language — CREATE, ALTER, DROP, TRUNCATE</li>
            <li><Chip color="cyan">DML</Chip> Data Manipulation Language — SELECT, INSERT, UPDATE, DELETE</li>
            <li><Chip color="purple">DCL</Chip> Data Control Language — GRANT, REVOKE</li>
            <li><Chip color="green">TCL</Chip> Transaction Control Language — COMMIT, ROLLBACK, SAVEPOINT</li>
          </ul>
        </ConceptCard>

        <Checklist items={[
          { id: 'c_1_1', label: 'Understand the difference between SQL and PL/SQL' },
          { id: 'c_1_2', label: 'Know the 4 SQL command categories (DDL, DML, DCL, TCL)' },
          { id: 'c_1_3', label: 'Successfully connected to Oracle LiveSQL or local DB' },
        ]} />
      </div>

      {/* 1.2 DDL & DML */}
      <div className="mb-16 pb-12 border-b border-border" id="ddl-dml">
        <SectionHeader num="1.2" title="DDL & DML" sub="Creating tables and working with data" />

        <ConceptCard title="CREATE TABLE — Building your structure">
          <p>A table is like a spreadsheet template — you define the columns once, then fill in rows of data.</p>
        </ConceptCard>

        <CodeBlock label="SQL — Create & Populate Table">{`<span class="cmt">-- Create an employees table (like designing a form)</span>
<span class="kw">CREATE TABLE</span> employees (
    emp_id     <span class="type">NUMBER</span>(<span class="num">6</span>)       <span class="kw">PRIMARY KEY</span>,   <span class="cmt">-- Unique identifier</span>
    first_name <span class="type">VARCHAR2</span>(<span class="num">50</span>)  <span class="kw">NOT NULL</span>,      <span class="cmt">-- Text, max 50 chars</span>
    last_name  <span class="type">VARCHAR2</span>(<span class="num">50</span>)  <span class="kw">NOT NULL</span>,
    salary     <span class="type">NUMBER</span>(<span class="num">10</span>,<span class="num">2</span>),               <span class="cmt">-- Decimal number</span>
    dept_id    <span class="type">NUMBER</span>(<span class="num">4</span>),
    hire_date  <span class="type">DATE</span> <span class="kw">DEFAULT</span> <span class="fn">SYSDATE</span>         <span class="cmt">-- Defaults to today</span>
);

<span class="cmt">-- Insert rows (like filling in the form)</span>
<span class="kw">INSERT INTO</span> employees (emp_id, first_name, last_name, salary, dept_id)
<span class="kw">VALUES</span> (<span class="num">1</span>, <span class="str">'Amit'</span>, <span class="str">'Sharma'</span>, <span class="num">75000</span>, <span class="num">10</span>);

<span class="cmt">-- Update a value</span>
<span class="kw">UPDATE</span> employees
<span class="kw">SET</span> salary = <span class="num">80000</span>
<span class="kw">WHERE</span> emp_id = <span class="num">3</span>;

<span class="cmt">-- Delete a record</span>
<span class="kw">DELETE FROM</span> employees
<span class="kw">WHERE</span> emp_id = <span class="num">3</span>;

<span class="cmt">-- Always commit to save DML changes!</span>
<span class="kw">COMMIT</span>;`}</CodeBlock>

        <TipBox>
          Always have a WHERE clause in UPDATE and DELETE. Without it, you'll modify <em>every single row</em>. "DELETE FROM employees" wipes the entire table! Test with a SELECT first using the same WHERE condition.
        </TipBox>

        <WarnBox>
          DDL commands (CREATE, DROP, ALTER) auto-commit. You cannot ROLLBACK them. DML (INSERT, UPDATE, DELETE) must be explicitly committed.
        </WarnBox>

        <PracticeSection
          title="Practice Questions — DDL & DML"
          items={[
            { id: 'p_ddl_1', label: '<strong>Q1:</strong> Create a DEPARTMENTS table with columns: dept_id (PK), dept_name, location, manager_id. Insert 3 rows.' },
            { id: 'p_ddl_2', label: '<strong>Q2:</strong> Add a column "email VARCHAR2(100)" to the employees table using ALTER TABLE.' },
            { id: 'p_ddl_3', label: '<strong>Q3:</strong> Update the salary of all employees in dept_id=10 with a 10% raise.' },
          ]}
          answerLabel="Show Q1 Answer"
          answerContent={`<span class="kw">CREATE TABLE</span> departments (
    dept_id    <span class="type">NUMBER</span>(<span class="num">4</span>)      <span class="kw">PRIMARY KEY</span>,
    dept_name  <span class="type">VARCHAR2</span>(<span class="num">100</span>) <span class="kw">NOT NULL</span>,
    location   <span class="type">VARCHAR2</span>(<span class="num">100</span>),
    manager_id <span class="type">NUMBER</span>(<span class="num">6</span>)
);
<span class="kw">INSERT INTO</span> departments <span class="kw">VALUES</span> (<span class="num">10</span>, <span class="str">'Engineering'</span>, <span class="str">'Bangalore'</span>, <span class="num">1</span>);
<span class="kw">INSERT INTO</span> departments <span class="kw">VALUES</span> (<span class="num">20</span>, <span class="str">'Finance'</span>, <span class="str">'Mumbai'</span>, <span class="num">2</span>);
<span class="kw">INSERT INTO</span> departments <span class="kw">VALUES</span> (<span class="num">30</span>, <span class="str">'HR'</span>, <span class="str">'Delhi'</span>, <span class="num">3</span>);
<span class="kw">COMMIT</span>;`}
        />

        <Checklist items={[
          { id: 'c_ddl_1', label: 'Understand CREATE TABLE syntax with data types' },
          { id: 'c_ddl_2', label: 'Can write INSERT, UPDATE, DELETE with WHERE clause' },
          { id: 'c_ddl_3', label: 'Know difference between COMMIT/ROLLBACK and why DDL auto-commits' },
        ]} />
      </div>

      {/* 1.3 SELECT Queries */}
      <div className="mb-16 pb-12 border-b border-border" id="select">
        <SectionHeader num="1.3" title="SELECT Queries" sub="The most important SQL statement you'll ever learn" />

        <AnalogyBox icon="📚 Analogy">
          SELECT is like asking a librarian for books. You say: "Give me (SELECT) the title and author (columns) from the library catalog (FROM table) where the genre is Sci-Fi (WHERE condition) sorted by year (ORDER BY)."
        </AnalogyBox>

        <CodeBlock label="SQL — SELECT Deep Dive">{`<span class="cmt">-- 1. Basic SELECT</span>
<span class="kw">SELECT</span> first_name, last_name, salary
<span class="kw">FROM</span>   employees;

<span class="cmt">-- 2. SELECT with WHERE</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > <span class="num">70000</span>;

<span class="cmt">-- 3. Multiple conditions</span>
<span class="kw">SELECT</span> *
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  dept_id = <span class="num">10</span>
  <span class="kw">AND</span>  salary <span class="kw">BETWEEN</span> <span class="num">50000</span> <span class="kw">AND</span> <span class="num">90000</span>;

<span class="cmt">-- 4. LIKE for pattern matching</span>
<span class="kw">SELECT</span> *
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  first_name <span class="kw">LIKE</span> <span class="str">'A%'</span>;

<span class="cmt">-- 5. ORDER BY</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>;

<span class="cmt">-- 6. Column alias</span>
<span class="kw">SELECT</span> first_name <span class="kw">AS</span> <span class="str">"Employee Name"</span>,
       salary * <span class="num">12</span> <span class="kw">AS</span> annual_salary
<span class="kw">FROM</span>   employees;

<span class="cmt">-- 7. DISTINCT</span>
<span class="kw">SELECT DISTINCT</span> dept_id
<span class="kw">FROM</span>   employees;

<span class="cmt">-- 8. NULL handling</span>
<span class="kw">SELECT</span> first_name, <span class="fn">NVL</span>(salary, <span class="num">0</span>) <span class="kw">AS</span> salary
<span class="kw">FROM</span>   employees;

<span class="cmt">-- 9. IN operator</span>
<span class="kw">SELECT</span> *
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  dept_id <span class="kw">IN</span> (<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>);`}</CodeBlock>

        <ConceptCard title="Important Oracle Data Types">
          <table>
            <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>NUMBER(p,s)</code></td><td>Numeric, p=precision, s=scale</td><td>NUMBER(10,2) → 12345678.99</td></tr>
              <tr><td><code>VARCHAR2(n)</code></td><td>Variable-length string</td><td>VARCHAR2(100)</td></tr>
              <tr><td><code>CHAR(n)</code></td><td>Fixed-length string</td><td>CHAR(1) for Y/N</td></tr>
              <tr><td><code>DATE</code></td><td>Date + time</td><td>01-JAN-2024</td></tr>
              <tr><td><code>TIMESTAMP</code></td><td>Date + fractional seconds</td><td>High precision</td></tr>
              <tr><td><code>CLOB</code></td><td>Character Large Object</td><td>Long text, XML</td></tr>
              <tr><td><code>BLOB</code></td><td>Binary Large Object</td><td>Images, files</td></tr>
            </tbody>
          </table>
        </ConceptCard>

        <PracticeSection
          title="Practice Questions — SELECT"
          items={[
            { id: 'p_sel_1', label: '<strong>Q1:</strong> Get all employees whose last name ends with \'a\' and salary > 60000.' },
            { id: 'p_sel_2', label: '<strong>Q2:</strong> Show employee name and annual bonus (15% of salary), ordered by bonus desc.' },
            { id: 'p_sel_3', label: '<strong>Q3:</strong> Find all employees hired in 2023. (Hint: EXTRACT(YEAR FROM hire_date))' },
          ]}
        />

        <Checklist items={[
          { id: 'c_sel_1', label: 'Comfortable with WHERE, AND/OR, BETWEEN, LIKE, IN, IS NULL' },
          { id: 'c_sel_2', label: 'Can use aliases, ORDER BY, DISTINCT' },
          { id: 'c_sel_3', label: 'Know key Oracle data types and NULL handling with NVL' },
        ]} />
      </div>

      {/* 1.4 JOINs */}
      <div className="mb-16 pb-12 border-b border-border" id="joins">
        <SectionHeader num="1.4" title="JOINs — Connecting Tables" sub="The most important concept in relational databases" />

        <AnalogyBox icon="🔗 Analogy">
          Imagine you have two lists: one of employees (with dept_id) and another of departments (with dept_id and dept_name). A JOIN is like a "zip" operation — it connects the two lists wherever dept_id matches, so you can see each employee's department name.
        </AnalogyBox>

        <CodeBlock label="SQL — All JOIN Types">{`<span class="cmt">-- INNER JOIN: Only rows with matches in BOTH tables</span>
<span class="kw">SELECT</span> e.first_name, e.salary, d.dept_name
<span class="kw">FROM</span>   employees   e
<span class="kw">JOIN</span>   departments d <span class="kw">ON</span> e.dept_id = d.dept_id;

<span class="cmt">-- LEFT OUTER JOIN: All employees, even if no dept match</span>
<span class="kw">SELECT</span> e.first_name, d.dept_name
<span class="kw">FROM</span>   employees   e
<span class="kw">LEFT JOIN</span> departments d <span class="kw">ON</span> e.dept_id = d.dept_id;

<span class="cmt">-- RIGHT OUTER JOIN: All departments, even with no employees</span>
<span class="kw">SELECT</span> e.first_name, d.dept_name
<span class="kw">FROM</span>   employees   e
<span class="kw">RIGHT JOIN</span> departments d <span class="kw">ON</span> e.dept_id = d.dept_id;

<span class="cmt">-- FULL OUTER JOIN: Everything from both tables</span>
<span class="kw">SELECT</span> e.first_name, d.dept_name
<span class="kw">FROM</span>   employees   e
<span class="kw">FULL OUTER JOIN</span> departments d <span class="kw">ON</span> e.dept_id = d.dept_id;

<span class="cmt">-- SELF JOIN: Employee and their Manager</span>
<span class="kw">SELECT</span> e.first_name <span class="kw">AS</span> employee,
       m.first_name <span class="kw">AS</span> manager
<span class="kw">FROM</span>   employees e
<span class="kw">JOIN</span>   employees m <span class="kw">ON</span> e.manager_id = m.emp_id;`}</CodeBlock>

        <ConceptCard title="JOIN Quick Reference">
          <table>
            <thead><tr><th>JOIN Type</th><th>Returns</th><th>Unmatched rows?</th></tr></thead>
            <tbody>
              <tr><td>INNER JOIN</td><td>Only matching rows</td><td>❌ Excluded</td></tr>
              <tr><td>LEFT JOIN</td><td>All left + matching right</td><td>Left: ✅ NULLs for right</td></tr>
              <tr><td>RIGHT JOIN</td><td>All right + matching left</td><td>Right: ✅ NULLs for left</td></tr>
              <tr><td>FULL OUTER JOIN</td><td>Everything from both</td><td>✅ NULLs both sides</td></tr>
              <tr><td>CROSS JOIN</td><td>Every combo (cartesian)</td><td>N/A</td></tr>
            </tbody>
          </table>
        </ConceptCard>

        <InterviewCard
          badge="Interview Q"
          title="Classic Question"
          question={`"What is the difference between INNER JOIN and LEFT JOIN?"`}
          answer={`<strong>INNER JOIN</strong> returns only rows where there is a match in <em>both</em> tables. If an employee has no department, they are excluded.<br/><br/><strong>LEFT JOIN</strong> returns <em>all</em> rows from the left table (employees) plus matching rows from the right table. Employees without departments appear with NULL values for department columns. Use LEFT JOIN when you don't want to lose records from the primary (left) table.`}
        />

        <PracticeSection
          title="Practice Questions — JOINs"
          items={[
            { id: 'p_join_1', label: '<strong>Q1:</strong> List all employees with their department name. Include employees who have no department assigned.' },
            { id: 'p_join_2', label: '<strong>Q2:</strong> Find departments that have NO employees. (Hint: LEFT JOIN + IS NULL)' },
            { id: 'p_join_3', label: '<strong>Q3:</strong> Show employee name and their manager\'s name using a SELF JOIN.' },
          ]}
        />

        <Checklist items={[
          { id: 'c_join_1', label: 'Can write INNER, LEFT, RIGHT, FULL OUTER JOINs confidently' },
          { id: 'c_join_2', label: 'Understand when to use each JOIN type' },
          { id: 'c_join_3', label: 'Can do SELF JOIN for hierarchical data' },
        ]} />
      </div>

      {/* 1.5 GROUP BY */}
      <div className="mb-16 pb-12 border-b border-border" id="groupby">
        <SectionHeader num="1.5" title="GROUP BY & Aggregate Functions" sub="Summarizing and analyzing data" />

        <CodeBlock label="SQL — Aggregations">{`<span class="cmt">-- Aggregate functions</span>
<span class="kw">SELECT</span>
    <span class="fn">COUNT</span>(*),               <span class="cmt">-- Total number of rows</span>
    <span class="fn">SUM</span>(salary),            <span class="cmt">-- Total salary</span>
    <span class="fn">AVG</span>(salary),            <span class="cmt">-- Average salary</span>
    <span class="fn">MAX</span>(salary),            <span class="cmt">-- Highest salary</span>
    <span class="fn">MIN</span>(salary)             <span class="cmt">-- Lowest salary</span>
<span class="kw">FROM</span> employees;

<span class="cmt">-- GROUP BY: Summarize per department</span>
<span class="kw">SELECT</span>   dept_id,
         <span class="fn">COUNT</span>(*) <span class="kw">AS</span> emp_count,
         <span class="fn">AVG</span>(salary) <span class="kw">AS</span> avg_salary
<span class="kw">FROM</span>     employees
<span class="kw">GROUP BY</span> dept_id
<span class="kw">ORDER BY</span> avg_salary <span class="kw">DESC</span>;

<span class="cmt">-- HAVING: Filter groups (like WHERE but for aggregates)</span>
<span class="kw">SELECT</span>   dept_id, <span class="fn">AVG</span>(salary) <span class="kw">AS</span> avg_sal
<span class="kw">FROM</span>     employees
<span class="kw">GROUP BY</span> dept_id
<span class="kw">HAVING</span>   <span class="fn">AVG</span>(salary) > <span class="num">70000</span>;`}</CodeBlock>

        <TipBox>
          Every column in SELECT must either be inside an aggregate function (SUM, COUNT, etc.) OR listed in the GROUP BY clause. This is one of the most common beginner mistakes.
        </TipBox>

        <PracticeSection
          title="Practice Questions — GROUP BY"
          items={[
            { id: 'p_grp_1', label: '<strong>Q1:</strong> Find total payroll cost per department, only show depts where total > 200,000.' },
            { id: 'p_grp_2', label: '<strong>Q2:</strong> Find how many employees were hired each year.' },
            { id: 'p_grp_3', label: '<strong>Q3:</strong> What\'s the difference between WHERE and HAVING?' },
          ]}
        />

        <Checklist items={[
          { id: 'c_grp_1', label: 'Can use COUNT, SUM, AVG, MAX, MIN' },
          { id: 'c_grp_2', label: 'Understand GROUP BY rules (columns must match)' },
          { id: 'c_grp_3', label: 'Know when to use HAVING vs WHERE' },
        ]} />
      </div>

      {/* 1.6 Subqueries */}
      <div className="mb-16 pb-12 border-b border-border" id="subqueries">
        <SectionHeader num="1.6" title="Subqueries & CTEs" sub="Queries inside queries — the power tool" />

        <CodeBlock label="SQL — Subqueries & WITH clause">{`<span class="cmt">-- Scalar subquery: returns a single value</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > (<span class="kw">SELECT</span> <span class="fn">AVG</span>(salary) <span class="kw">FROM</span> employees);

<span class="cmt">-- EXISTS: Check if a related record exists</span>
<span class="kw">SELECT</span> dept_name
<span class="kw">FROM</span>   departments d
<span class="kw">WHERE</span>  <span class="kw">EXISTS</span> (
    <span class="kw">SELECT</span> <span class="num">1</span> <span class="kw">FROM</span> employees e
    <span class="kw">WHERE</span>  e.dept_id = d.dept_id
);

<span class="cmt">-- CTE (Common Table Expression) — Cleaner than subqueries</span>
<span class="kw">WITH</span> high_earners <span class="kw">AS</span> (
    <span class="kw">SELECT</span> emp_id, first_name, salary, dept_id
    <span class="kw">FROM</span>   employees
    <span class="kw">WHERE</span>  salary > <span class="num">80000</span>
)
<span class="kw">SELECT</span> h.first_name, d.dept_name
<span class="kw">FROM</span>   high_earners h
<span class="kw">JOIN</span>   departments  d <span class="kw">ON</span> h.dept_id = d.dept_id;`}</CodeBlock>

        <PracticeSection
          title="Practice Questions — Subqueries"
          items={[
            { id: 'p_sub_1', label: '<strong>Q1:</strong> Find the employee(s) with the highest salary in each department using a subquery.' },
            { id: 'p_sub_2', label: '<strong>Q2:</strong> Rewrite Q1 using a CTE. Which is more readable?' },
            { id: 'p_sub_3', label: '<strong>Q3:</strong> Find employees who earn more than ALL employees in department 20.' },
          ]}
        />

        <Checklist items={[
          { id: 'c_sub_1', label: 'Can write scalar, inline-view, and correlated subqueries' },
          { id: 'c_sub_2', label: 'Know how to use EXISTS and NOT EXISTS' },
          { id: 'c_sub_3', label: 'Can write CTEs using the WITH clause' },
        ]} />
      </div>

      {/* Next Module Link */}
      <div className="text-center pt-8">
        <Link to="/module/2" className="inline-block font-heading font-bold text-accent bg-accent/10 border border-accent/30 px-8 py-3 rounded-[10px] hover:bg-accent/20 transition-colors no-underline">
          Next → Module 2: PL/SQL Foundations
        </Link>
      </div>
    </>
  );
}
