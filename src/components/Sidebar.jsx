import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

const NAV_SECTIONS = [
  {
    group: 'Getting Started',
    items: [
      { to: '/', label: 'Course Overview' },
    ],
  },
  {
    group: 'Module 1 — SQL Basics',
    items: [
      { to: '/module/1', label: '1.1 What is SQL?', hash: 'sql-intro' },
      { to: '/module/1', label: '1.2 DDL & DML', hash: 'ddl-dml' },
      { to: '/module/1', label: '1.3 SELECT Queries', hash: 'select' },
      { to: '/module/1', label: '1.4 JOINs', hash: 'joins' },
      { to: '/module/1', label: '1.5 GROUP BY', hash: 'groupby' },
      { to: '/module/1', label: '1.6 Subqueries', hash: 'subqueries' },
    ],
  },
  {
    group: 'Module 2 — PL/SQL Foundations',
    items: [
      { to: '/module/2', label: '2.1 What is PL/SQL?', hash: 'plsql-intro' },
      { to: '/module/2', label: '2.2 Block Structure', hash: 'block' },
      { to: '/module/2', label: '2.3 Variables & Types', hash: 'variables' },
      { to: '/module/2', label: '2.4 Control Structures', hash: 'control' },
      { to: '/module/2', label: '2.5 Loops', hash: 'loops' },
    ],
  },
  {
    group: 'Module 3 — Advanced PL/SQL',
    items: [
      { to: '/module/3', label: '3.1 Cursors', hash: 'cursors' },
      { to: '/module/3', label: '3.2 Exception Handling', hash: 'exceptions' },
      { to: '/module/3', label: '3.3 Stored Procedures', hash: 'procedures' },
      { to: '/module/3', label: '3.4 Functions', hash: 'functions' },
      { to: '/module/3', label: '3.5 Triggers', hash: 'triggers' },
      { to: '/module/3', label: '3.6 Packages', hash: 'packages' },
    ],
  },
  {
    group: 'Module 4 — Expert Level',
    items: [
      { to: '/module/4', label: '4.1 Collections & Records', hash: 'collections' },
      { to: '/module/4', label: '4.2 Bulk Operations', hash: 'bulk' },
      { to: '/module/4', label: '4.3 Dynamic SQL', hash: 'dynamic' },
      { to: '/module/4', label: '4.4 Performance Tuning', hash: 'performance' },
    ],
  },
  {
    group: 'Capstone',
    items: [
      { to: '/interview', label: 'Interview Prep' },
      { to: '/project', label: 'Final Project' },
    ],
  },
];

// Count total checkboxes from IDs we know exist
const ALL_CHECKBOX_IDS_COUNT = 85;

export default function Sidebar() {
  const { totalChecked } = useProgress();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pct = Math.round((totalChecked / ALL_CHECKBOX_IDS_COUNT) * 100);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        id="menu-toggle"
        className="hidden fixed top-4 left-4 z-200 bg-surface border border-border rounded-md px-3 py-2 cursor-pointer text-text-main text-[0.9rem]"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      <nav
        id="sidebar"
        className={`fixed left-0 top-0 bottom-0 w-[270px] bg-surface border-r border-border overflow-y-auto z-100 pb-8 transition-transform duration-300 ${mobileOpen ? 'open' : ''}`}
      >
        {/* Header */}
        <div className="h-14 px-5 border-b border-border sticky top-0 bg-surface z-2 flex items-center">
          <h1 className="font-heading text-[1.1rem] font-extrabold text-accent tracking-tight leading-tight">
            PL/SQL Masterclass
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="px-5 py-3 border-b border-border bg-surface sticky top-[56px] z-2">
          <div className="text-[0.7rem] text-muted mb-1 flex justify-between">
            Your Progress <span className="text-accent font-semibold">{pct}%</span>
          </div>
          <div className="bg-border rounded h-1.5">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Nav Groups */}
        {NAV_SECTIONS.map(section => (
          <div key={section.group} className="py-2">
            <div className="px-5 text-[0.65rem] font-mono text-muted uppercase tracking-widest py-1">
              {section.group}
            </div>
            {section.items.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.hash ? `${item.to}#${item.hash}` : item.to}
                className={({ isActive }) =>
                  `nav-item ${isActive && !item.hash ? 'active' : ''} ${location.pathname === item.to ? (item.hash ? '' : 'active') : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <span className="dot" />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
