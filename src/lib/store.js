import { useState, useCallback, useEffect } from 'react';
import { SEED_CASES, EMP as SEED_EMP, OFFENCES as SEED_OFF } from '../data/model';
import { occurrenceFor } from './logic';

/* Persistent store for the review build.
   Cases, employees and the Table of Charges are all editable (add/edit/delete)
   and saved to localStorage so changes survive a refresh. The production app
   will persist these to MongoDB via the API instead. */

const LS = 'fsmpc_disc_v2';

function load() {
  try {
    const raw = localStorage.getItem(LS);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

export function useStore() {
  const initial = load();
  const [cases, setCases] = useState(() => initial?.cases ?? SEED_CASES.map(c => ({ ...c })));
  const [emps,  setEmps]  = useState(() => initial?.emps  ?? SEED_EMP.map(e => ({ ...e })));
  const [offs,  setOffs]  = useState(() => initial?.offs  ?? SEED_OFF.map(o => ({ ...o })));

  useEffect(() => {
    try { localStorage.setItem(LS, JSON.stringify({ cases, emps, offs })); } catch (e) { /* ignore */ }
  }, [cases, emps, offs]);

  /* ---- CASES ---- */
  const nextCaseId = useCallback((list) => {
    let max = 1060;
    list.forEach(c => { const m = /DC-(\d+)/.exec(c.id); if (m) max = Math.max(max, +m[1]); });
    return 'DC-' + (max + 1);
  }, []);

  const submitCase = useCallback((empId, offN, rec, desc, date, asDraft) => {
    setCases(prev => {
      const occ = occurrenceFor(+empId, +offN, prev);
      return [{
        id: nextCaseId(prev), empId: +empId, off: +offN, occ, rec,
        status: asDraft ? 'Draft' : 'With HR', raised: date || '2026-06-21', desc: desc || '',
      }, ...prev];
    });
  }, [nextCaseId]);

  const updateCase = useCallback((id, patch) =>
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c)), []);

  const deleteCase = useCallback((id) =>
    setCases(prev => prev.filter(c => c.id !== id)), []);

  /* lifecycle transitions (per the PDF process) */
  const issueNotice = useCallback((id, date) =>
    updateCase(id, { status: 'Awaiting Response', noticeDate: date || '2026-06-21' }), [updateCase]);
  const recordResponse = useCallback((id, response) =>
    updateCase(id, { status: 'Awaiting Decision', response }), [updateCase]);
  const recordDecision = useCallback((id, decision, outcome) =>
    updateCase(id, { status: 'Closed', decision, outcome: outcome || 'Upheld' }), [updateCase]);
  const lodgeAppeal = useCallback((id, appeal, date) =>
    updateCase(id, { status: 'Under Appeal', appeal, appealDate: date || '2026-06-21' }), [updateCase]);
  const ceoRuling = useCallback((id, decision, outcome) =>
    updateCase(id, { status: 'Closed', decision, outcome: outcome || 'Upheld by CEO' }), [updateCase]);

  /* ---- EMPLOYEES ---- */
  const addEmp = useCallback((e) => setEmps(prev => {
    const id = e.id || (Math.max(0, ...prev.map(x => x.id)) + 1);
    return [{ ...e, id: +id }, ...prev];
  }), []);
  const updateEmp = useCallback((id, patch) =>
    setEmps(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e)), []);
  const deleteEmp = useCallback((id) =>
    setEmps(prev => prev.filter(e => e.id !== id)), []);

  /* ---- OFFENCES (Table of Charges) ---- */
  const addOff = useCallback((o) => setOffs(prev => {
    const n = o.n || (Math.max(0, ...prev.map(x => x.n)) + 1);
    return [...prev, { ...o, n: +n }].sort((a, b) => a.n - b.n);
  }), []);
  const updateOff = useCallback((n, patch) =>
    setOffs(prev => prev.map(o => o.n === n ? { ...o, ...patch } : o)), []);
  const deleteOff = useCallback((n) =>
    setOffs(prev => prev.filter(o => o.n !== n)), []);

  const resetAll = useCallback(() => {
    if (confirm('Reset all cases, employees and charges back to the sample data?')) {
      setCases(SEED_CASES.map(c => ({ ...c })));
      setEmps(SEED_EMP.map(e => ({ ...e })));
      setOffs(SEED_OFF.map(o => ({ ...o })));
    }
  }, []);

  return {
    cases, emps, offs,
    submitCase, updateCase, deleteCase,
    issueNotice, recordResponse, recordDecision, lodgeAppeal, ceoRuling,
    addEmp, updateEmp, deleteEmp,
    addOff, updateOff, deleteOff,
    resetAll,
  };
}
