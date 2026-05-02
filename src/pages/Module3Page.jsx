import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { ConceptCard } from '../components/Cards';
import { AnalogyBox, TipBox, WarnBox } from '../components/Callouts';
import CodeBlock from '../components/CodeBlock';
import Checklist from '../components/Checklist';
import PracticeSection from '../components/PracticeSection';
import InterviewCard from '../components/InterviewCard';

export default function Module3Page() {
  return (
    <>
      <div className="mb-6">
        <Link to="/module/2" className="text-muted text-sm hover:text-accent transition-colors">← Module 2: PL/SQL Foundations</Link>
      </div>
      <h1 className="font-heading text-3xl font-extrabold mb-2">Module 3 <span className="text-purple">— Advanced PL/SQL</span></h1>
      <p className="text-muted mb-12 text-[0.9rem]">Cursors, exceptions, procedures, functions, triggers & packages</p>

      {/* 3.1 Cursors */}
      <div className="mb-16 pb-12 border-b border-border" id="cursors">
        <SectionHeader num="3.1" title="Cursors" sub="Processing multiple rows one at a time" />
        <AnalogyBox icon="☕ Analogy">
          A cursor is like a <strong>reading pointer</strong> on a spreadsheet. Your SELECT query returns many rows, and the cursor lets you point to one row at a time, read it, process it, then move to the next.
        </AnalogyBox>
        <ConceptCard title="Implicit vs Explicit Cursors">
          <ul className="ml-5 space-y-1">
            <li><strong>Implicit Cursor:</strong> Auto-created by Oracle for any DML statement. Access via SQL%ROWCOUNT, SQL%FOUND, SQL%NOTFOUND</li>
            <li><strong>Explicit Cursor:</strong> Manually declared and controlled when you need to process multiple rows</li>
          </ul>
        </ConceptCard>
        <CodeBlock label="PL/SQL — Cursors (All Styles)">{`<span class="cmt">-- ─── STYLE 1: Cursor FOR Loop (RECOMMENDED) ───</span>
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> <span class="var">emp_rec</span> <span class="kw">IN</span> (<span class="kw">SELECT</span> first_name, salary
                   <span class="kw">FROM</span>   employees
                   <span class="kw">WHERE</span>  dept_id = <span class="num">10</span>)
    <span class="kw">LOOP</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="var">emp_rec</span>.first_name || <span class="str">' → $'</span> || <span class="var">emp_rec</span>.salary);
    <span class="kw">END LOOP</span>;
<span class="kw">END</span>;
<span class="kw">/</span>

<span class="cmt">-- ─── STYLE 2: Explicit Cursor (full control) ───</span>
<span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> <span class="var">c_emp</span> <span class="kw">IS</span>
        <span class="kw">SELECT</span> emp_id, first_name, salary
        <span class="kw">FROM</span>   employees
        <span class="kw">WHERE</span>  salary > <span class="num">60000</span>
        <span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>;
    <span class="var">v_emp</span>  <span class="var">c_emp</span>%<span class="kw">ROWTYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">OPEN</span>  <span class="var">c_emp</span>;
    <span class="kw">LOOP</span>
        <span class="kw">FETCH</span> <span class="var">c_emp</span> <span class="kw">INTO</span> <span class="var">v_emp</span>;
        <span class="kw">EXIT WHEN</span> <span class="var">c_emp</span>%NOTFOUND;
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="var">v_emp</span>.first_name || <span class="str">' earns '</span> || <span class="var">v_emp</span>.salary);
    <span class="kw">END LOOP</span>;
    <span class="kw">CLOSE</span> <span class="var">c_emp</span>;
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <TipBox>
          Prefer the <strong>Cursor FOR Loop</strong> (Style 1) for most cases — Oracle optimizes it internally. Explicit cursors are needed when you require finer control (e.g., UPDATE with WHERE CURRENT OF).
        </TipBox>
        <InterviewCard badge="Interview Q" title="Frequently Asked" question='"What is the difference between implicit and explicit cursors?"' answer={`<strong>Implicit cursors</strong> are automatically created by Oracle for every DML and SELECT INTO. They're fine for single-row operations.<br/><br/><strong>Explicit cursors</strong> are manually declared for multi-row queries. You have full control: OPEN, FETCH, CLOSE.<br/><br/><strong>Choose explicit</strong> when: processing multiple rows, needing cursor attributes, doing parameterized queries, or using FOR UPDATE / WHERE CURRENT OF.`} />
        <PracticeSection title="Practice Questions — Cursors" items={[
          { id: 'p_cur_1', label: '<strong>Q1:</strong> Using a cursor FOR loop, print all employees and give a 10% raise if they earn less than 60000.' },
          { id: 'p_cur_2', label: '<strong>Q2:</strong> Write an explicit cursor that fetches the top 5 highest-paid employees.' },
          { id: 'p_cur_3', label: '<strong>Q3:</strong> What happens if you FETCH from a closed cursor?' },
        ]} />
        <Checklist items={[
          { id: 'c_cur_1', label: 'Can write Cursor FOR loops (inline query style)' },
          { id: 'c_cur_2', label: 'Can DECLARE, OPEN, FETCH, CLOSE explicit cursors' },
          { id: 'c_cur_3', label: 'Understand cursor attributes (%FOUND, %NOTFOUND, %ROWCOUNT, %ISOPEN)' },
          { id: 'c_cur_4', label: 'Can write parameterized cursors' },
        ]} />
      </div>

      {/* 3.2 Exception Handling */}
      <div className="mb-16 pb-12 border-b border-border" id="exceptions">
        <SectionHeader num="3.2" title="Exception Handling" sub="Graceful error management — what separates pros from beginners" />
        <AnalogyBox icon="🛡️ Analogy">
          Exception handling is like an airbag in a car. In normal driving (BEGIN block), the airbag is inactive. When a crash happens (an error), the airbag deploys (EXCEPTION block). Without it, the crash is fatal.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — Exception Handling">{`<span class="kw">DECLARE</span>
    <span class="var">v_emp</span>    employees%<span class="kw">ROWTYPE</span>;
    <span class="var">v_empid</span>  <span class="type">NUMBER</span> := <span class="num">999</span>;
    <span class="var">e_low_salary</span>  <span class="kw">EXCEPTION</span>;
    <span class="var">v_salary</span>      <span class="type">NUMBER</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> * <span class="kw">INTO</span> <span class="var">v_emp</span>
    <span class="kw">FROM</span>   employees
    <span class="kw">WHERE</span>  emp_id = <span class="var">v_empid</span>;

    <span class="var">v_salary</span> := <span class="num">25000</span>;
    <span class="kw">IF</span> <span class="var">v_salary</span> < <span class="num">30000</span> <span class="kw">THEN</span>
        <span class="kw">RAISE</span> <span class="var">e_low_salary</span>;
    <span class="kw">END IF</span>;
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'❌ Employee not found.'</span>);
    <span class="kw">WHEN</span> TOO_MANY_ROWS <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'❌ Query returned > 1 row!'</span>);
    <span class="kw">WHEN</span> <span class="var">e_low_salary</span> <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'❌ Salary too low: '</span> || <span class="var">v_salary</span>);
    <span class="kw">WHEN</span> OTHERS <span class="kw">THEN</span>
        <span class="fn">DBMS_OUTPUT.PUT_LINE</span>(<span class="str">'❌ Error: '</span> || <span class="fn">SQLCODE</span> || <span class="str">' - '</span> || <span class="fn">SQLERRM</span>);
        <span class="kw">RAISE</span>;
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <ConceptCard title="Named System Exceptions Cheat Sheet">
          <table>
            <thead><tr><th>Exception Name</th><th>Oracle Error</th><th>When it happens</th></tr></thead>
            <tbody>
              <tr><td>NO_DATA_FOUND</td><td>ORA-01403</td><td>SELECT INTO returns 0 rows</td></tr>
              <tr><td>TOO_MANY_ROWS</td><td>ORA-01422</td><td>SELECT INTO returns &gt;1 row</td></tr>
              <tr><td>ZERO_DIVIDE</td><td>ORA-01476</td><td>Division by zero</td></tr>
              <tr><td>DUP_VAL_ON_INDEX</td><td>ORA-00001</td><td>Unique constraint violated</td></tr>
              <tr><td>VALUE_ERROR</td><td>ORA-06502</td><td>Type/size mismatch</td></tr>
              <tr><td>OTHERS</td><td>All others</td><td>Catch-all handler</td></tr>
            </tbody>
          </table>
        </ConceptCard>
        <WarnBox title="⚠️ Anti-Pattern">
          Never use just <code className="font-mono">WHEN OTHERS THEN NULL;</code> — this silently swallows ALL errors. Always log or re-raise.
        </WarnBox>
        <Checklist items={[
          { id: 'c_exc_1', label: 'Know all named system exceptions and when they fire' },
          { id: 'c_exc_2', label: 'Can create and RAISE user-defined exceptions' },
          { id: 'c_exc_3', label: 'Use SQLCODE, SQLERRM in OTHERS handler' },
          { id: 'c_exc_4', label: 'Know RAISE_APPLICATION_ERROR for custom error codes' },
        ]} />
      </div>

      {/* 3.3 Stored Procedures */}
      <div className="mb-16 pb-12 border-b border-border" id="procedures">
        <SectionHeader num="3.3" title="Stored Procedures" sub="Named, reusable PL/SQL programs stored in the database" />
        <AnalogyBox icon="🔧 Analogy">
          A stored procedure is like a <strong>saved macro</strong> in the database. Instead of writing the same 50-line block every time, you save it with a name and call it with one line.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — Stored Procedures">{`<span class="kw">CREATE OR REPLACE PROCEDURE</span> <span class="fn">give_raise</span> (
    <span class="var">p_emp_id</span>    <span class="kw">IN</span>     employees.emp_id%<span class="kw">TYPE</span>,
    <span class="var">p_pct</span>       <span class="kw">IN</span>     <span class="type">NUMBER</span>,
    <span class="var">p_new_sal</span>   <span class="kw">OUT</span>    employees.salary%<span class="kw">TYPE</span>,
    <span class="var">p_status</span>    <span class="kw">OUT</span>    <span class="type">VARCHAR2</span>
)
<span class="kw">AS</span>
    <span class="var">v_curr_sal</span>  employees.salary%<span class="kw">TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> salary <span class="kw">INTO</span> <span class="var">v_curr_sal</span>
    <span class="kw">FROM</span>   employees <span class="kw">WHERE</span> emp_id = <span class="var">p_emp_id</span>;

    <span class="var">p_new_sal</span> := <span class="var">v_curr_sal</span> * (<span class="num">1</span> + <span class="var">p_pct</span> / <span class="num">100</span>);
    <span class="kw">UPDATE</span> employees <span class="kw">SET</span> salary = <span class="var">p_new_sal</span>
    <span class="kw">WHERE</span>  emp_id = <span class="var">p_emp_id</span>;

    <span class="var">p_status</span> := <span class="str">'SUCCESS'</span>;
    <span class="kw">COMMIT</span>;
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        <span class="var">p_status</span> := <span class="str">'ERROR: Not found'</span>;
<span class="kw">END</span> give_raise;
<span class="kw">/</span>`}</CodeBlock>
        <ConceptCard title="IN / OUT / IN OUT Parameters">
          <table>
            <thead><tr><th>Mode</th><th>Direction</th><th>Can read?</th><th>Can assign?</th></tr></thead>
            <tbody>
              <tr><td><code>IN</code></td><td>Caller → Procedure</td><td>✅</td><td>❌ Read-only</td></tr>
              <tr><td><code>OUT</code></td><td>Procedure → Caller</td><td>❌ initially</td><td>✅ Write-only</td></tr>
              <tr><td><code>IN OUT</code></td><td>Both directions</td><td>✅</td><td>✅</td></tr>
            </tbody>
          </table>
        </ConceptCard>
        <Checklist items={[
          { id: 'c_proc_1', label: 'Can CREATE OR REPLACE procedures with IN/OUT parameters' },
          { id: 'c_proc_2', label: 'Can call procedures using named notation (param => value)' },
          { id: 'c_proc_3', label: 'Know how to debug using USER_ERRORS' },
        ]} />
      </div>

      {/* 3.4 Functions */}
      <div className="mb-16 pb-12 border-b border-border" id="functions">
        <SectionHeader num="3.4" title="Functions" sub="Procedures that return a value — usable inside SQL queries" />
        <ConceptCard title="Procedure vs Function — Key Differences">
          <table>
            <thead><tr><th></th><th>Procedure</th><th>Function</th></tr></thead>
            <tbody>
              <tr><td>Returns value?</td><td>❌ (uses OUT params)</td><td>✅ Exactly one value</td></tr>
              <tr><td>Used in SQL?</td><td>❌ Cannot</td><td>✅ Can use in SELECT</td></tr>
              <tr><td>RETURN statement</td><td>Optional</td><td>Mandatory</td></tr>
            </tbody>
          </table>
        </ConceptCard>
        <CodeBlock label="PL/SQL — Functions">{`<span class="kw">CREATE OR REPLACE FUNCTION</span> <span class="fn">get_annual_salary</span> (
    <span class="var">p_emp_id</span>  <span class="kw">IN</span>  employees.emp_id%<span class="kw">TYPE</span>
) <span class="kw">RETURN NUMBER</span>
<span class="kw">IS</span>
    <span class="var">v_monthly</span>  employees.salary%<span class="kw">TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> salary <span class="kw">INTO</span> <span class="var">v_monthly</span>
    <span class="kw">FROM</span>   employees <span class="kw">WHERE</span> emp_id = <span class="var">p_emp_id</span>;
    <span class="kw">RETURN</span> <span class="var">v_monthly</span> * <span class="num">12</span>;
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN RETURN</span> <span class="num">0</span>;
<span class="kw">END</span> get_annual_salary;
<span class="kw">/</span>

