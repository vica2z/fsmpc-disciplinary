import React, { useState, useMemo } from 'react';
import { OFFENCES, CATS, CAT_ICON, EMP, EXECUTIVES, APPRAISAL_STATUSES, appraisalStatus, apprStatusClass, COUNSEL_OUTCOMES, PEN_ORDER, ROLES, STEPS, PANEL_GUIDE, ROLE_NAV, ROLE_ORDER } from './data/model';
import {
  offByN, occurrenceFor, occLabel, rangeForOcc,
  penClass, penFull, optionsInRange, rangeChips, empById,
  fmtDate, statusClass,
} from './lib/logic';
import { useStore } from './lib/store';

export default function App() {
  const store = useStore();
  const [role, setRole] = useState('lm');
  const [execId, setExecId] = useState(EXECUTIVES[0].id);
  const nav = ROLE_NAV[role];
  const [view, setView] = useState(nav[0].id);

  function switchRole(r) { setRole(r); setView(ROLE_NAV[r][0].id); }

  const roleInfo = ROLES[role];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <div><div className="brand-name">FSMPC</div><div className="brand-sub">Disciplinary Management</div></div>
        </div>
        <nav className="nav">
          {nav.map(n => (
            <button key={n.id} className={'nav-item' + (view === n.id ? ' active' : '')} onClick={() => setView(n.id)}>
              <span className="nav-ico">{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button className="btn btn-ghost btn-sm" style={{ width: '100%' }} onClick={store.resetAll}>↺ Reset sample data</button>
          <div className="demo-tag" style={{ marginTop: 8 }}>Review build · saved locally</div>
        </div>
      </aside>

      <main className="main">
        <div className="role-bar">
          <span className="role-bar-label">Viewing as</span>
          <div className="role-switch">
            {ROLE_ORDER.map(r => (
              <button key={r} className={'role-pill' + (role === r ? ' on' : '')}
                style={role === r ? { background: ROLES[r].c, color: '#fff' } : {}}
                onClick={() => switchRole(r)}>{ROLES[r].name}</button>
            ))}
          </div>
          <span className="role-current" style={{ color: roleInfo.c, background: roleInfo.bg }}>{roleInfo.name} view</span>
        </div>
        {role === 'exec' && (
          <div className="exec-bar">
            <span className="role-bar-label">Executive</span>
            <select className="input exec-select" value={execId} onChange={e => setExecId(e.target.value)}>
              {EXECUTIVES.map(x => <option key={x.id} value={x.id}>{x.name} — {x.title}</option>)}
            </select>
          </div>
        )}

        {/* ICT */}
        {view === 'setup' && <Setup store={store} />}
        {view === 'employees' && <Employees store={store} />}
        {view === 'audit' && <AuditLog store={store} />}
        {/* Line Manager */}
        {view === 'lm-queue' && <LMQueue store={store} setView={setView} />}
        {view === 'lm-raise' && <LMRaise store={store} setView={setView} />}
        {view === 'lm-counsel' && <LMCounselling store={store} />}
        {view === 'counsel-log' && <CounsellingLog store={store} />}
        {view === 'exec-counsel' && <ExecCounselling store={store} execId={execId} />}
        {/* HR */}
        {view === 'hr-queue' && <HRQueue store={store} />}
        {view === 'hr-all' && <HRAll store={store} />}
        {/* Staff */}
        {view === 'staff-notices' && <StaffNotices store={store} />}
        {/* CEO */}
        {view === 'ceo-referrals' && <CEOReferrals store={store} />}
        {view === 'ceo-appeals' && <CEOAppeals store={store} />}
        {view === 'smt-queue' && <SMTQueue store={store} />}
        {view === 'smt-decided' && <SMTDecided store={store} />}
        {/* Executive */}
        {view === 'exec-portfolio' && <ExecPortfolio store={store} execId={execId} />}
        {view === 'exec-appraisals' && <ExecAppraisals store={store} execId={execId} />}
        {view === 'exec-discipline' && <ExecDiscipline store={store} execId={execId} />}
        {/* shared */}
        {view === 'charges' && <Charges store={store} role={role} />}
        {view === 'report' && <Report store={store} />}
        {view === 'howto' && <HowItWorks />}
      </main>
    </div>
  );
}

/* Guide banner (per panel) */
function GuideBanner({ view }) {
  const [open, setOpen] = useState(true);
  const g = PANEL_GUIDE[view];
  if (!g) return null;
  const role = ROLES[g.role] || { name: '', c: '#667085', bg: '#F3F1EC' };
  return (
    <div className="guide">
      <div className="guide-head" onClick={() => setOpen(o => !o)}>
        <span className="guide-ico">ℹ️</span><b>{g.title}</b>
        <span className="role-badge" style={{ color: role.c, background: role.bg, marginLeft: 8 }}>{role.name}</span>
        <span className="guide-toggle">{open ? 'Hide' : 'Show'}</span>
      </div>
      {open && <ul className="guide-list">{g.points.map((p, i) => <li key={i}>{p}</li>)}</ul>}
    </div>
  );
}

/* ═══════════ ICT ADMIN ═══════════ */
function Setup({ store }) {
  const { cases, emps, offs, logs } = store;
  const rows = [
    ['Table of Charges', offs.length + ' offences loaded', true],
    ['Employees on file', emps.length + ' staff records', true],
    ['Roles & permissions', 'LM raises · HR reviews · CEO approves · Staff responds', true],
    ['Working-day timers', '5 days to respond · 10 days to appeal', true],
    ['Audit logging', logs.length + ' actions recorded — ON', true],
  ];
  return (
    <div className="page">
      <PageHead title="System Setup" sub="One-time configuration of the disciplinary module" />
      <GuideBanner view="setup" />
      <div className="stat-grid">
        <Stat n={cases.length} label="Total cases" color="#0891B2" />
        <Stat n={emps.length} label="Employees" color="#1E40AF" />
        <Stat n={offs.length} label="Offences" color="#B45309" />
        <Stat n={logs.length} label="Audit entries" color="#6D28D9" />
      </div>
      <Card title="Configuration checklist" sub="Everything the module needs to run">
        {rows.map(([t, s], i) => (
          <div key={i} className="setup-row">
            <span className="setup-check">✓</span>
            <div><div className="setup-t">{t}</div><div className="sub">{s}</div></div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AuditLog({ store }) {
  const { logs } = store;
  return (
    <div className="page">
      <PageHead title="Audit Log" sub="Every action taken in the disciplinary system, most recent first" />
      <Card>
        {logs.length ? (
          <table className="table">
            <thead><tr><th>When</th><th>Role</th><th>Case</th><th>Action</th></tr></thead>
            <tbody>
              {logs.map(l => (
                <tr key={l.id}>
                  <td className="sub">{new Date(l.ts).toLocaleString('en-GB')}</td>
                  <td><span className="role-badge" style={{ color: (ROLES[l.role] || {}).c, background: (ROLES[l.role] || {}).bg }}>{(ROLES[l.role] || {}).name || l.role}</span></td>
                  <td className="mono">{l.caseId || '—'}</td>
                  <td>{l.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <Empty>No actions recorded yet. Raise or progress a case to see the trail.</Empty>}
      </Card>
    </div>
  );
}

/* ═══════════ LINE MANAGER ═══════════ */
function LMQueue({ store, setView }) {
  const { cases, emps, offs } = store;
  const mine = cases.filter(c => c.status === 'Draft' || c.status === 'With HR');
  return (
    <div className="page">
      <PageHead title="My Team — Disciplinary" sub="Cases you have raised or are drafting"
        right={<button className="btn btn-navy" onClick={() => setView('lm-raise')}>+ Raise a case</button>} />
      <GuideBanner view="lm-queue" />
      <Card title="Your cases" sub="Drafts and cases now with HR">
        {mine.length ? (
          <table className="table">
            <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>Recommended</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {mine.map(c => {
                const e = empById(c.empId, emps), o = offByN(c.off, offs);
                return (
                  <tr key={c.id}>
                    <td className="mono">{c.id}</td>
                    <td><b>{e?.name}</b><div className="sub">{e?.title}</div></td>
                    <td>{o?.name}</td>
                    <td><span className={'chip ' + penClass(c.rec)}>{c.rec}</span> {penFull(c.rec)}</td>
                    <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span></td>
                    <td className="row-actions">
                      {c.status === 'Draft' && <button className="btn btn-sm btn-navy" onClick={() => store.submitToHR(c.id)}>Submit to HR</button>}
                      {c.status === 'Draft' && <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Delete draft ' + c.id + '?')) store.deleteCase(c.id); }}>Delete</button>}
                      {c.status === 'With HR' && <span className="sub">With HR for review</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <Empty>No active cases. Use “Raise a case” to start one.</Empty>}
      </Card>
    </div>
  );
}


/* ═══════════ COUNSELLING (LM) — the informal pre-case step ═══════════ */
function counselOutcomeClass(o){
  return o === 'Resolved' ? 'st-closed' : o === 'Verbal admonishment' ? 'st-hr' : o === 'Escalated' ? 'st-appeal' : 'st-draft';
}

function LMCounselling({ store }) {
  const { couns, emps } = store;
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [escalating, setEscalating] = useState(null);
  return (
    <div className="page">
      <PageHead title="Counselling" sub="The informal first step — counsel and record before any formal case"
        right={<button className="btn btn-navy" onClick={() => setAdding(true)}>+ Log counselling</button>} />
      <GuideBanner view="lm-counsel" />
      <Card>
        {couns.length ? (
          <table className="table">
            <thead><tr><th>Ref</th><th>Employee</th><th>Issue</th><th>Date</th><th>Outcome</th><th>Manage</th></tr></thead>
            <tbody>
              {couns.map(c => {
                const e = empById(c.empId, emps);
                return (
                  <tr key={c.id}>
                    <td className="mono">{c.id}</td>
                    <td><b>{e?.name}</b><div className="sub">{e?.title}</div></td>
                    <td>{c.topic}<div className="sub">{c.discussed}</div></td>
                    <td>{c.date}</td>
                    <td><span className={'pill ' + counselOutcomeClass(c.outcome)}>{c.outcome}</span>{c.escalatedTo && <div className="sub">→ {c.escalatedTo}</div>}</td>
                    <td className="row-actions">
                      {c.outcome !== 'Escalated' && <button className="btn btn-sm btn-navy" onClick={() => setEscalating(c)}>Escalate</button>}
                      {c.outcome !== 'Escalated' && <button className="btn btn-sm btn-ghost" onClick={() => setEditing(c)}>Edit</button>}
                      {c.outcome !== 'Escalated' && <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Delete counselling ' + c.id + '?')) store.deleteCounselling(c.id); }}>Delete</button>}
                      {c.outcome === 'Escalated' && <span className="sub">Now a formal case</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <Empty>No counselling recorded yet. Log the informal step here before raising a case.</Empty>}
      </Card>
      {(adding || editing) && <CounsellingModal store={store} rec={editing} onClose={() => { setAdding(false); setEditing(null); }} />}
      {escalating && <EscalateModal store={store} cn={escalating} onClose={() => setEscalating(null)} />}
    </div>
  );
}

function CounsellingModal({ store, rec, onClose }) {
  const { emps } = store;
  const isNew = !rec;
  const [f, setF] = useState({
    empId: rec?.empId || '', topic: rec?.topic || '', discussed: rec?.discussed || '',
    outcome: rec?.outcome || 'Resolved', date: rec?.date || '2026-06-21', by: rec?.by || '',
  });
  const set = k => e => setF(s => ({ ...s, [k]: e.target.value }));
  function save() {
    if (!f.empId) { alert('Select an employee.'); return; }
    if (!f.topic.trim()) { alert('Describe the issue.'); return; }
    const sup = empById(+f.empId, emps)?.sup || f.by;
    const payload = { ...f, empId: +f.empId, by: f.by || sup };
    if (isNew) store.addCounselling(payload); else store.updateCounselling(rec.id, payload);
    onClose();
  }
  return (
    <Modal title={isNew ? 'Log counselling' : `Edit ${rec.id}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={save}>{isNew ? 'Save' : 'Save changes'}</button></>}>
      <Field label="Employee">
        <select className="input" value={f.empId} onChange={set('empId')} disabled={!isNew}>
          <option value="">— Select employee —</option>
          {emps.map(e => <option key={e.id} value={e.id}>{e.name} — {e.title}</option>)}
        </select>
      </Field>
      <Field label="Issue / concern"><textarea className="input" rows={2} value={f.topic} onChange={set('topic')} placeholder="What performance or conduct problem occurred…" /></Field>
      <Field label="What was discussed"><textarea className="input" rows={2} value={f.discussed} onChange={set('discussed')} placeholder="The counselling conversation, and any agreement reached…" /></Field>
      <div className="form-grid">
        <Field label="Outcome">
          <select className="input" value={f.outcome} onChange={set('outcome')}>
            <option value="Resolved">Resolved — no further action</option>
            <option value="Verbal admonishment">Verbal admonishment (oral warning on file)</option>
          </select>
        </Field>
        <Field label="Date"><input type="date" className="input" value={f.date} onChange={set('date')} /></Field>
      </div>
      <p className="hint">To take this further, save it and use “Escalate” to raise a formal case — the notes carry forward.</p>
    </Modal>
  );
}

function EscalateModal({ store, cn, onClose }) {
  const { offs, emps } = store;
  const [offN, setOffN] = useState('');
  const [rec, setRec] = useState('');
  const [date, setDate] = useState('2026-06-21');
  const e = empById(cn.empId, emps);
  const penalty = useMemo(() => {
    if (!offN) return null;
    const o = offByN(+offN, offs); if (!o) return null;
    const occ = occurrenceFor(cn.empId, +offN, store.cases);
    const pair = rangeForOcc(o, occ);
    return { o, occ, pair, opts: optionsInRange(pair) };
  }, [offN, offs, cn, store.cases]);
  function go() {
    if (!offN) { alert('Select the offence to charge.'); return; }
    if (!rec) { alert('Select a recommended action within the range.'); return; }
    store.escalateCounselling(cn.id, +offN, rec, date);
    onClose();
  }
  return (
    <Modal title={`Escalate ${cn.id} to a formal case`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={go}>Escalate to case</button></>}>
      <div className="penalty-box">
        <div className="sub">Carrying forward from counselling</div>
        <div className="penalty-title">{e?.name} — {cn.topic}</div>
        {cn.discussed && <div className="notice-quote" style={{ marginTop: 6 }}>{cn.discussed}</div>}
      </div>
      <Field label="Offence">
        <select className="input" value={offN} onChange={e => { setOffN(e.target.value); setRec(''); }}>
          <option value="">— Select offence —</option>
          {offs.map(o => <option key={o.n} value={o.n}>{o.n}. {o.name}</option>)}
        </select>
      </Field>
      {penalty && (
        <div className="penalty-box">
          <div className="penalty-title">{occLabel(penalty.occ)} occurrence — range:</div>
          <div className="penalty-range"><span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(penalty.pair) }} /></div>
          {penalty.o.note && <div className="penalty-note">⚠ {penalty.o.note}</div>}
        </div>
      )}
      <div className="form-grid">
        <Field label="Recommended action">
          <select className="input" value={rec} onChange={e => setRec(e.target.value)} disabled={!penalty}>
            <option value="">— Select action —</option>
            {penalty && penalty.opts.map(c => <option key={c} value={c}>{c} — {penFull(c)}</option>)}
          </select>
        </Field>
        <Field label="Date raised"><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>
      </div>
      <p className="hint">This creates a formal case (status: With HR) linked to {cn.id}, and marks the counselling as Escalated.</p>
    </Modal>
  );
}

/* Shared read-only counselling log (HR / CEO). Optionally scoped by a filter fn. */
function CounsellingTable({ store, filterFn }) {
  const { couns, emps } = store;
  const rows = filterFn ? couns.filter(filterFn) : couns;
  return rows.length ? (
    <table className="table">
      <thead><tr><th>Ref</th><th>Employee</th><th>Dept</th><th>Issue</th><th>Discussed</th><th>Date</th><th>Outcome</th></tr></thead>
      <tbody>
        {rows.map(c => {
          const e = empById(c.empId, emps);
          return (
            <tr key={c.id}>
              <td className="mono">{c.id}</td>
              <td><b>{e?.name}</b><div className="sub">{e?.title}</div></td>
              <td>{e?.dept}</td>
              <td>{c.topic}</td>
              <td className="sub">{c.discussed}</td>
              <td>{c.date}</td>
              <td><span className={'pill ' + counselOutcomeClass(c.outcome)}>{c.outcome}</span>{c.escalatedTo && <div className="sub">→ {c.escalatedTo}</div>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : <Empty>No counselling records.</Empty>;
}

function CounsellingLog({ store }) {
  const { couns } = store;
  const n = o => couns.filter(c => c.outcome === o).length;
  return (
    <div className="page">
      <PageHead title="Counselling Log" sub="Informal counselling recorded before formal cases — oversight" />
      <GuideBanner view="counsel-log" />
      <div className="stat-grid">
        <Stat n={couns.length} label="Total logged" color="#134E4A" />
        <Stat n={n('Resolved')} label="Resolved" color="#059669" />
        <Stat n={n('Verbal admonishment')} label="Verbal admonishment" color="#B45309" />
        <Stat n={n('Escalated')} label="Escalated to case" color="#6D28D9" />
      </div>
      <Card><CounsellingTable store={store} /></Card>
    </div>
  );
}

function ExecCounselling({ store, execId }) {
  const { emps } = store;
  const { exec, inPortfolio } = useExec(execId, emps);
  const ids = new Set(inPortfolio.map(e => e.id));
  return (
    <div className="page">
      <PageHead title="Portfolio Counselling" sub={`Informal counselling across ${exec.title} — oversight`} />
      <GuideBanner view="exec-counsel" />
      <Card><CounsellingTable store={store} filterFn={c => ids.has(c.empId)} /></Card>
    </div>
  );
}

function LMRaise({ store, setView }) {
  const { cases, emps, offs } = store;
  const [empId, setEmpId] = useState('');
  const [offN, setOffN] = useState('');
  const [rec, setRec] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('2026-06-21');

  const penalty = useMemo(() => {
    if (!empId || !offN) return null;
    const e = empById(+empId, emps), o = offByN(+offN, offs);
    if (!e || !o) return null;
    const occ = occurrenceFor(+empId, +offN, cases);
    const pair = rangeForOcc(o, occ);
    return { e, o, occ, pair, opts: optionsInRange(pair), prior: occ - 1 };
  }, [empId, offN, cases, emps, offs]);

  function submit(asDraft) {
    if (!empId || !offN) { alert('Select an employee and an offence.'); return; }
    if (!asDraft && !rec) { alert('Select a recommended action within the range.'); return; }
    store.submitCase(+empId, +offN, rec || penalty.opts[0], desc, date, asDraft);
    setEmpId(''); setOffN(''); setRec(''); setDesc('');
    setView('lm-queue');
  }

  return (
    <div className="page">
      <PageHead title="Raise a Disciplinary Case" sub="Counsel first — raise a formal case only if the problem continues" />
      <GuideBanner view="lm-raise" />
      <Card>
        <div className="form-grid">
          <Field label="Employee">
            <select className="input" value={empId} onChange={e => { setEmpId(e.target.value); setRec(''); }}>
              <option value="">— Select employee —</option>
              {emps.map(e => <option key={e.id} value={e.id}>{e.name} — {e.title}</option>)}
            </select>
          </Field>
          <Field label="Offence">
            <select className="input" value={offN} onChange={e => { setOffN(e.target.value); setRec(''); }}>
              <option value="">— Select offence —</option>
              {offs.map(o => <option key={o.n} value={o.n}>{o.n}. {o.name}</option>)}
            </select>
          </Field>
        </div>
        {penalty && (
          <div className="penalty-box">
            <div className="sub">System check (automatic)</div>
            <div className="penalty-title">This is {penalty.e.name}’s <span className="accent">{occLabel(penalty.occ)} occurrence</span>{penalty.prior ? ` (${penalty.prior} prior closed)` : ''}.</div>
            <div className="penalty-range"><span className="sub">Penalty range:</span> <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(penalty.pair) }} /></div>
            {penalty.o.note && <div className="penalty-note">⚠ {penalty.o.note}</div>}
          </div>
        )}
        <div className="form-grid">
          <Field label="Recommended action">
            <select className="input" value={rec} onChange={e => setRec(e.target.value)} disabled={!penalty}>
              <option value="">— Select action —</option>
              {penalty && penalty.opts.map(c => <option key={c} value={c}>{c} — {penFull(c)}</option>)}
            </select>
          </Field>
          <Field label="Date raised"><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>
        </div>
        <Field label="Statement of facts"><textarea className="input" rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="What happened, investigations, employee response so far…" /></Field>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => submit(true)}>Save as draft</button>
          <button className="btn btn-navy" onClick={() => submit(false)}>Submit to HR</button>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════ HR MANAGER ═══════════ */
function HRQueue({ store }) {
  const { cases, emps, offs } = store;
  const queue = cases.filter(c => ['With HR', 'Awaiting Response', 'Awaiting Decision'].includes(c.status));
  const [acting, setActing] = useState(null);
  const [investigating, setInvestigating] = useState(null);
  const [forwarding, setForwarding] = useState(null); // {c, to:'CEO'|'SMT'}
  const actionFor = c => c.status === 'With HR'
      ? (c.investigation ? { label: 'Issue notice', to: 'Awaiting Response' } : { label: 'Investigate', to: 'investigate' })
    : c.status === 'Awaiting Response' ? { label: 'Record response', to: 'Awaiting Decision' }
    : { label: 'Record decision', to: 'Closed' };
  return (
    <div className="page">
      <PageHead title="HR Queue" sub="Cases awaiting HR action, in workflow order" />
      <GuideBanner view="hr-queue" />
      <Card>
        {queue.length ? (
          <table className="table">
            <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>Occ.</th><th>Range</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {queue.map(c => {
                const e = empById(c.empId, emps), o = offByN(c.off, offs);
                const pair = o ? rangeForOcc(o, c.occ) : null;
                const na = actionFor(c);
                return (
                  <tr key={c.id}>
                    <td className="mono">{c.id}</td>
                    <td><b>{e?.name}</b><div className="sub">{e?.title}</div></td>
                    <td>{o?.name}</td>
                    <td>{occLabel(c.occ)}</td>
                    <td dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} />
                    <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span></td>
                    <td className="row-actions">
                      {c.status === 'With HR' && c.investigation && <button className="btn btn-sm btn-ghost" onClick={() => setInvestigating(c)}>Investigation</button>}
                      <button className="btn btn-sm btn-navy" onClick={() => na.to === 'investigate' ? setInvestigating(c) : setActing({ c, action: na })}>{na.label}</button>
                      {c.status === 'With HR' && c.investigation && <>
                        <button className="btn btn-sm btn-ghost" onClick={() => setForwarding({ c, to: 'SMT' })}>Forward to SMT</button>
                        <button className="btn btn-sm btn-ghost" onClick={() => setForwarding({ c, to: 'CEO' })}>Forward to CEO</button>
                      </>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <Empty>HR queue is clear.</Empty>}
      </Card>
      {acting && <ActionModal store={store} c={acting.c} action={acting.action} onClose={() => setActing(null)} />}
      {investigating && <InvestigationModal store={store} c={investigating} onClose={() => setInvestigating(null)} />}
      {forwarding && <ForwardModal store={store} c={forwarding.c} to={forwarding.to} onClose={() => setForwarding(null)} />}
    </div>
  );
}

function ForwardModal({ store, c, to, onClose }) {
  const { emps, offs } = store;
  const e = empById(c.empId, emps), o = offByN(c.off, offs);
  const [note, setNote] = useState('');
  function go() {
    if (to === 'SMT') store.forwardToSMT(c.id, note);
    else store.forwardToCEO(c.id, note);
    onClose();
  }
  return (
    <Modal title={`Forward ${c.id} to ${to === 'SMT' ? 'the SMT' : 'the CEO'}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={go}>Forward to {to}</button></>}>
      <div className="penalty-box">
        <div className="penalty-title">{e?.name} — {o?.name}</div>
        <div className="sub">{to === 'SMT'
          ? 'The Senior Management Team will review this case and recommend an action to the CEO. It then goes to the CEO with their recommendation.'
          : 'This case goes directly to the CEO for a final decision, skipping the notice/response stage.'}</div>
      </div>
      <Field label={`Note for the ${to === 'SMT' ? 'SMT' : 'CEO'} (optional)`}><textarea className="input" rows={3} value={note} onChange={ev => setNote(ev.target.value)} placeholder="Why this is being escalated…" /></Field>
    </Modal>
  );
}

/* HR Investigation — before the notice is issued */
function InvestigationModal({ store, c, onClose }) {
  const { emps, offs } = store;
  const e = empById(c.empId, emps), o = offByN(c.off, offs);
  const inv0 = c.investigation || {};
  const [findings, setFindings] = useState(inv0.findings || '');
  const [lmDiscuss, setLmDiscuss] = useState(inv0.lmDiscuss || '');
  const [staffDiscuss, setStaffDiscuss] = useState(inv0.staffDiscuss || '');
  const [witnesses, setWitnesses] = useState(inv0.witnesses || []);
  const [wName, setWName] = useState('');
  const [wNote, setWNote] = useState('');
  const [files, setFiles] = useState(inv0.files || []);

  function addWitness() {
    if (!wName.trim()) return;
    setWitnesses(w => [...w, { name: wName.trim(), note: wNote.trim() }]);
    setWName(''); setWNote('');
  }
  function removeWitness(i) { setWitnesses(w => w.filter((_, idx) => idx !== i)); }

  function onFiles(ev) {
    const list = Array.from(ev.target.files || []);
    list.forEach(f => {
      const reader = new FileReader();
      reader.onload = () => setFiles(prev => [...prev, { name: f.name, type: f.type, size: f.size, data: reader.result }]);
      reader.readAsDataURL(f);
    });
    ev.target.value = '';
  }
  function removeFile(i) { setFiles(f => f.filter((_, idx) => idx !== i)); }

  function save(thenIssue) {
    store.saveInvestigation(c.id, { findings, lmDiscuss, staffDiscuss, witnesses, files, savedAt: '2026-06-21' });
    onClose();
  }

  const isImg = t => t && t.startsWith('image/');
  return (
    <Modal title={`Investigation — ${c.id}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={() => save(false)}>Save investigation</button></>}>
      <div className="penalty-box">
        <div className="penalty-title">{e?.name} — {o?.name}</div>
        <div className="sub">Investigate before issuing the notice: establish the facts, discuss with the line manager and the employee, and record any witnesses and evidence.</div>
      </div>
      <Field label="Investigation findings"><textarea className="input" rows={3} value={findings} onChange={ev => setFindings(ev.target.value)} placeholder="What the investigation established about the incident…" /></Field>
      <div className="form-grid">
        <Field label="Discussion with line manager"><textarea className="input" rows={2} value={lmDiscuss} onChange={ev => setLmDiscuss(ev.target.value)} /></Field>
        <Field label="Discussion with employee"><textarea className="input" rows={2} value={staffDiscuss} onChange={ev => setStaffDiscuss(ev.target.value)} /></Field>
      </div>

      <div className="inv-section">
        <div className="inv-title">Witnesses <span className="sub">(staff on site during the incident)</span></div>
        {witnesses.length > 0 && (
          <div className="wit-list">
            {witnesses.map((w, i) => (
              <div key={i} className="wit-row">
                <div><b>{w.name}</b>{w.note && <div className="sub">{w.note}</div>}</div>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeWitness(i)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        <div className="wit-add">
          <input className="input" placeholder="Witness name" value={wName}
            onChange={ev => setWName(ev.target.value)}
            onKeyDown={ev => { if (ev.key === 'Enter') { ev.preventDefault(); addWitness(); } }} />
          <input className="input" placeholder="What they said (optional)" value={wNote}
            onChange={ev => setWNote(ev.target.value)}
            onKeyDown={ev => { if (ev.key === 'Enter') { ev.preventDefault(); addWitness(); } }} />
          <button type="button" className="btn btn-navy" onClick={addWitness} disabled={!wName.trim()}>+ Add witness</button>
        </div>
      </div>

      <div className="inv-section">
        <div className="inv-title">Evidence — documents & images</div>
        {files.length > 0 && (
          <div className="file-list">
            {files.map((f, i) => (
              <div key={i} className="file-chip">
                {isImg(f.type)
                  ? <img src={f.data} alt={f.name} className="file-thumb" />
                  : <span className="file-ico">📄</span>}
                <div className="file-meta"><a href={f.data} download={f.name} className="file-name">{f.name}</a><div className="sub">{(f.size/1024).toFixed(0)} KB</div></div>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeFile(i)}>×</button>
              </div>
            ))}
          </div>
        )}
        <label className="file-drop">
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={onFiles} hidden />
          <span>📎 Click to upload documents or images</span>
        </label>
      </div>
      <p className="hint">Once the investigation is saved, the case shows an “Issue notice” action. All notes, witnesses and evidence stay attached to the case.</p>
    </Modal>
  );
}

function HRAll({ store }) {
  const { cases, emps, offs } = store;
  const [q, setQ] = useState(''); const [sf, setSf] = useState('');
  const rows = cases.filter(c => {
    const e = empById(c.empId, emps), o = offByN(c.off, offs);
    if (!e || !o) return false;
    if (q && (e.name + ' ' + o.name).toLowerCase().indexOf(q.toLowerCase()) < 0) return false;
    if (sf && c.status !== sf) return false;
    return true;
  });
  const statuses = [...new Set(cases.map(c => c.status))];
  return (
    <div className="page">
      <PageHead title="All Cases" sub="Every disciplinary case across the company" />
      <div className="filters">
        <input className="input" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={sf} onChange={e => setSf(e.target.value)}>
          <option value="">All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <Card>
        <table className="table">
          <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>Occ.</th><th>Action</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map(c => {
              const e = empById(c.empId, emps), o = offByN(c.off, offs);
              return (
                <tr key={c.id}>
                  <td className="mono">{c.id}</td>
                  <td><b>{e.name}</b></td>
                  <td>{o.name}<div className="sub">{o.cat}</div></td>
                  <td>{occLabel(c.occ)}</td>
                  <td><span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span></td>
                  <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span>{c.outcome && <div className="sub">{c.outcome}</div>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════ STAFF ═══════════ */
function StaffNotices({ store }) {
  const { cases, emps, offs } = store;
  const notices = cases.filter(c => ['Awaiting Response', 'Awaiting Decision', 'Closed', 'Under Appeal'].includes(c.status));
  const [acting, setActing] = useState(null);
  return (
    <div className="page">
      <PageHead title="My Notices" sub="Disciplinary notices addressed to employees — respond or appeal here" />
      <GuideBanner view="staff-notices" />
      {notices.length ? notices.map(c => {
        const e = empById(c.empId, emps), o = offByN(c.off, offs);
        return (
          <Card key={c.id} title={`${c.id} · ${e?.name}`} sub={o?.name}>
            <div className="notice-body">
              <div><span className="sub">Charge:</span> {o?.name} — {occLabel(c.occ)} occurrence</div>
              <div><span className="sub">Proposed action:</span> <span className={'chip ' + penClass(c.rec)}>{c.rec}</span> {penFull(c.rec)}</div>
              {c.response && <div className="notice-quote">Your response: “{c.response}”</div>}
              {c.status === 'Closed' && <div><span className="sub">Decision:</span> <span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span> — {c.outcome}</div>}
            </div>
            <div className="notice-actions">
              <span className={'pill ' + statusClass(c.status)}>{c.status}</span>
              {c.status === 'Awaiting Response' && <button className="btn btn-sm btn-navy" onClick={() => setActing({ c, action: { label: 'Submit response', to: 'Awaiting Decision' } })}>Respond (5 working days)</button>}
              {c.status === 'Closed' && !c.appealDate && <button className="btn btn-sm btn-ghost" onClick={() => setActing({ c, action: { label: 'Lodge appeal', to: 'Under Appeal' } })}>Appeal (10 working days)</button>}
            </div>
          </Card>
        );
      }) : <Empty>No notices at this time.</Empty>}
      {acting && <ActionModal store={store} c={acting.c} action={acting.action} onClose={() => setActing(null)} />}
    </div>
  );
}

/* ═══════════ CEO ═══════════ */

function CEOReferrals({ store }) {
  const { cases, emps, offs } = store;
  const refs = cases.filter(c => c.status === 'With CEO');
  const [deciding, setDeciding] = useState(null);
  return (
    <div className="page">
      <PageHead title="Referrals — CEO Decision" sub="Cases forwarded by HR, or recommended by the SMT" />
      <GuideBanner view="ceo-referrals" />
      {refs.length ? refs.map(c => {
        const e = empById(c.empId, emps), o = offByN(c.off, offs);
        const pair = o ? rangeForOcc(o, c.occ) : null;
        return (
          <Card key={c.id} title={`${c.id} · ${e?.name}`} sub={o?.name}>
            <div className="notice-body">
              <div><span className="sub">Occurrence:</span> {occLabel(c.occ)} — range <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} /></div>
              <div><span className="sub">Route:</span> {c.smtRec ? 'HR → SMT → CEO' : 'HR → CEO (direct)'}</div>
              {c.hrNote && <div className="notice-quote">HR note: “{c.hrNote}”</div>}
              {c.investigation?.findings && <div><span className="sub">Investigation:</span> {c.investigation.findings}</div>}
            </div>
            {c.smtRec && (
              <div className="smt-rec">
                <div className="inv-title">SMT recommendation</div>
                <div><span className={'chip ' + penClass(c.smtRec)}>{c.smtRec}</span> {penFull(c.smtRec)}</div>
                {c.smtRationale && <div className="sub" style={{ marginTop: 4 }}>{c.smtRationale}</div>}
              </div>
            )}
            <div className="notice-actions">
              <span className="pill st-ceo">With CEO</span>
              <button className="btn btn-sm btn-navy" onClick={() => setDeciding(c)}>Make final decision</button>
            </div>
          </Card>
        );
      }) : <Empty>No cases awaiting a CEO decision.</Empty>}
      {deciding && <CEODecisionModal store={store} c={deciding} onClose={() => setDeciding(null)} />}
    </div>
  );
}

function CEODecisionModal({ store, c, onClose }) {
  const { offs, emps } = store;
  const o = offByN(c.off, offs), e = empById(c.empId, emps);
  const pair = o ? rangeForOcc(o, c.occ) : null;
  const opts = optionsInRange(pair);
  const [decision, setDecision] = useState(c.smtRec || opts[0] || '');
  const [note, setNote] = useState('');
  function go() {
    if (!decision) { alert('Select the final action.'); return; }
    store.ceoDecideReferral(c.id, decision, note || (c.smtRec === decision ? 'Followed SMT recommendation' : 'Decided by CEO'));
    onClose();
  }
  return (
    <Modal title={`CEO decision — ${c.id}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={go}>Record final decision</button></>}>
      <div className="penalty-box">
        <div className="penalty-title">{e?.name} — {o?.name}</div>
        <div className="penalty-range"><span className="sub">{occLabel(c.occ)} occurrence — range:</span> <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} /></div>
      </div>
      {c.smtRec && <div className="smt-rec"><div className="inv-title">SMT recommended</div><div><span className={'chip ' + penClass(c.smtRec)}>{c.smtRec}</span> {penFull(c.smtRec)}</div>{c.smtRationale && <div className="sub" style={{marginTop:4}}>{c.smtRationale}</div>}</div>}
      <Field label="Final action (within range)">
        <select className="input" value={decision} onChange={ev => setDecision(ev.target.value)}>
          {opts.map(x => <option key={x} value={x}>{x} — {penFull(x)}</option>)}
        </select>
      </Field>
      <Field label="Note (optional)"><textarea className="input" rows={2} value={note} onChange={ev => setNote(ev.target.value)} /></Field>
    </Modal>
  );
}

function CEOAppeals({ store }) {
  const { cases, emps, offs } = store;
  const appeals = cases.filter(c => c.status === 'Under Appeal');
  const [acting, setActing] = useState(null);
  return (
    <div className="page">
      <PageHead title="Appeals — Final Decision" sub="The CEO (or independent tribunal) is the final arbiter" />
      <GuideBanner view="ceo-appeals" />
      {appeals.length ? appeals.map(c => {
        const e = empById(c.empId, emps), o = offByN(c.off, offs);
        return (
          <Card key={c.id} title={`${c.id} · ${e?.name}`} sub={o?.name}>
            <div className="notice-body">
              <div><span className="sub">Decision under appeal:</span> <span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span> {penFull(c.decision || c.rec)}</div>
              {c.appeal && <div className="notice-quote">Grounds: “{c.appeal}”</div>}
            </div>
            <div className="notice-actions">
              <button className="btn btn-sm btn-navy" onClick={() => setActing({ c, action: { label: 'CEO ruling', to: 'Closed' } })}>Rule on appeal</button>
            </div>
          </Card>
        );
      }) : <Empty>No appeals awaiting a ruling.</Empty>}
      {acting && <ActionModal store={store} c={acting.c} action={acting.action} onClose={() => setActing(null)} />}
    </div>
  );
}


/* ═══════════ EXECUTIVE MEMBER ═══════════ */
function useExec(execId, emps) {
  const exec = EXECUTIVES.find(x => x.id === execId) || EXECUTIVES[0];
  const inPortfolio = emps.filter(e => exec.depts.includes(e.dept));
  return { exec, inPortfolio };
}

function ExecPortfolio({ store, execId }) {
  const { emps, cases } = store;
  const { exec, inPortfolio } = useExec(execId, emps);
  // group by department
  const byDept = exec.depts.map(d => ({
    dept: d,
    staff: inPortfolio.filter(e => e.dept === d),
  })).filter(g => g.staff.length);
  const openFor = id => cases.filter(c => c.empId === id && c.status !== 'Closed').length;

  return (
    <div className="page">
      <PageHead title="My Portfolio" sub={`${exec.name} · ${exec.title}`} />
      <GuideBanner view="exec-portfolio" />
      <div className="stat-grid">
        <Stat n={inPortfolio.length} label="Staff in portfolio" color="#134E4A" />
        <Stat n={exec.depts.length} label="Departments" color="#1E40AF" />
        <Stat n={cases.filter(c => inPortfolio.some(e => e.id === c.empId)).length} label="Total cases" color="#B45309" />
        <Stat n={cases.filter(c => inPortfolio.some(e => e.id === c.empId) && c.status !== 'Closed').length} label="Open cases" color="#991B1B" />
      </div>
      <div className="portfolio-note">Structure: Staff → Line Manager → Executive Member (you). You see the disciplinary standing of everyone below.</div>
      {byDept.map(g => (
        <Card key={g.dept} title={g.dept} sub={`${g.staff.length} staff`}>
          <table className="table">
            <thead><tr><th>Name</th><th>Title</th><th>Supervisor</th><th>Open cases</th></tr></thead>
            <tbody>
              {g.staff.map(e => {
                const n = openFor(e.id);
                return (
                  <tr key={e.id}>
                    <td><b>{e.name}</b></td>
                    <td>{e.title}</td>
                    <td>{e.sup}</td>
                    <td>{n > 0 ? <span className="pill st-hr">{n} open</span> : <span className="sub">Clear</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  );
}


function ExecAppraisals({ store, execId }) {
  const { emps } = store;
  const { exec, inPortfolio } = useExec(execId, emps);
  const [quarter, setQuarter] = useState('Q2');
  const rows = inPortfolio.map(e => ({ e, status: appraisalStatus(e.id, quarter) }));
  const count = s => rows.filter(r => r.status === s).length;
  const done = count('CEO Approved');
  const pending = rows.length - done;

  return (
    <div className="page">
      <PageHead title="Portfolio Appraisals" sub={`${quarter} 2026 · appraisal status across ${exec.title}`}
        right={
          <select className="input" style={{ maxWidth: 140 }} value={quarter} onChange={e => setQuarter(e.target.value)}>
            <option value="Q1">Q1 2026</option><option value="Q2">Q2 2026</option>
          </select>
        } />
      <GuideBanner view="exec-appraisals" />
      <div className="stat-grid">
        <Stat n={rows.length} label="Staff in portfolio" color="#134E4A" />
        <Stat n={done} label="CEO Approved" color="#059669" />
        <Stat n={count('With HR') + count('Submitted to CEO')} label="In progress" color="#B45309" />
        <Stat n={count('Pending')} label="Pending" color="#991B1B" />
      </div>
      <Card title={`Appraisal status — ${quarter} 2026`} sub="Every employee in your portfolio">
        <table className="table">
          <thead><tr><th>Name</th><th>Title</th><th>Department</th><th>Supervisor</th><th>Appraisal status</th></tr></thead>
          <tbody>
            {rows.map(({ e, status }) => (
              <tr key={e.id}>
                <td><b>{e.name}</b></td>
                <td>{e.title}</td>
                <td>{e.dept}</td>
                <td>{e.sup}</td>
                <td><span className={'pill ' + apprStatusClass(status)}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {pending > 0 && <div className="portfolio-note" style={{ background: '#FEF3C7', borderColor: '#FCD34D', color: '#92400E' }}>
        {pending} staff member{pending > 1 ? 's' : ''} in your portfolio {pending > 1 ? 'do not' : 'does not'} yet have a CEO-approved appraisal for {quarter} 2026.
      </div>}
    </div>
  );
}

function ExecDiscipline({ store, execId }) {
  const { emps, cases, offs } = store;
  const { exec, inPortfolio } = useExec(execId, emps);
  const ids = new Set(inPortfolio.map(e => e.id));
  const [sf, setSf] = useState('');
  const mine = cases.filter(c => ids.has(c.empId) && (!sf || c.status === sf));
  const statuses = [...new Set(cases.filter(c => ids.has(c.empId)).map(c => c.status))];

  return (
    <div className="page">
      <PageHead title="Portfolio Discipline" sub={`Disciplinary standing across ${exec.title} — oversight only`} />
      <GuideBanner view="exec-discipline" />
      <div className="stat-grid">
        <Stat n={mine.filter(c => c.status !== 'Closed').length} label="Open" color="#1E40AF" />
        <Stat n={mine.filter(c => c.status === 'Under Appeal').length} label="Under appeal" color="#6D28D9" />
        <Stat n={mine.filter(c => c.status === 'Closed').length} label="Closed" color="#059669" />
        <Stat n={mine.filter(c => (c.decision || c.rec) === 'D').length} label="Dismissals" color="#991B1B" />
      </div>
      <div className="filters">
        <select className="input" value={sf} onChange={e => setSf(e.target.value)}>
          <option value="">All statuses</option>{statuses.map(x => <option key={x}>{x}</option>)}
        </select>
      </div>
      <Card>
        {mine.length ? (
          <table className="table">
            <thead><tr><th>Case</th><th>Employee</th><th>Dept</th><th>Offence</th><th>Occ.</th><th>Action</th><th>Status</th></tr></thead>
            <tbody>
              {mine.map(c => {
                const e = empById(c.empId, emps), o = offByN(c.off, offs);
                return (
                  <tr key={c.id}>
                    <td className="mono">{c.id}</td>
                    <td><b>{e?.name}</b><div className="sub">{e?.title}</div></td>
                    <td>{e?.dept}</td>
                    <td>{o?.name}</td>
                    <td>{occLabel(c.occ)}</td>
                    <td><span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span></td>
                    <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span>{c.outcome && <div className="sub">{c.outcome}</div>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <Empty>No disciplinary cases in your portfolio.</Empty>}
      </Card>
    </div>
  );
}


/* ═══════════ SENIOR MANAGEMENT TEAM (SMT) ═══════════ */
function SMTQueue({ store }) {
  const { cases, emps, offs } = store;
  const queue = cases.filter(c => c.status === 'With SMT');
  const [reccing, setReccing] = useState(null);
  return (
    <div className="page">
      <PageHead title="SMT Referrals" sub="Cases forwarded by HR for a recommendation to the CEO" />
      <GuideBanner view="smt-queue" />
      {queue.length ? queue.map(c => {
        const e = empById(c.empId, emps), o = offByN(c.off, offs);
        const pair = o ? rangeForOcc(o, c.occ) : null;
        return (
          <Card key={c.id} title={`${c.id} · ${e?.name}`} sub={o?.name}>
            <div className="notice-body">
              <div><span className="sub">Occurrence:</span> {occLabel(c.occ)} — range <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} /></div>
              {c.hrNote && <div className="notice-quote">HR note: “{c.hrNote}”</div>}
              {c.investigation?.findings && <div><span className="sub">Investigation:</span> {c.investigation.findings}</div>}
              {c.investigation?.witnesses?.length > 0 && <div className="sub">Witnesses: {c.investigation.witnesses.map(w => w.name).join(', ')}</div>}
              {c.investigation?.files?.length > 0 && <div className="sub">{c.investigation.files.length} evidence file(s)</div>}
            </div>
            <div className="notice-actions">
              <span className="pill st-smt">With SMT</span>
              <button className="btn btn-sm btn-navy" onClick={() => setReccing(c)}>Recommend to CEO</button>
            </div>
          </Card>
        );
      }) : <Empty>No cases referred to the SMT.</Empty>}
      {reccing && <SMTRecommendModal store={store} c={reccing} onClose={() => setReccing(null)} />}
    </div>
  );
}

function SMTRecommendModal({ store, c, onClose }) {
  const { offs, emps } = store;
  const o = offByN(c.off, offs), e = empById(c.empId, emps);
  const pair = o ? rangeForOcc(o, c.occ) : null;
  const opts = optionsInRange(pair);
  const [action, setAction] = useState(opts[0] || '');
  const [rationale, setRationale] = useState('');
  function go() {
    if (!action) { alert('Select a recommended action.'); return; }
    store.smtRecommend(c.id, action, rationale);
    onClose();
  }
  return (
    <Modal title={`SMT recommendation — ${c.id}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={go}>Send recommendation to CEO</button></>}>
      <div className="penalty-box">
        <div className="penalty-title">{e?.name} — {o?.name}</div>
        <div className="penalty-range"><span className="sub">{occLabel(c.occ)} occurrence — range:</span> <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} /></div>
        {o?.note && <div className="penalty-note">⚠ {o.note}</div>}
      </div>
      <Field label="Recommended action to the CEO">
        <select className="input" value={action} onChange={ev => setAction(ev.target.value)}>
          {opts.map(x => <option key={x} value={x}>{x} — {penFull(x)}</option>)}
        </select>
      </Field>
      <Field label="Rationale"><textarea className="input" rows={3} value={rationale} onChange={ev => setRationale(ev.target.value)} placeholder="Why the SMT recommends this action…" /></Field>
      <p className="hint">This is a recommendation only — the CEO makes the final decision.</p>
    </Modal>
  );
}

function SMTDecided({ store }) {
  const { cases, emps, offs } = store;
  const rows = cases.filter(c => c.smtRec);
  return (
    <div className="page">
      <PageHead title="Recommended" sub="Cases the SMT has recommended on and sent to the CEO" />
      <GuideBanner view="smt-decided" />
      <Card>
        {rows.length ? (
          <table className="table">
            <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>SMT recommended</th><th>CEO decision</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map(c => {
                const e = empById(c.empId, emps), o = offByN(c.off, offs);
                return (
                  <tr key={c.id}>
                    <td className="mono">{c.id}</td>
                    <td><b>{e?.name}</b></td>
                    <td>{o?.name}</td>
                    <td><span className={'chip ' + penClass(c.smtRec)}>{c.smtRec}</span> {penFull(c.smtRec)}</td>
                    <td>{c.status === 'Closed' ? <><span className={'chip ' + penClass(c.decision)}>{c.decision}</span> {c.outcome}</> : <span className="sub">Awaiting CEO</span>}</td>
                    <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : <Empty>No SMT recommendations yet.</Empty>}
      </Card>
    </div>
  );
}

/* ═══════════ SHARED ACTION MODAL ═══════════ */
function ActionModal({ store, c, action, onClose }) {
  const { offs } = store;
  const o = offByN(c.off, offs);
  const pair = o ? rangeForOcc(o, c.occ) : null;
  const opts = optionsInRange(pair);
  const [decision, setDecision] = useState(c.decision || c.rec);
  const [text, setText] = useState('');
  const [date, setDate] = useState('2026-06-21');

  function go() {
    switch (action.to) {
      case 'Awaiting Response': store.issueNotice(c.id, date); break;
      case 'Awaiting Decision': store.recordResponse(c.id, text); break;
      case 'Under Appeal': store.lodgeAppeal(c.id, text, date); break;
      case 'Closed':
        if (c.status === 'Under Appeal') store.ceoRuling(c.id, decision, text || 'Upheld by CEO');
        else store.recordDecision(c.id, decision, text || 'Upheld');
        break;
      default: break;
    }
    onClose();
  }
  const needsDecision = action.to === 'Closed';
  const needsText = ['Awaiting Decision', 'Closed', 'Under Appeal'].includes(action.to);
  const needsDate = ['Awaiting Response', 'Under Appeal'].includes(action.to);
  const textLabel = action.to === 'Awaiting Decision' ? 'Your response'
    : action.to === 'Under Appeal' ? 'Grounds for appeal' : 'Outcome note (optional)';
  return (
    <Modal title={`${action.label} — ${c.id}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={go}>{action.label}</button></>}>
      <div className="penalty-box">
        <div className="penalty-range"><span className="sub">{occLabel(c.occ)} occurrence — range:</span> <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} /></div>
        {o?.note && <div className="penalty-note">⚠ {o.note}</div>}
      </div>
      {c.investigation && (
        <div className="inv-recap">
          <div className="inv-title">Investigation on file</div>
          {c.investigation.findings && <div className="sub" style={{marginBottom:4}}>{c.investigation.findings}</div>}
          {c.investigation.witnesses?.length > 0 && <div className="sub">Witnesses: {c.investigation.witnesses.map(w=>w.name).join(', ')}</div>}
          {c.investigation.files?.length > 0 && <div className="sub">{c.investigation.files.length} evidence file(s) attached</div>}
        </div>
      )}
      {needsDecision && (
        <Field label="Final action (within range)">
          <select className="input" value={decision} onChange={e => setDecision(e.target.value)}>
            {opts.map(x => <option key={x} value={x}>{x} — {penFull(x)}</option>)}
          </select>
        </Field>
      )}
      {needsDate && <Field label={action.to === 'Under Appeal' ? 'Appeal date' : 'Notice date'}><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>}
      {needsText && <Field label={textLabel}><textarea className="input" rows={3} value={text} onChange={e => setText(e.target.value)} /></Field>}
      {action.to === 'Awaiting Response' && <p className="hint">Issuing the notice starts the 5 working-day response window.</p>}
    </Modal>
  );
}

/* ═══════════ TABLE OF CHARGES (editable for ICT/HR) ═══════════ */
function Charges({ store, role }) {
  const { offs } = store;
  const editable = role === 'ict' || role === 'hr';
  const [q, setQ] = useState(''); const [cf, setCf] = useState('');
  const [editing, setEditing] = useState(null); const [adding, setAdding] = useState(false);
  const rows = offs.filter(o => {
    if (q && o.name.toLowerCase().indexOf(q.toLowerCase()) < 0 && ('' + o.n) !== q) return false;
    if (cf && o.cat !== cf) return false;
    return true;
  });
  return (
    <div className="page">
      <PageHead title="Table of Charges" sub="Recognised offences and penalty ranges by occurrence"
        right={editable && <button className="btn btn-navy" onClick={() => setAdding(true)}>+ Add offence</button>} />
      <GuideBanner view="charges" />
      <div className="filters">
        <input className="input" placeholder="Search offence or number…" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={cf} onChange={e => setCf(e.target.value)}><option value="">All categories</option>{CATS.map(c => <option key={c}>{c}</option>)}</select>
      </div>
      <Card>
        <table className="table">
          <thead><tr><th>#</th><th>Category</th><th>Offence</th><th>1st</th><th>2nd</th><th>3rd+</th>{editable && <th>Manage</th>}</tr></thead>
          <tbody>
            {rows.map(o => (
              <tr key={o.n}>
                <td className="mono">{o.n}</td>
                <td><span dangerouslySetInnerHTML={{ __html: CAT_ICON[o.cat] || '' }} /> {o.cat}</td>
                <td>{o.name}{o.note && <div className="penalty-note">⚠ {o.note}</div>}</td>
                {[0, 1, 2].map(i => { const pair = o.p[i] || o.p[o.p.length - 1]; return <td key={i} dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} />; })}
                {editable && <td className="row-actions">
                  <button className="btn btn-sm btn-ghost" onClick={() => setEditing(o)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => { if (confirm(`Delete offence #${o.n}?`)) store.deleteOff(o.n); }}>Delete</button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {(editing || adding) && <OffenceModal store={store} off={editing} onClose={() => { setEditing(null); setAdding(false); }} />}
    </div>
  );
}
function OffenceModal({ store, off, onClose }) {
  const isNew = !off;
  const [name, setName] = useState(off?.name || '');
  const [cat, setCat] = useState(off?.cat || CATS[0]);
  const [note, setNote] = useState(off?.note || '');
  const toStr = p => (p || []).map(pr => pr[0] === pr[1] ? pr[0] : `${pr[0]}-${pr[1]}`).join(', ');
  const [pText, setPText] = useState(off ? toStr(off.p) : 'A-R, R-S3, S10-D');
  function parseP(s) { return s.split(',').map(t => t.trim()).filter(Boolean).map(t => { const x = t.split('-').map(y => y.trim()); return x.length === 1 ? [x[0], x[0]] : [x[0], x[1]]; }); }
  function save() {
    if (!name.trim()) { alert('Enter the offence description.'); return; }
    const p = parseP(pText); const bad = p.flat().find(code => !PEN_ORDER.includes(code));
    if (bad) { alert(`“${bad}” is not a valid code. Use: ${PEN_ORDER.join(', ')}.`); return; }
    const patch = { name: name.trim(), cat, p, note: note.trim() || undefined };
    if (isNew) store.addOff(patch); else store.updateOff(off.n, patch);
    onClose();
  }
  return (
    <Modal title={isNew ? 'Add offence' : `Edit offence #${off.n}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={save}>{isNew ? 'Add' : 'Save'}</button></>}>
      <Field label="Offence description"><textarea className="input" rows={2} value={name} onChange={e => setName(e.target.value)} /></Field>
      <Field label="Category"><select className="input" value={cat} onChange={e => setCat(e.target.value)}>{CATS.map(c => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Penalty ranges — 1st, 2nd, 3rd"><input className="input" value={pText} onChange={e => setPText(e.target.value)} placeholder="e.g. A-R, R-S3, S10-D" /></Field>
      <p className="hint">Codes: A, R, S3/S10/S20, D. Single code (D) or range (R-S3). One per occurrence.</p>
      <Field label="Special note (optional)"><input className="input" value={note} onChange={e => setNote(e.target.value)} /></Field>
    </Modal>
  );
}

/* ═══════════ EMPLOYEES (ICT) ═══════════ */
function Employees({ store }) {
  const { emps, cases } = store;
  const [q, setQ] = useState(''); const [editing, setEditing] = useState(null); const [adding, setAdding] = useState(false);
  const rows = emps.filter(e => !q || (e.name + ' ' + e.title + ' ' + e.dept).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <PageHead title="Employees" sub="Staff directory used by the disciplinary system"
        right={<button className="btn btn-navy" onClick={() => setAdding(true)}>+ Add employee</button>} />
      <GuideBanner view="employees" />
      <div className="filters"><input className="input" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} /></div>
      <Card>
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Title</th><th>Dept</th><th>Supervisor</th><th>Cases</th><th>Manage</th></tr></thead>
          <tbody>
            {rows.map(e => {
              const n = cases.filter(c => c.empId === e.id).length;
              return (
                <tr key={e.id}>
                  <td className="mono">{e.id}</td><td><b>{e.name}</b></td><td>{e.title}</td><td>{e.dept}</td><td>{e.sup}</td><td>{n}</td>
                  <td className="row-actions">
                    <button className="btn btn-sm btn-ghost" onClick={() => setEditing(e)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { if (n > 0) { alert(`${e.name} has ${n} case(s) and cannot be deleted.`); return; } if (confirm(`Delete ${e.name}?`)) store.deleteEmp(e.id); }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {(editing || adding) && <EmployeeModal store={store} emp={editing} onClose={() => { setEditing(null); setAdding(false); }} />}
    </div>
  );
}
function EmployeeModal({ store, emp, onClose }) {
  const isNew = !emp;
  const [f, setF] = useState({ name: emp?.name || '', title: emp?.title || '', dept: emp?.dept || '', sup: emp?.sup || '' });
  const set = k => e => setF(s => ({ ...s, [k]: e.target.value }));
  function save() { if (!f.name.trim()) { alert('Enter a name.'); return; } if (isNew) store.addEmp(f); else store.updateEmp(emp.id, f); onClose(); }
  return (
    <Modal title={isNew ? 'Add employee' : `Edit ${emp.name}`} onClose={onClose}
      foot={<><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-navy" onClick={save}>{isNew ? 'Add' : 'Save'}</button></>}>
      <Field label="Full name"><input className="input" value={f.name} onChange={set('name')} /></Field>
      <Field label="Job title"><input className="input" value={f.title} onChange={set('title')} /></Field>
      <Field label="Department"><input className="input" value={f.dept} onChange={set('dept')} /></Field>
      <Field label="Supervisor"><input className="input" value={f.sup} onChange={set('sup')} /></Field>
    </Modal>
  );
}

/* ═══════════ CEO REPORT (HR + CEO) ═══════════ */
function Report({ store }) {
  const { cases, emps, offs } = store;
  const open = cases.filter(c => c.status !== 'Closed');
  const closed = cases.filter(c => c.status === 'Closed');
  const tbl = (list, empty) => list.length ? (
    <table className="table">
      <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>Action</th><th>Status</th></tr></thead>
      <tbody>{list.map(c => { const e = empById(c.empId, emps), o = offByN(c.off, offs); return (
        <tr key={c.id}><td className="mono">{c.id}</td><td>{e?.name}</td><td>{o?.name}</td>
          <td><span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span></td>
          <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span>{c.outcome && <div className="sub">{c.outcome}</div>}</td></tr>
      ); })}</tbody>
    </table>
  ) : <Empty>{empty}</Empty>;
  return (
    <div className="page">
      <PageHead title="Weekly CEO Report" sub="Summary of disciplinary activity for executive review" />
      <GuideBanner view="report" />
      <div className="stat-grid">
        <Stat n={open.length} label="Open" color="#1E40AF" />
        <Stat n={closed.length} label="Closed" color="#059669" />
        <Stat n={cases.filter(c => c.status === 'Under Appeal').length} label="Under appeal" color="#6D28D9" />
        <Stat n={cases.filter(c => (c.decision || c.rec) === 'D').length} label="Dismissals" color="#B42318" />
      </div>
      <Card title="Open cases" sub="In progress">{tbl(open, 'No open cases.')}</Card>
      <div style={{ height: 16 }} />
      <Card title="Recently closed" sub="Concluded">{tbl(closed, 'No closed cases.')}</Card>
    </div>
  );
}

/* ═══════════ HOW IT WORKS ═══════════ */
function HowItWorks() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const role = ROLES[s.role] || { name: s.role, c: '#667085', bg: '#F3F1EC' };
  return (
    <div className="page">
      <PageHead title="How it works" sub="The disciplinary process, step by step" />
      <div className="steps-nav">
        {STEPS.map((st, i) => (
          <button key={i} className={'step-dot' + (i === step ? ' active' : i < step ? ' done' : '')} onClick={() => setStep(i)}>
            <span className="step-num">{i + 1}</span><span className="step-short">{st.short}</span>
          </button>
        ))}
      </div>
      <Card>
        <div className="step-head"><span className="role-badge" style={{ color: role.c, background: role.bg }}>{role.name}</span><h3 dangerouslySetInnerHTML={{ __html: s.title }} /></div>
        <p className="step-desc" dangerouslySetInnerHTML={{ __html: s.desc }} />
        {s.mock && <div className="step-mock" dangerouslySetInnerHTML={{ __html: s.mock }} />}
        <div className="step-controls">
          <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
          <span className="step-count">{step + 1} of {STEPS.length}</span>
          <button className="btn btn-navy" disabled={step === STEPS.length - 1} onClick={() => setStep(step + 1)}>Next →</button>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════ shared bits ═══════════ */
function PageHead({ title, sub, right }) {
  return <div className="page-head"><div><h1>{title}</h1>{sub && <p className="page-sub">{sub}</p>}</div>{right && <div className="page-head-r">{right}</div>}</div>;
}
function Stat({ n, label, color }) { return <div className="stat"><div className="stat-n" style={{ color }}>{n}</div><div className="stat-l">{label}</div></div>; }
function Card({ title, sub, children }) {
  return <div className="card">{(title || sub) && <div className="card-head">{title && <div className="card-title">{title}</div>}{sub && <div className="card-sub">{sub}</div>}</div>}<div className="card-body">{children}</div></div>;
}
function Empty({ children }) { return <div className="empty">{children}</div>; }
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Modal({ title, onClose, foot, children }) {
  return <div className="modal-bg" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}>
    <div className="modal-head"><h3>{title}</h3><button className="modal-x" onClick={onClose}>×</button></div>
    <div className="modal-body">{children}</div><div className="modal-foot">{foot}</div></div></div>;
}
