import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { ConceptCard } from '../components/Cards';
import { AnalogyBox, TipBox, WarnBox } from '../components/Callouts';
import CodeBlock from '../components/CodeBlock';
import Checklist from '../components/Checklist';

export default function Module4Page() {
  return (
    <>
      <div className="mb-6">
        <Link to="/module/3" className="text-muted text-sm hover:text-accent transition-colors">← Module 3: Advanced PL/SQL</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Module 4 <span className="text-green">— Expert Level</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">Collections, bulk operations, dynamic SQL & performance tuning</p>

      {/* 4.1 Collections & Records */}
      <div className="mb-16 pb-12 border-b border-border" id="collections">
        <SectionHeader num="4.1" title="Collections & Records" sub="Arrays and structs in PL/SQL" />
        <CodeBlock label="PL/SQL — Collections">{`<span class="kw">DECLARE</span>
    <span class="cmt">-- 1. VARRAY (fixed max size)</span>
    <span class="kw">TYPE</span> <span class="type">t_skills</span> <span class="kw">IS VARRAY</span>(<span class="num">5</span>) <span class="kw">OF</span> <span class="type">VARCHAR2</span>(<span class="num">50</span>);
    <span class="var">v_skills</span>  <span class="type">t_skills</span> := <span class="type">t_skills</span>(<span class="str">'SQL'</span>, <span class="str">'PL/SQL'</span>, <span class="str">'Java'</span>);

    <span class="cmt">-- 2. Nested Table (unbounded array)</span>
    <span class="kw">TYPE</span> <span class="type">t_names</span> <span class="kw">IS TABLE OF</span> <span class="type">VARCHAR2</span>(<span class="num">100</span>);
    <span class="var">v_names</span>   <span class="type">t_names</span> := <span class="type">t_names</span>();

    <span class="cmt">-- 3. Associative Array (key-value, most flexible)</span>
    <span class="kw">TYPE</span> <span class="type">t_sal_map</span> <span class="kw">IS TABLE OF NUMBER INDEX BY VARCHAR2</span>(<span class="num">50</span>);
    <span class="var">v_salaries</span>  <span class="type">t_sal_map</span>;

    <span class="cmt">-- 4. Record type</span>
    <span class="kw">TYPE</span> <span class="type">t_emp_info</span> <span class="kw">IS RECORD</span> (
        emp_id <span class="type">NUMBER</span>, name <span class="type">VARCHAR2</span>(<span class="num">100</span>),
        salary <span class="type">NUMBER</span>, is_active <span class="type">BOOLEAN</span> := <span class="kw">TRUE</span>
    );
    <span class="var">v_emp</span>  <span class="type">t_emp_info</span>;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> <span class="var">i</span> <span class="kw">IN</span> <span class="num">1</span>..<span class="var">v_skills</span>.COUNT <span class="kw">LOOP</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Skill: '</span> || <span class="var">v_skills</span>(<span class="var">i</span>));
    <span class="kw">END LOOP</span>;

    <span class="var">v_salaries</span>(<span class="str">'Engineering'</span>) := <span class="num">95000</span>;
    <span class="var">v_salaries</span>(<span class="str">'Finance'</span>)     := <span class="num">85000</span>;

    <span class="var">v_emp</span>.name := <span class="str">'Arjun'</span>;
    <span class="var">v_emp</span>.salary := <span class="num">78000</span>;
    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="var">v_emp</span>.name || <span class="str">' earns '</span> || <span class="var">v_emp</span>.salary);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <Checklist items={[
          { id: 'c_col_1', label: 'Know the 3 collection types: VARRAY, Nested Table, Associative Array' },
          { id: 'c_col_2', label: 'Can define and use RECORD types' },
          { id: 'c_col_3', label: 'Know collection methods: COUNT, EXTEND, DELETE, FIRST, LAST, EXISTS' },
        ]} />
      </div>

      {/* 4.2 Bulk Operations */}
      <div className="mb-16 pb-12 border-b border-border" id="bulk">
        <SectionHeader num="4.2" title="Bulk Operations — BULK COLLECT & FORALL" sub="Processing thousands of rows efficiently" />
        <AnalogyBox icon="🚛 Analogy">
          Without BULK: Moving furniture one item per trip from floor 5 to a truck. With BULK COLLECT/FORALL: Load everything onto a cart, one trip. Dramatically fewer context switches between PL/SQL and SQL engines.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — BULK COLLECT & FORALL">{`<span class="kw">DECLARE</span>
    <span class="kw">TYPE</span> <span class="type">t_emp_ids</span>   <span class="kw">IS TABLE OF</span> employees.emp_id%<span class="kw">TYPE</span>;
    <span class="kw">TYPE</span> <span class="type">t_salaries</span>  <span class="kw">IS TABLE OF</span> employees.salary%<span class="kw">TYPE</span>;
    <span class="var">v_ids</span>      <span class="type">t_emp_ids</span>;
    <span class="var">v_sals</span>     <span class="type">t_salaries</span>;
<span class="kw">BEGIN</span>
    <span class="cmt">-- BULK COLLECT: Fetch ALL rows at once</span>
    <span class="kw">SELECT</span> emp_id, salary
    <span class="kw">BULK COLLECT INTO</span> <span class="var">v_ids</span>, <span class="var">v_sals</span>
    <span class="kw">FROM</span>   employees
    <span class="kw">WHERE</span>  dept_id = <span class="num">10</span>;

    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Fetched: '</span> || <span class="var">v_ids</span>.COUNT || <span class="str">' rows'</span>);

    <span class="cmt">-- FORALL: Batch DML (much faster than row-by-row!)</span>
    <span class="kw">FORALL</span> <span class="var">i</span> <span class="kw">IN</span> <span class="num">1</span>..<span class="var">v_ids</span>.COUNT
        <span class="kw">UPDATE</span> employees
        <span class="kw">SET</span>    salary = <span class="var">v_sals</span>(<span class="var">i</span>) * <span class="num">1.10</span>
        <span class="kw">WHERE</span>  emp_id = <span class="var">v_ids</span>(<span class="var">i</span>);

    <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'Updated: '</span> || SQL%ROWCOUNT || <span class="str">' rows'</span>);
    <span class="kw">COMMIT</span>;
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <TipBox>
          FORALL can be <strong>10x–100x faster</strong> than a row-by-row loop for large datasets. Every row-by-row loop causes a "context switch" between PL/SQL and SQL engines. FORALL makes one round trip for thousands of rows.
        </TipBox>
        <Checklist items={[
          { id: 'c_bulk_1', label: 'Understand why row-by-row is the "slow-by-slow" approach' },
          { id: 'c_bulk_2', label: 'Can write BULK COLLECT INTO with collection types' },
          { id: 'c_bulk_3', label: 'Can use FORALL for batch DML operations' },
        ]} />
      </div>

      {/* 4.3 Dynamic SQL */}
      <div className="mb-16 pb-12 border-b border-border" id="dynamic">
        <SectionHeader num="4.3" title="Dynamic SQL — EXECUTE IMMEDIATE" sub="Building and running SQL at runtime" />
        <AnalogyBox icon="🔧 Analogy">
          Normal SQL is like ordering from a fixed menu. Dynamic SQL is like giving the chef a handwritten note at runtime — you construct the instruction on the fly.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — Dynamic SQL">{`<span class="kw">DECLARE</span>
    <span class="var">v_table</span>    <span class="type">VARCHAR2</span>(<span class="num">50</span>) := <span class="str">'employees'</span>;
    <span class="var">v_sql</span>      <span class="type">VARCHAR2</span>(<span class="num">1000</span>);
    <span class="var">v_count</span>    <span class="type">NUMBER</span>;
    <span class="var">v_dept</span>     <span class="type">NUMBER</span> := <span class="num">10</span>;
<span class="kw">BEGIN</span>
    <span class="cmt">-- Dynamic DDL</span>
    <span class="fn">EXECUTE IMMEDIATE</span> <span class="str">'CREATE TABLE temp_log (msg VARCHAR2(200))'</span>;

    <span class="cmt">-- Dynamic query with INTO</span>
    <span class="var">v_sql</span> := <span class="str">'SELECT COUNT(*) FROM '</span> || <span class="var">v_table</span>;
    <span class="fn">EXECUTE IMMEDIATE</span> <span class="var">v_sql</span> <span class="kw">INTO</span> <span class="var">v_count</span>;

    <span class="cmt">-- BIND VARIABLES (CRITICAL for security!)</span>
    <span class="var">v_sql</span> := <span class="str">'SELECT MAX(salary) FROM employees WHERE dept_id = :dept'</span>;
    <span class="fn">EXECUTE IMMEDIATE</span> <span class="var">v_sql</span> <span class="kw">INTO</span> <span class="var">v_count</span> <span class="kw">USING</span> <span class="var">v_dept</span>;
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <WarnBox title="🚨 Security Critical: SQL Injection">
          NEVER build dynamic SQL by concatenating user input. ALWAYS use bind variables with <code className="text-accent2 font-mono">:placeholder</code> and USING clause.
        </WarnBox>
        <Checklist items={[
          { id: 'c_dyn_1', label: 'Can use EXECUTE IMMEDIATE for DDL and DML' },
          { id: 'c_dyn_2', label: 'Always use bind variables (USING clause) — never concatenate' },
          { id: 'c_dyn_3', label: 'Know when dynamic SQL is appropriate vs static SQL' },
        ]} />
      </div>

      {/* 4.4 Performance */}
      <div className="mb-16 pb-12 border-b border-border" id="performance">
        <SectionHeader num="4.4" title="Performance Optimization" sub="Writing fast PL/SQL — think at scale" />
        <ConceptCard title="The Golden Rules of PL/SQL Performance">
          <ul className="ml-5 space-y-1">
            <li>🔴 <strong>Rule 1:</strong> Minimize context switches — use BULK COLLECT and FORALL</li>
            <li>🟡 <strong>Rule 2:</strong> Write efficient SQL — indexes, avoid full table scans</li>
            <li>🟢 <strong>Rule 3:</strong> Never do row-by-row what SQL can do set-based</li>
            <li>🔵 <strong>Rule 4:</strong> Use bind variables — avoid hard parsing</li>
            <li>🟣 <strong>Rule 5:</strong> Limit COMMIT frequency — committing in loops is slow</li>
          </ul>
        </ConceptCard>
        <CodeBlock label="PL/SQL — Performance Patterns">{`<span class="cmt">-- ❌ SLOW: Row-by-row update</span>
<span class="kw">FOR</span> <span class="var">r</span> <span class="kw">IN</span> (<span class="kw">SELECT</span> emp_id <span class="kw">FROM</span> employees <span class="kw">WHERE</span> dept_id=<span class="num">10</span>) <span class="kw">LOOP</span>
    <span class="kw">UPDATE</span> employees <span class="kw">SET</span> salary=salary*<span class="num">1.1</span> <span class="kw">WHERE</span> emp_id=<span class="var">r</span>.emp_id;
<span class="kw">END LOOP</span>;

<span class="cmt">-- ✅ FAST: Single SQL statement</span>
<span class="kw">UPDATE</span> employees <span class="kw">SET</span> salary = salary * <span class="num">1.1</span> <span class="kw">WHERE</span> dept_id = <span class="num">10</span>;
<span class="kw">COMMIT</span>;

<span class="cmt">-- Checking indexes (explain plan)</span>
<span class="kw">EXPLAIN PLAN FOR</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> employees <span class="kw">WHERE</span> salary > <span class="num">80000</span>;
<span class="kw">SELECT</span> * <span class="kw">FROM</span> TABLE(<span class="fn">DBMS_XPLAN.DISPLAY</span>);`}</CodeBlock>
        <ConceptCard title="Useful Performance Views">
          <table>
            <thead><tr><th>View</th><th>Shows</th></tr></thead>
            <tbody>
              <tr><td><code>V$SQL</code></td><td>Cached SQL statements, execution counts, elapsed time</td></tr>
              <tr><td><code>V$SESSION</code></td><td>Active sessions, current SQL being executed</td></tr>
              <tr><td><code>USER_SEGMENTS</code></td><td>Space used by tables and indexes</td></tr>
              <tr><td><code>USER_INDEXES</code></td><td>Indexes on your tables</td></tr>
              <tr><td><code>DBMS_PROFILER</code></td><td>Line-by-line timing of PL/SQL execution</td></tr>
            </tbody>
          </table>
        </ConceptCard>
        <Checklist items={[
          { id: 'c_perf_1', label: 'Know the 5 golden rules of PL/SQL performance' },
          { id: 'c_perf_2', label: 'Can use EXPLAIN PLAN to analyze query execution' },
          { id: 'c_perf_3', label: 'Understand when to use set-based SQL vs procedural code' },
        ]} />
      </div>

      <div className="flex justify-between pt-8">
        <Link to="/module/3" className="font-heading font-bold text-muted hover:text-accent transition-colors no-underline">← Module 3</Link>
        <Link to="/interview" className="inline-block font-heading font-bold text-accent bg-accent/10 border border-accent/30 px-8 py-3 rounded-[10px] hover:bg-accent/20 transition-colors no-underline">
          Next → Interview Prep
        </Link>
      </div>
    </>
  );
}