<span class="cmt">-- USE function in SQL query (POWERFUL!)</span>
<span class="kw">SELECT</span> first_name, salary,
       <span class="fn">get_annual_salary</span>(emp_id) <span class="kw">AS</span> annual
<span class="kw">FROM</span>   employees;`}</CodeBlock>
        <Checklist items={[
          { id: 'c_fn_1', label: 'Can create functions with RETURN clause' },
          { id: 'c_fn_2', label: 'Know functions can be called inside SQL SELECT statements' },
          { id: 'c_fn_3', label: 'Understand the key differences between procedures and functions' },
        ]} />
      </div>

      {/* 3.5 Triggers */}
      <div className="mb-16 pb-12 border-b border-border" id="triggers">
        <SectionHeader num="3.5" title="Triggers" sub="Automatic code that fires on database events" />
        <AnalogyBox icon="🔔 Analogy">
          A trigger is like a <strong>motion sensor light</strong>. You don't turn the light on manually — it automatically turns on when it detects motion (an event). In the database, the "motion" is an INSERT, UPDATE, or DELETE.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — Triggers">{`<span class="cmt">-- BEFORE INSERT trigger: Auto-generate emp_id</span>
<span class="kw">CREATE OR REPLACE TRIGGER</span> <span class="fn">trg_emp_id</span>
<span class="kw">BEFORE INSERT ON</span> employees
<span class="kw">FOR EACH ROW</span>
<span class="kw">BEGIN</span>
    <span class="kw">IF</span> :<span class="kw">NEW</span>.emp_id <span class="kw">IS NULL THEN</span>
        <span class="kw">SELECT</span> emp_seq.NEXTVAL
        <span class="kw">INTO</span>   :<span class="kw">NEW</span>.emp_id <span class="kw">FROM</span> DUAL;
    <span class="kw">END IF</span>;
    :<span class="kw">NEW</span>.hire_date := <span class="fn">SYSDATE</span>;
