import React, { useState, useMemo } from 'react';
import { OFFENCES, CATS, CAT_ICON, EMP, PEN_ORDER, ROLES, STEPS, PANEL_GUIDE } from './data/model';
import {
  offByN, occurrenceFor, occLabel, rangeForOcc,
  penClass, penFull, optionsInRange, rangeChips, empById,
  fmtDate, statusClass,
} from './lib/logic';
import { useStore } from './lib/store';

const NAV = [
  { id: 'dash', label: 'Dashboard', icon: '📊' },
  { id: 'cases', label: 'Cases', icon: '📁' },
  { id: 'charges', label: 'Table of Charges', icon: '⚖️' },
  { id: 'employees', label: 'Employees', icon: '👥' },
  { id: 'report', label: 'CEO Report', icon: '📋' },
  { id: 'howto', label: 'How it works', icon: 'ℹ️' },
];

export default function App() {
  const [view, setView] = useState('dash');
  const store = useStore();

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <div>
            <div className="brand-name">FSMPC</div>
            <div className="brand-sub">Disciplinary Management</div>
          </div>
        </div>
        <nav className="nav">
          {NAV.map(n => (
            <button key={n.id} className={'nav-item' + (view === n.id ? ' active' : '')}
              onClick={() => setView(n.id)}>
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
        {view === 'dash' && <Dashboard store={store} setView={setView} />}
        {view === 'cases' && <Cases store={store} />}
        {view === 'charges' && <Charges store={store} />}
        {view === 'employees' && <Employees store={store} />}
        {view === 'report' && <Report store={store} />}
        {view === 'howto' && <HowItWorks />}
      </main>
    </div>
  );
}

/* Per-panel guide banner shown at the top of each panel */
function GuideBanner({ view }) {
  const [open, setOpen] = useState(true);
  const g = PANEL_GUIDE[view];
  if (!g) return null;
  const role = ROLES[g.role] || { name: '', c: '#667085', bg: '#F3F1EC' };
  return (
    <div className={'guide' + (open ? '' : ' guide-collapsed')}>
      <div className="guide-head" onClick={() => setOpen(o => !o)}>
        <span className="guide-ico">ℹ️</span>
        <b>{g.title}</b>
        <span className="role-badge" style={{ color: role.c, background: role.bg, marginLeft: 8 }}>{role.name}</span>
        <span className="guide-toggle">{open ? 'Hide' : 'Show'}</span>
      </div>
      {open && (
        <ul className="guide-list">
          {g.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────── */
function Dashboard({ store, setView }) {
  const { cases, emps, offs } = store;
  const open = cases.filter(c => c.status !== 'Closed' && c.status !== 'Draft').length;
  const resp = cases.filter(c => c.status === 'Awaiting Response').length;
  const app = cases.filter(c => c.status === 'Under Appeal').length;
  const closed = cases.filter(c => c.status === 'Closed').length;

  const byCat = CATS.map(cat => ({
    cat, n: cases.filter(c => { const o = offByN(c.off, offs); return o && o.cat === cat; }).length,
  })).filter(x => x.n > 0);
  const maxCat = Math.max(1, ...byCat.map(x => x.n));
  const recent = cases.slice(0, 5);

  return (
    <div className="page">
      <PageHead title="Disciplinary Dashboard" sub="Live overview of all disciplinary cases across FSMPC" />
      <GuideBanner view="dash" />
      <div className="stat-grid">
        <Stat n={open} label="Open cases" color="#1E40AF" />
        <Stat n={resp} label="Awaiting response" color="#B45309" />
        <Stat n={app} label="Under appeal" color="#6D28D9" />
        <Stat n={closed} label="Closed" color="#059669" />
      </div>
      <div className="grid2">
        <Card title="Cases by category" sub="Where issues are arising">
          {byCat.length ? byCat.map(x => (
            <div key={x.cat} className="bar-row">
              <div className="bar-label"><span dangerouslySetInnerHTML={{ __html: CAT_ICON[x.cat] || '' }} /> {x.cat}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: (x.n / maxCat * 100) + '%' }} /></div>
              <div className="bar-n">{x.n}</div>
            </div>
          )) : <Empty>No cases yet.</Empty>}
        </Card>
        <Card title="Recent cases" sub="Latest activity">
          {recent.map(c => {
            const e = empById(c.empId, emps), o = offByN(c.off, offs);
            return (
              <button key={c.id} className="recent-row" onClick={() => setView('cases')}>
                <div>
                  <div className="recent-emp">{e ? e.name : 'Unknown'}</div>
                  <div className="recent-off">{c.id} · {o ? o.name : ''}</div>
                </div>
                <span className={'pill ' + statusClass(c.status)}>{c.status}</span>
              </button>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

/* ── Cases ───────────────────────────────────────────────── */
const NEXT_ACTION = {
  Draft: { label: 'Submit to HR', to: 'With HR' },
  'With HR': { label: 'Issue notice', to: 'Awaiting Response' },
  'Awaiting Response': { label: 'Record response', to: 'Awaiting Decision' },
  'Awaiting Decision': { label: 'Record decision', to: 'Closed' },
  'Under Appeal': { label: 'CEO ruling', to: 'Closed' },
};

function Cases({ store }) {
  const { cases, emps, offs } = store;
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('');
  const [cf, setCf] = useState('');
  const [raising, setRaising] = useState(false);
  const [editing, setEditing] = useState(null);   // case being edited
  const [acting, setActing] = useState(null);      // { case, action }

  const rows = cases.filter(c => {
    const e = empById(c.empId, emps), o = offByN(c.off, offs);
    if (!e || !o) return false;
    if (q && (e.name + ' ' + o.name).toLowerCase().indexOf(q.toLowerCase()) < 0) return false;
    if (sf && c.status !== sf) return false;
    if (cf && o.cat !== cf) return false;
    return true;
  });
  const statuses = [...new Set(cases.map(c => c.status))];

  return (
    <div className="page">
      <PageHead title="Cases" sub="All disciplinary cases — raise, progress, edit or delete"
        right={<button className="btn btn-navy" onClick={() => setRaising(true)}>+ Raise a case</button>} />
      <GuideBanner view="cases" />

      <div className="filters">
        <input className="input" placeholder="Search employee or offence…" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={sf} onChange={e => setSf(e.target.value)}>
          <option value="">All statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input" value={cf} onChange={e => setCf(e.target.value)}>
          <option value="">All categories</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <Card>
        <table className="table">
          <thead>
            <tr><th>Case</th><th>Employee</th><th>Offence</th><th>Occurrence</th>
              <th>Action</th><th>Status</th><th>Manage</th></tr>
          </thead>
          <tbody>
            {rows.length ? rows.map(c => {
              const e = empById(c.empId, emps), o = offByN(c.off, offs);
              const na = NEXT_ACTION[c.status];
              return (
                <tr key={c.id}>
                  <td className="mono">{c.id}</td>
                  <td><b>{e.name}</b><div className="sub">{e.title}</div></td>
                  <td>{o.name}<div className="sub">{o.cat}</div></td>
                  <td>{occLabel(c.occ)}</td>
                  <td><span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span> {penFull(c.decision || c.rec)}</td>
                  <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span></td>
                  <td className="row-actions">
                    {na && <button className="btn btn-sm btn-navy" onClick={() => setActing({ c, action: na })}>{na.label}</button>}
                    {c.status === 'Closed' && !c.appealDate && <button className="btn btn-sm btn-ghost" onClick={() => setActing({ c, action: { label: 'Lodge appeal', to: 'Under Appeal' } })}>Appeal</button>}
                    <button className="btn btn-sm btn-ghost" onClick={() => setEditing(c)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { if (confirm(`Delete case ${c.id}? This cannot be undone.`)) store.deleteCase(c.id); }}>Delete</button>
                  </td>
                </tr>
              );
            }) : <tr><td colSpan={7}><Empty>No cases match the filter.</Empty></td></tr>}
          </tbody>
        </table>
      </Card>

      {raising && <RaiseModal store={store} onClose={() => setRaising(false)} />}
      {editing && <EditCaseModal store={store} c={editing} onClose={() => setEditing(null)} />}
      {acting && <ActionModal store={store} c={acting.c} action={acting.action} onClose={() => setActing(null)} />}
    </div>
  );
}

function RaiseModal({ store, onClose }) {
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
    if (!empId || !offN) { alert('Please select an employee and an offence.'); return; }
    if (!asDraft && !rec) { alert('Please select a recommended action within the range shown.'); return; }
    store.submitCase(+empId, +offN, rec || (penalty && penalty.opts[0]), desc, date, asDraft);
    onClose();
  }

  return (
    <Modal title="Raise a disciplinary case" onClose={onClose}
      foot={<>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-ghost" onClick={() => submit(true)}>Save as draft</button>
        <button className="btn btn-navy" onClick={() => submit(false)}>Submit to HR</button>
      </>}>
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
      {penalty && (
        <div className="penalty-box">
          <div className="sub">System check</div>
          <div className="penalty-title">
            This is {penalty.e.name}’s <span className="accent">{occLabel(penalty.occ)} occurrence</span> of this offence
            {penalty.prior ? ` (${penalty.prior} prior closed case${penalty.prior > 1 ? 's' : ''})` : ''}.
          </div>
          <div className="penalty-range">
            <span className="sub">Applicable penalty range:</span>
            <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(penalty.pair) }} />
          </div>
          {penalty.o.note && <div className="penalty-note">⚠ {penalty.o.note}</div>}
        </div>
      )}
      <Field label="Recommended action">
        <select className="input" value={rec} onChange={e => setRec(e.target.value)} disabled={!penalty}>
          <option value="">— Select recommended action —</option>
          {penalty && penalty.opts.map(c => <option key={c} value={c}>{c} — {penFull(c)}</option>)}
        </select>
      </Field>
      <Field label="Date raised"><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>
      <Field label="Description"><textarea className="input" rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="What happened…" /></Field>
    </Modal>
  );
}

function EditCaseModal({ store, c, onClose }) {
  const { emps, offs, cases } = store;
  const [rec, setRec] = useState(c.rec);
  const [desc, setDesc] = useState(c.desc || '');
  const [date, setDate] = useState(c.raised);
  const o = offByN(c.off, offs);
  const pair = o ? rangeForOcc(o, c.occ) : null;
  const opts = optionsInRange(pair);

  function save() {
    store.updateCase(c.id, { rec, desc, raised: date });
    onClose();
  }
  return (
    <Modal title={`Edit case ${c.id}`} onClose={onClose}
      foot={<>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-navy" onClick={save}>Save changes</button>
      </>}>
      <Field label="Employee"><input className="input" value={empById(c.empId, emps)?.name || ''} disabled /></Field>
      <Field label="Offence"><input className="input" value={o ? `${o.n}. ${o.name}` : ''} disabled /></Field>
      <div className="penalty-box">
        <div className="penalty-range">
          <span className="sub">{occLabel(c.occ)} occurrence — range:</span>
          <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} />
        </div>
      </div>
      <Field label="Recommended action">
        <select className="input" value={rec} onChange={e => setRec(e.target.value)}>
          {opts.map(x => <option key={x} value={x}>{x} — {penFull(x)}</option>)}
        </select>
      </Field>
      <Field label="Date raised"><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>
      <Field label="Description"><textarea className="input" rows={3} value={desc} onChange={e => setDesc(e.target.value)} /></Field>
    </Modal>
  );
}

/* Handles each lifecycle transition with the right inputs */
function ActionModal({ store, c, action, onClose }) {
  const { offs } = store;
  const o = offByN(c.off, offs);
  const pair = o ? rangeForOcc(o, c.occ) : null;
  const opts = optionsInRange(pair);
  const [decision, setDecision] = useState(c.rec);
  const [text, setText] = useState('');
  const [date, setDate] = useState('2026-06-21');

  function go() {
    switch (action.to) {
      case 'With HR': store.updateCase(c.id, { status: 'With HR' }); break;
      case 'Awaiting Response': store.issueNotice(c.id, date); break;
      case 'Awaiting Decision': store.recordResponse(c.id, text); break;
      case 'Closed':
        if (c.status === 'Under Appeal') store.ceoRuling(c.id, decision, text || 'Upheld by CEO');
        else store.recordDecision(c.id, decision, text || 'Upheld');
        break;
      case 'Under Appeal': store.lodgeAppeal(c.id, text, date); break;
      default: break;
    }
    onClose();
  }

  const needsDecision = action.to === 'Closed';
  const needsText = ['Awaiting Decision', 'Closed', 'Under Appeal'].includes(action.to);
  const needsDate = ['Awaiting Response', 'Under Appeal'].includes(action.to);
  const textLabel = action.to === 'Awaiting Decision' ? 'Employee’s response'
    : action.to === 'Under Appeal' ? 'Grounds for appeal'
    : 'Outcome note (optional)';

  return (
    <Modal title={`${action.label} — ${c.id}`} onClose={onClose}
      foot={<>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-navy" onClick={go}>{action.label}</button>
      </>}>
      <div className="penalty-box">
        <div className="penalty-range">
          <span className="sub">{occLabel(c.occ)} occurrence — range:</span>
          <span className="pmatrix" dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} />
        </div>
        {o && o.note && <div className="penalty-note">⚠ {o.note}</div>}
      </div>
      {needsDecision && (
        <Field label="Final action (within range)">
          <select className="input" value={decision} onChange={e => setDecision(e.target.value)}>
            {opts.map(x => <option key={x} value={x}>{x} — {penFull(x)}</option>)}
          </select>
        </Field>
      )}
      {needsDate && <Field label={action.to === 'Under Appeal' ? 'Appeal date' : 'Notice date'}><input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></Field>}
      {needsText && <Field label={textLabel}><textarea className="input" rows={3} value={text} onChange={e => setText(e.target.value)} /></Field>}
      {action.to === 'Awaiting Response' && <p className="hint">Issuing the notice starts the employee’s 5 working-day response window.</p>}
    </Modal>
  );
}

/* ── Table of Charges (editable) ─────────────────────────── */
function Charges({ store }) {
  const { offs } = store;
  const [q, setQ] = useState('');
  const [cf, setCf] = useState('');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const rows = offs.filter(o => {
    if (q && o.name.toLowerCase().indexOf(q.toLowerCase()) < 0 && ('' + o.n) !== q) return false;
    if (cf && o.cat !== cf) return false;
    return true;
  });

  return (
    <div className="page">
      <PageHead title="Table of Charges" sub="The recognised offences and their penalty ranges by occurrence"
        right={<button className="btn btn-navy" onClick={() => setAdding(true)}>+ Add offence</button>} />
      <GuideBanner view="charges" />
      <div className="filters">
        <input className="input" placeholder="Search offence or number…" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={cf} onChange={e => setCf(e.target.value)}>
          <option value="">All categories</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <Card>
        <table className="table">
          <thead><tr><th>#</th><th>Category</th><th>Offence</th><th>1st</th><th>2nd</th><th>3rd+</th><th>Manage</th></tr></thead>
          <tbody>
            {rows.map(o => (
              <tr key={o.n}>
                <td className="mono">{o.n}</td>
                <td><span dangerouslySetInnerHTML={{ __html: CAT_ICON[o.cat] || '' }} /> {o.cat}</td>
                <td>{o.name}{o.note && <div className="penalty-note">⚠ {o.note}</div>}</td>
                {[0, 1, 2].map(i => {
                  const pair = o.p[i] || o.p[o.p.length - 1];
                  return <td key={i} dangerouslySetInnerHTML={{ __html: rangeChips(pair) }} />;
                })}
                <td className="row-actions">
                  <button className="btn btn-sm btn-ghost" onClick={() => setEditing(o)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => { if (confirm(`Delete offence #${o.n}?`)) store.deleteOff(o.n); }}>Delete</button>
                </td>
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

  function parseP(s) {
    return s.split(',').map(t => t.trim()).filter(Boolean).map(t => {
      const parts = t.split('-').map(x => x.trim());
      return parts.length === 1 ? [parts[0], parts[0]] : [parts[0], parts[1]];
    });
  }
  function save() {
    if (!name.trim()) { alert('Please enter the offence description.'); return; }
    const p = parseP(pText);
    const bad = p.flat().find(code => !PEN_ORDER.includes(code));
    if (bad) { alert(`“${bad}” is not a valid penalty code. Use: ${PEN_ORDER.join(', ')}.`); return; }
    const patch = { name: name.trim(), cat, p, note: note.trim() || undefined };
    if (isNew) store.addOff(patch); else store.updateOff(off.n, patch);
    onClose();
  }
  return (
    <Modal title={isNew ? 'Add offence' : `Edit offence #${off.n}`} onClose={onClose}
      foot={<>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-navy" onClick={save}>{isNew ? 'Add offence' : 'Save changes'}</button>
      </>}>
      <Field label="Offence description"><textarea className="input" rows={2} value={name} onChange={e => setName(e.target.value)} /></Field>
      <Field label="Category">
        <select className="input" value={cat} onChange={e => setCat(e.target.value)}>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Penalty ranges — 1st, 2nd, 3rd (comma separated)">
        <input className="input" value={pText} onChange={e => setPText(e.target.value)} placeholder="e.g. A-R, R-S3, S10-D" />
      </Field>
      <p className="hint">Codes: A, R, S3/S10/S20 (suspension days), D. Use a single code (e.g. “D”) or a range (e.g. “R-S3”). One entry per occurrence.</p>
      <Field label="Special note (optional)"><input className="input" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. If public safety IS endangered, penalty is Dismissal on first offence." /></Field>
    </Modal>
  );
}

/* ── Employees (editable) ────────────────────────────────── */
function Employees({ store }) {
  const { emps, cases } = store;
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const rows = emps.filter(e => !q || (e.name + ' ' + e.title + ' ' + e.dept).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="page">
      <PageHead title="Employees" sub="Staff directory used by the disciplinary system"
        right={<button className="btn btn-navy" onClick={() => setAdding(true)}>+ Add employee</button>} />
      <GuideBanner view="employees" />
      <div className="filters">
        <input className="input" placeholder="Search name, title or department…" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <Card>
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Title</th><th>Department</th><th>Supervisor</th><th>Cases</th><th>Manage</th></tr></thead>
          <tbody>
            {rows.map(e => {
              const n = cases.filter(c => c.empId === e.id).length;
              return (
                <tr key={e.id}>
                  <td className="mono">{e.id}</td>
                  <td><b>{e.name}</b></td>
                  <td>{e.title}</td>
                  <td>{e.dept}</td>
                  <td>{e.sup}</td>
                  <td>{n}</td>
                  <td className="row-actions">
                    <button className="btn btn-sm btn-ghost" onClick={() => setEditing(e)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                      if (n > 0) { alert(`${e.name} has ${n} case(s) and cannot be deleted.`); return; }
                      if (confirm(`Delete ${e.name}?`)) store.deleteEmp(e.id);
                    }}>Delete</button>
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
  function save() {
    if (!f.name.trim()) { alert('Please enter a name.'); return; }
    if (isNew) store.addEmp(f); else store.updateEmp(emp.id, f);
    onClose();
  }
  return (
    <Modal title={isNew ? 'Add employee' : `Edit ${emp.name}`} onClose={onClose}
      foot={<>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-navy" onClick={save}>{isNew ? 'Add' : 'Save changes'}</button>
      </>}>
      <Field label="Full name"><input className="input" value={f.name} onChange={set('name')} /></Field>
      <Field label="Job title"><input className="input" value={f.title} onChange={set('title')} /></Field>
      <Field label="Department"><input className="input" value={f.dept} onChange={set('dept')} /></Field>
      <Field label="Supervisor"><input className="input" value={f.sup} onChange={set('sup')} /></Field>
    </Modal>
  );
}

/* ── CEO Report ──────────────────────────────────────────── */
function Report({ store }) {
  const { cases, emps, offs } = store;
  const open = cases.filter(c => c.status !== 'Closed');
  const closed = cases.filter(c => c.status === 'Closed');
  const tbl = (list, empty) => list.length ? (
    <table className="table">
      <thead><tr><th>Case</th><th>Employee</th><th>Offence</th><th>Action</th><th>Status</th></tr></thead>
      <tbody>
        {list.map(c => {
          const e = empById(c.empId, emps), o = offByN(c.off, offs);
          return (
            <tr key={c.id}>
              <td className="mono">{c.id}</td>
              <td>{e ? e.name : ''}</td>
              <td>{o ? o.name : ''}</td>
              <td><span className={'chip ' + penClass(c.decision || c.rec)}>{c.decision || c.rec}</span></td>
              <td><span className={'pill ' + statusClass(c.status)}>{c.status}</span>{c.outcome && <div className="sub">{c.outcome}</div>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : <Empty>{empty}</Empty>;

  return (
    <div className="page">
      <PageHead title="CEO Weekly Report" sub="Summary of disciplinary activity for executive review" />
      <GuideBanner view="report" />
      <div className="stat-grid">
        <Stat n={open.length} label="Open" color="#1E40AF" />
        <Stat n={closed.length} label="Closed" color="#059669" />
        <Stat n={cases.filter(c => c.status === 'Under Appeal').length} label="Under appeal" color="#6D28D9" />
        <Stat n={cases.filter(c => (c.decision || c.rec) === 'D').length} label="Dismissals" color="#B42318" />
      </div>
      <Card title="Open cases" sub="Requiring attention or in progress">{tbl(open, 'No open cases.')}</Card>
      <div style={{ height: 16 }} />
      <Card title="Recently closed" sub="Concluded cases">{tbl(closed, 'No closed cases.')}</Card>
    </div>
  );
}

/* ── How it works (full walkthrough) ─────────────────────── */
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
        <div className="step-head">
          <span className="role-badge" style={{ color: role.c, background: role.bg }}>{role.name}</span>
          <h3 dangerouslySetInnerHTML={{ __html: s.title }} />
        </div>
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

/* ── shared bits ─────────────────────────────────────────── */
function PageHead({ title, sub, right }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1>{sub && <p className="page-sub">{sub}</p>}</div>
      {right && <div className="page-head-r">{right}</div>}
    </div>
  );
}
function Stat({ n, label, color }) {
  return <div className="stat"><div className="stat-n" style={{ color }}>{n}</div><div className="stat-l">{label}</div></div>;
}
function Card({ title, sub, children }) {
  return (
    <div className="card">
      {(title || sub) && <div className="card-head">{title && <div className="card-title">{title}</div>}{sub && <div className="card-sub">{sub}</div>}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
}
function Empty({ children }) { return <div className="empty">{children}</div>; }
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Modal({ title, onClose, foot, children }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><h3>{title}</h3><button className="modal-x" onClick={onClose}>×</button></div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">{foot}</div>
      </div>
    </div>
  );
}
