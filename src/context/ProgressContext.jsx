import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProgressContext = createContext();

const STORAGE_KEY = 'plsql_progress';
const NAME_KEY = 'plsql_username';

export function ProgressProvider({ children }) {
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(NAME_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem(NAME_KEY, userName);
  }, [userName]);

  const toggle = useCallback((id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isChecked = useCallback((id) => !!checked[id], [checked]);

  const totalChecked = Object.values(checked).filter(Boolean).length;

  return (
    <ProgressContext.Provider value={{ checked, toggle, isChecked, totalChecked, userName, setUserName }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