<span class="kw">END</span>;
<span class="kw">/</span>

<span class="cmt">-- AFTER UPDATE trigger: Audit log</span>
<span class="kw">CREATE OR REPLACE TRIGGER</span> <span class="fn">trg_salary_audit</span>
<span class="kw">AFTER UPDATE OF</span> salary <span class="kw">ON</span> employees
<span class="kw">FOR EACH ROW</span>
<span class="kw">WHEN</span> (:<span class="kw">NEW</span>.salary != :<span class="kw">OLD</span>.salary)
<span class="kw">BEGIN</span>
    <span class="kw">INSERT INTO</span> salary_audit (emp_id, old_salary, new_salary, changed_by)
    <span class="kw">VALUES</span> (:<span class="kw">NEW</span>.emp_id, :<span class="kw">OLD</span>.salary, :<span class="kw">NEW</span>.salary, <span class="fn">USER</span>);
<span class="kw">END</span>;
<span class="kw">/</span>`}</CodeBlock>
        <ConceptCard title="Trigger Anatomy Quick Reference">
          <table>
            <thead><tr><th>Component</th><th>Options</th></tr></thead>
            <tbody>
              <tr><td>Timing</td><td>BEFORE, AFTER, INSTEAD OF</td></tr>
              <tr><td>Event</td><td>INSERT, UPDATE, DELETE, UPDATE OF column</td></tr>
              <tr><td>Scope</td><td>FOR EACH ROW (row-level), Statement-level (default)</td></tr>
              <tr><td>Pseudorecords</td><td>:NEW (new row), :OLD (old row)</td></tr>
            </tbody>
          </table>
        </ConceptCard>
        <Checklist items={[
          { id: 'c_trg_1', label: 'Can write BEFORE/AFTER INSERT/UPDATE/DELETE triggers' },
          { id: 'c_trg_2', label: 'Understand :NEW and :OLD pseudorecords' },
          { id: 'c_trg_3', label: 'Know row-level vs statement-level triggers' },
          { id: 'c_trg_4', label: 'Can write INSTEAD OF triggers for views' },
        ]} />
      </div>

      {/* 3.6 Packages */}
      <div className="mb-16 pb-12 border-b border-border" id="packages">
        <SectionHeader num="3.6" title="Packages" sub="Grouping related code — the professional way" />
        <AnalogyBox icon="📦 Analogy">
          A package is like a <strong>toolbox</strong>. Instead of having tools scattered everywhere, you organize them into themed toolboxes. The <strong>Package Spec</strong> is the label on the toolbox, and the <strong>Package Body</strong> is the actual tools.
        </AnalogyBox>
        <CodeBlock label="PL/SQL — Package Spec + Body">{`<span class="cmt">-- PACKAGE SPECIFICATION (the "interface")</span>
<span class="kw">CREATE OR REPLACE PACKAGE</span> <span class="fn">emp_mgmt</span> <span class="kw">AS</span>
    <span class="var">c_min_salary</span>  <span class="kw">CONSTANT</span> <span class="type">NUMBER</span> := <span class="num">30000</span>;

    <span class="kw">PROCEDURE</span> hire_employee (
        <span class="var">p_name</span> <span class="kw">IN</span> <span class="type">VARCHAR2</span>, <span class="var">p_salary</span> <span class="kw">IN</span> <span class="type">NUMBER</span>,
        <span class="var">p_dept</span> <span class="kw">IN</span> <span class="type">NUMBER</span>,  <span class="var">p_emp_id</span> <span class="kw">OUT NUMBER</span>
    );
    <span class="kw">FUNCTION</span> get_salary (<span class="var">p_emp_id</span> <span class="kw">IN NUMBER</span>) <span class="kw">RETURN NUMBER</span>;
<span class="kw">END</span> emp_mgmt;
<span class="kw">/</span>

<span class="cmt">-- PACKAGE BODY (the "implementation")</span>
<span class="kw">CREATE OR REPLACE PACKAGE BODY</span> <span class="fn">emp_mgmt</span> <span class="kw">AS</span>
    <span class="cmt">-- Private variable</span>
    <span class="var">g_last_hire_id</span>  <span class="type">NUMBER</span> := <span class="num">0</span>;

    <span class="kw">PROCEDURE</span> hire_employee (
        <span class="var">p_name</span> <span class="kw">IN</span> <span class="type">VARCHAR2</span>, <span class="var">p_salary</span> <span class="kw">IN</span> <span class="type">NUMBER</span>,
        <span class="var">p_dept</span> <span class="kw">IN</span> <span class="type">NUMBER</span>,  <span class="var">p_emp_id</span> <span class="kw">OUT NUMBER</span>
    ) <span class="kw">IS</span>
    <span class="kw">BEGIN</span>
        <span class="kw">IF</span> <span class="var">p_salary</span> < <span class="var">c_min_salary</span> <span class="kw">THEN</span>
            <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="num">20001</span>, <span class="str">'Salary below minimum!'</span>);
        <span class="kw">END IF</span>;
        <span class="kw">INSERT INTO</span> employees (emp_id, first_name, salary, dept_id)
        <span class="kw">VALUES</span> (<span class="var">p_emp_id</span>, <span class="var">p_name</span>, <span class="var">p_salary</span>, <span class="var">p_dept</span>);
        <span class="kw">COMMIT</span>;
    <span class="kw">END</span> hire_employee;

    <span class="kw">FUNCTION</span> get_salary (<span class="var">p_emp_id</span> <span class="kw">IN NUMBER</span>) <span class="kw">RETURN NUMBER IS</span>
        <span class="var">v_sal</span> <span class="type">NUMBER</span>;
    <span class="kw">BEGIN</span>
        <span class="kw">SELECT</span> salary <span class="kw">INTO</span> <span class="var">v_sal</span>
        <span class="kw">FROM</span> employees <span class="kw">WHERE</span> emp_id = <span class="var">p_emp_id</span>;
        <span class="kw">RETURN</span> <span class="var">v_sal</span>;
    <span class="kw">EXCEPTION</span>
        <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN RETURN NULL</span>;
    <span class="kw">END</span> get_salary;
<span class="kw">END</span> emp_mgmt;
<span class="kw">/</span>`}</CodeBlock>
        <Checklist items={[
          { id: 'c_pkg_1', label: 'Understand Package Spec (public) vs Package Body (implementation)' },
          { id: 'c_pkg_2', label: 'Can write a complete package with procedures and functions' },
          { id: 'c_pkg_3', label: 'Know public vs private package members' },
          { id: 'c_pkg_4', label: 'Can call package methods using package_name.method_name syntax' },
        ]} />
      </div>

      <div className="flex justify-between pt-8">
        <Link to="/module/2" className="font-heading font-bold text-muted hover:text-accent transition-colors no-underline">← Module 2</Link>
        <Link to="/module/4" className="inline-block font-heading font-bold text-accent bg-accent/10 border border-accent/30 px-8 py-3 rounded-[10px] hover:bg-accent/20 transition-colors no-underline">
          Next → Module 4: Expert Level
        </Link>
      </div>
    </>
  );
}
