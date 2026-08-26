export const OFFENCES=[
 {n:1,cat:'Attendance',name:'Unexcused tardiness (late without good reason)',p:[['A','A'],['R','S3'],['S10','D']]},
 {n:2,cat:'Attendance',name:'Unexcused or unauthorised absence (AWOL)',p:[['R','S3'],['S10','S20'],['D','D']]},
 {n:3,cat:'Attendance',name:'Abandonment of position',p:[['D','D']]},
 {n:4,cat:'Attendance',name:'Leaving assigned job during working hours without permission',p:[['A','R'],['S3','S10'],['S20','D']]},
 {n:5,cat:'Performance',name:'Loafing, idleness, wasting time',p:[['A','A'],['R','S3'],['S20','D']]},
 {n:6,cat:'Performance',name:'Careless or negligent workmanship causing waste or delay',p:[['A','R'],['R','D'],['D','D']]},
 {n:7,cat:'Safety',name:'Traffic violation, reckless driving, improper vehicle operation',p:[['A','S10'],['S10','S20'],['D','D']]},
 {n:8,cat:'Safety',name:'Ignoring safety precautions or not using safety clothing/equipment',p:[['S10','S10'],['S10','S20'],['D','D']]},
 {n:9,cat:'Safety',name:'Smoking in "No Smoking" areas; matches/lighters in explosive areas',p:[['R','D'],['D','D']]},
 {n:10,cat:'Safety',name:'Carrying explosives, firearms or lethal weapons without authorisation',p:[['R','D'],['D','D']]},
 {n:11,cat:'Safety',name:'Endangering the safety of, or injuring, other personnel',p:[['R','D'],['S20','D'],['D','D']]},
 {n:12,cat:'Safety',name:'Failure to report a personal injury or accident at work',p:[['A','R'],['A','R'],['R','S3']]},
 {n:13,cat:'Performance',name:'Deliberate failure/delay in carrying out instructions (e.g. monthly reports)',p:[['R','S3'],['S10','D'],['D','D']]},
 {n:14,cat:'Performance',name:'Sleeping on duty (public safety NOT endangered)',p:[['A','S10'],['R','S10'],['D','D']],note:'If public safety IS endangered, the penalty is Dismissal (D) on the first offence.'},
 {n:15,cat:'Conduct',name:'Physical/verbal abuse, disrespect, gossip, insulting language, defamation',p:[['R','D'],['S20','D'],['D','D']]},
 {n:16,cat:'Performance',name:'Excessive/improper personal use of Company equipment (phone, PC, email, internet)',p:[['A','R'],['R','S3'],['S3','S10']]},
 {n:17,cat:'Conflict of Interest',name:'Outside employment or financial interest without CEO approval',p:[['R','D'],['S10','D'],['D','D']]},
 {n:18,cat:'Conflict of Interest',name:'Outside activities/relationships creating a conflict of interest',p:[['A','D'],['S3','D'],['D','D']]},
 {n:19,cat:'Conflict of Interest',name:'Unauthorised access/disclosure/misuse of confidential info or PII',p:[['A','D'],['S3','D'],['D','D']]},
 {n:20,cat:'Conduct',name:'Inappropriate fraternisation (abuse of chain-of-command relationships)',p:[['D','D']]},
 {n:21,cat:'Conduct',name:'Insubordination — refusing a proper order or abusive language to supervisors',p:[['R','D'],['S20','D'],['D','D']]},
 {n:22,cat:'Conduct',name:'Reporting for / being on duty under the influence of intoxicants',p:[['R','D'],['S10','D'],['S20','D']]},
 {n:23,cat:'Conduct',name:'Giving or selling intoxicants to others on Company premises',p:[['R','D'],['S20','D'],['D','D']]},
 {n:24,cat:'Conduct',name:'Gambling or unlawful betting on Company premises',p:[['R','S20'],['S20','D'],['D','D']]},
 {n:25,cat:'Conduct',name:'Promotion of gambling on Company premises',p:[['R','D'],['S20','D'],['D','D']]},
 {n:26,cat:'Conduct',name:'Indebtedness — not paying just financial obligations to the Company in good faith',p:[['A','A'],['A','R'],['R','D']]},
 {n:27,cat:'Integrity',name:'Actual or attempted theft of Company or personal property',p:[['D','D']]},
 {n:28,cat:'Integrity',name:'Falsifying attendance records (for self or another)',p:[['R','D'],['S20','D'],['D','D']]},
 {n:29,cat:'Integrity',name:'Falsification/concealment of material facts; forging records; false info',p:[['R','D'],['S20','D'],['D','D']]},
 {n:30,cat:'Conduct',name:'Loss, damage or unauthorised use of Company property',p:[['R','D'],['S20','D'],['D','D']]},
 {n:31,cat:'Conduct',name:'Wilful unofficial use of Company vehicle',p:[['S20','D'],['D','D']]},
 {n:32,cat:'Conduct',name:'Borrowing from a subordinate; borrowing/lending over $20 on premises',p:[['R','D'],['D','D']]},
 {n:33,cat:'Conduct',name:'Soliciting contributions / promoting unendorsed campaigns on premises',p:[['A','S3'],['S10','D'],['D','D']]},
 {n:34,cat:'Conduct',name:'Selling tickets, goods, commodities or services on Company premises',p:[['A','D'],['S10','D'],['D','D']]},
 {n:35,cat:'Integrity',name:'Accepting/soliciting gifts or gratuities from those doing business with Company',p:[['R','D'],['D','D']]},
 {n:36,cat:'Integrity',name:'Engaging in black-market activity (e.g. selling Company fuel privately)',p:[['R','D'],['D','D']]},
 {n:37,cat:'Integrity',name:'Accepting bribes or improper payments for favourable treatment',p:[['D','D']]},
 {n:38,cat:'Conduct',name:'Misconduct off duty (where it creates risk to safety, operations or trust)',p:[['A','R'],['S3','D'],['D','D']]},
 {n:39,cat:'Integrity',name:'Refusal to testify or furnish information in Company investigations',p:[['R','D'],['D','D']]},
 {n:40,cat:'Integrity',name:'Failure of security directives; failure to safeguard sensitive information',p:[['R','D']]},
];

export const CATS=['Attendance','Performance','Safety','Conduct','Integrity','Conflict of Interest'];

export const CAT_ICON={Attendance:'&#128337;',Performance:'&#128202;',Safety:'&#9888;',Conduct:'&#128101;',Integrity:'&#128272;','Conflict of Interest':'&#9878;'};

export const EMP=[
 {id:445,name:'Lesivou Bulabalavu',title:'ICT Manager',dept:'ICT',sup:'Harbert Tom'},
 {id:447,name:'Berny Etse',title:'Help Desk Officer',dept:'ICT',sup:'Lesivou Bulabalavu'},
 {id:446,name:'Roddy Weital',title:'Desktop Support Officer',dept:'ICT',sup:'Lesivou Bulabalavu'},
 {id:238,name:'Gibson Siba',title:'Terminals Manager',dept:'Operations',sup:'Savenaca Tamani'},
 {id:286,name:'Mylani Alexander',title:'Emergency Preparedness Officer',dept:'Safety',sup:'Johnny Adolph'},
 {id:341,name:'Rehnio Alfons',title:'Terminal Operator',dept:'Terminals',sup:'Wayne Narruhn'},
 {id:628,name:'Morrison Depaune',title:'Terminal Operator',dept:'Terminals',sup:'Sireli Sovau'},
 {id:629,name:'Nikson Garoa',title:'Customer Service Officer',dept:'Terminals',sup:'Sireli Sovau'},
 {id:444,name:'Mohammed Zaid',title:'Project Officer',dept:'Projects',sup:'Neil Halstead'},
 {id:441,name:'Rhonald Manrique',title:'Project Engineer',dept:'Projects',sup:'Neil Halstead'},
 {id:249,name:'Garry Garsain',title:'Supply Chain Manager',dept:'Supply Chain',sup:'Johnny Adolph'},
 {id:440,name:'Caroline Fritz',title:'Customer Service Officer',dept:'Terminals',sup:'Wilton Masaichy'},
 {id:364,name:'Rominger M.',title:'Senior Accountant',dept:'Finance',sup:'Johnny Adolph'},
 {id:450,name:'Prylain Manuel',title:'Receptionist',dept:'Admin',sup:'Joseph Saimon'},
];


/* Executive Members — each holds a portfolio of departments and can see
   the disciplinary standing of every employee under that portfolio. */

/* Appraisal status is owned by the STIP system, not the disciplinary module.
   For this prototype we derive a stable sample status per employee so the
   Executive can see appraisal standing alongside discipline. In production this
   comes from the STIP API. */
export const APPRAISAL_STATUSES = ['CEO Approved','With HR','Submitted to CEO','Pending'];
export function appraisalStatus(empId, quarter) {
  // deterministic pseudo-status from id+quarter so it stays stable across renders
  const q = quarter === 'Q1' ? 7 : 13;
  const idx = (empId * 3 + q) % 10;
  if (idx < 4) return 'CEO Approved';
  if (idx < 6) return 'With HR';
  if (idx < 8) return 'Submitted to CEO';
  return 'Pending';
}
export function apprStatusClass(s) {
  return s === 'CEO Approved' ? 'st-closed'
    : s === 'With HR' ? 'st-hr'
    : s === 'Submitted to CEO' ? 'st-appeal'
    : 'st-draft';
}

export const COUNSEL_OUTCOMES = ['Resolved','Verbal admonishment','Escalated'];

export const EXECUTIVES = [
  { id: 'exec-ops', name: 'Savenaca Tamani', title: 'Executive — Operations Group', depts: ['Operations','Terminals','Safety'] },
  { id: 'exec-corp', name: 'Johnny Adolph', title: 'Executive — Corporate Services', depts: ['Finance','Supply Chain','Admin'] },
  { id: 'exec-tech', name: 'Neil Halstead', title: 'Executive — Technology & Projects', depts: ['ICT','Projects'] },
];

export const PEN_ORDER=['A','R','S3','S10','S20','D'];

export const ROLES={
  ict:{name:'ICT Admin',c:'#0891B2',bg:'#CFFAFE',init:'IT'},
  lm:{name:'Line Manager',c:'#1E40AF',bg:'#DBEAFE',init:'LM'},
  hr:{name:'HR Manager',c:'#B45309',bg:'#FEF3C7',init:'HR'},
  staff:{name:'Staff',c:'#059669',bg:'#D1FAE5',init:'ST'},
  ceo:{name:'CEO',c:'#6D28D9',bg:'#EDE9FE',init:'CE'},
  exec:{name:'Executive Member',c:'#134E4A',bg:'#CCFBF1',init:'EX'},
  smt:{name:'SMT',c:'#7C2D12',bg:'#FFEDD5',init:'SM'},
};

export const STEPS = [
 {
  "role": "ict",
  "title": "Set up the disciplinary module",
  "short": "Setup",
  "desc": "Before anyone can use the system, the ICT Admin sets it up — loads the Table of Charges, decides who is allowed to raise cases (supervisors) and who reviews them (HR and the CEO), and switches on audit logging so every action is recorded. This is a one-time setup.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">ICT Admin · System setup</div><div style=\"display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)\"><span style=\"width:20px;height:20px;border-radius:50%;background:var(--green-mid);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0\">&#10003;</span><div><div style=\"font-size:13px;font-weight:600;color:var(--ink)\">Table of Charges</div><div style=\"font-size:11px;color:var(--muted)\">40 offences loaded</div></div></div><div style=\"display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)\"><span style=\"width:20px;height:20px;border-radius:50%;background:var(--green-mid);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0\">&#10003;</span><div><div style=\"font-size:13px;font-weight:600;color:var(--ink)\">Roles &amp; permissions</div><div style=\"font-size:11px;color:var(--muted)\">Supervisors can raise · HR reviews · CEO approves</div></div></div><div style=\"display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)\"><span style=\"width:20px;height:20px;border-radius:50%;background:var(--green-mid);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0\">&#10003;</span><div><div style=\"font-size:13px;font-weight:600;color:var(--ink)\">Working-day timers</div><div style=\"font-size:11px;color:var(--muted)\">5 days to respond · 10 days to appeal</div></div></div><div style=\"display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)\"><span style=\"width:20px;height:20px;border-radius:50%;background:var(--green-mid);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0\">&#10003;</span><div><div style=\"font-size:13px;font-weight:600;color:var(--ink)\">Audit logging</div><div style=\"font-size:11px;color:var(--muted)\">ON — every action recorded</div></div></div>"
 },
 {
  "role": "lm",
  "title": "Counsel the employee first",
  "short": "Counsel",
  "desc": "When a problem first happens, the supervisor (line manager) does NOT jump to punishment. The first step is a private chat to understand and fix the issue. The supervisor notes this in their own records. A formal case only follows if counselling does not resolve the problem.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">Line Manager · Counselling note</div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:13px 15px;font-size:13px;color:var(--ink);line-height:1.6\">Spoke privately with the employee about repeated late arrivals. Agreed on a plan to improve punctuality. No formal action at this stage.</div><div style=\"font-size:11px;color:var(--muted);margin-top:10px\">&#128161; Discipline is always a last resort. This informal step comes first.</div>"
 },
 {
  "role": "lm",
  "title": "Raise a disciplinary case",
  "short": "Raise case",
  "desc": "If the problem continues, the supervisor opens the system and selects the offence. The system automatically checks the employee&rsquo;s history and shows whether this is the 1st, 2nd or 3rd time — and the matching penalty range. The supervisor writes up the facts, recommends an action within that range, and submits it to HR.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">Line Manager · Raise case form</div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Employee</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\">Berny Etse — Help Desk Officer</span></div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Offence</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\">#1 Unexcused tardiness</span></div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:11px 13px;margin:10px 0\"><div style=\"font-size:11px;color:var(--muted);margin-bottom:4px\">System check (automatic)</div><div style=\"font-size:13px;font-weight:700;color:var(--navy)\">2nd occurrence → penalty range <span class=\"pen pen-R\">R</span> <span class=\"parrow\">&rarr;</span> <span class=\"pen pen-S\">S3</span></div></div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Recommended action</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\"><span class=\"pen pen-R\">R</span> Written warning</span></div><div style=\"margin-top:10px\"><span class=\"st st-hr\">Submitted to HR</span></div>"
 },
 {
  "role": "hr",
  "title": "HR investigates the case",
  "short": "Investigate",
  "desc": "Before issuing any notice, HR investigates. HR establishes the facts of the incident, discusses it with the line manager and the employee, and may question other staff who were on site as witnesses. Witness names and statements are recorded, and any supporting documents or images (reports, photos, CCTV stills) are uploaded as evidence. Only once the investigation is saved can HR issue the official notice.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">HR Manager · Investigation</div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:13px 15px;font-size:13px;color:var(--ink);line-height:1.6\">Findings: CCTV confirms the bay was left unattended at 14:05. Discussed with the line manager and the employee.</div><div style=\"font-size:11px;color:var(--muted);text-transform:uppercase;font-weight:700;margin:12px 0 6px\">Witnesses</div><div style=\"display:flex;gap:8px;flex-wrap:wrap\"><span class=\"st st-hr\">Sireli Sovau</span><span class=\"st st-hr\">Wayne Narruhn</span></div><div style=\"font-size:11px;color:var(--muted);text-transform:uppercase;font-weight:700;margin:12px 0 6px\">Evidence</div><div style=\"display:flex;align-items:center;gap:8px\"><span>&#128196;</span><span style=\"font-size:12px;color:var(--navy);font-weight:600\">incident_report.pdf</span><span>&#128247;</span><span style=\"font-size:12px;color:var(--navy);font-weight:600\">cctv_still.png</span></div>"
 },
 {
  "role": "hr",
  "title": "HR reviews and issues official notice",
  "short": "HR review",
  "desc": "With the investigation complete, HR issues the official notice of the charge and the proposed action, in line with the Table of Charges. The notice goes to both the employee and the line manager, and starts the employee&rsquo;s 5-working-day response window.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">HR Manager · Official notice</div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:13px 15px;font-size:13px;color:var(--ink);line-height:1.6\">Official Notice of Charge issued to the employee. Charge: Offence #1 (unexcused tardiness), 2nd occurrence. Proposed action: Written warning (R).</div><div style=\"display:flex;align-items:center;gap:8px;margin-top:10px\"><span class=\"st st-resp\">Awaiting employee response</span><span class=\"timer\">5 working days to respond</span></div>"
 },
 {
  "role": "staff",
  "title": "Employee responds — HR records it (5 working days)",
  "short": "Respond",
  "desc": "The employee receives the notice and has 5 working days to give their side of the story. They submit a written response in the system. If they have a genuine reason they cannot respond in time, a reasonable extension can be granted.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">Staff · Response box</div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:13px 15px;font-size:13px;color:var(--ink);line-height:1.6\">\"I was late on those days due to a family medical emergency. I have since arranged earlier transport and it will not happen again. Supporting note from the clinic is attached.\"</div><div style=\"display:flex;align-items:center;gap:8px;margin-top:10px\"><span class=\"st st-resp\">Response submitted</span><span class=\"timer\">3 working days left</span></div>"
 },
 {
  "role": "smt",
  "title": "HR may forward to the CEO or SMT",
  "short": "Forward",
  "desc": "After the investigation and all discussion with the line manager and employee, HR can forward the case up instead of deciding it at HR level. <b>Case 1 &mdash; HR &rarr; CEO:</b> HR forwards the case directly to the CEO, and the CEO takes the final decision and closes the case. <b>Case 2 &mdash; HR &rarr; SMT &rarr; CEO:</b> HR forwards the case to the Senior Management Team, who recommend an action (within the offence range) with their rationale; the case then goes to the CEO, who takes the final decision and closes it. In both cases the CEO is the final decision-maker.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">HR &rarr; SMT &rarr; CEO</div><div style=\"background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:13px 15px;margin-bottom:10px\"><div style=\"font-size:11px;color:#7C2D12;font-weight:800;text-transform:uppercase;margin-bottom:5px\">SMT recommendation</div><div style=\"font-size:13px;font-weight:700;color:var(--navy)\"><span class=\"pen pen-S\">S10</span> 10-day suspension</div><div style=\"font-size:12px;color:var(--muted);margin-top:3px\">Given the severity, the SMT recommends this action to the CEO.</div></div><div style=\"display:flex;align-items:center;gap:8px\"><span class=\"st st-ceo\">With CEO</span><span style=\"font-size:11px;color:var(--muted)\">CEO makes the final decision</span></div>"
 },
 {
  "role": "hr",
  "title": "HR records the decision",
  "short": "Decision",
  "desc": "HR carefully considers the employee&rsquo;s response, including any mitigating factors, and records the final action — which must fall within the Table of Charges range for that offence. The outcome is saved to the employee&rsquo;s personal file.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">HR Manager · Decision</div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Charge</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\">#1 Unexcused tardiness (2nd)</span></div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Decision</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\"><span class=\"pen pen-R\">R</span> Written warning</span></div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Recorded in</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\">Employee personal file</span></div><div style=\"margin-top:10px\"><span class=\"st st-closed\">Case closed — upheld</span></div>"
 },
 {
  "role": "staff",
  "title": "Right to appeal (10 working days)",
  "short": "Appeal",
  "desc": "If the employee disagrees with the decision, they may appeal in writing within 10 working days, attaching any evidence, witness statements, or the rules they believe were not followed. The appeal goes to the CEO.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">Staff · Appeal (optional)</div><div style=\"background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:13px 15px;font-size:13px;color:var(--ink);line-height:1.6\">\"I would like to appeal the written warning. I believe the family emergency was a valid reason and I notified my supervisor by phone on each occasion.\"</div><div style=\"display:flex;align-items:center;gap:8px;margin-top:10px\"><span class=\"st st-appeal\">Appeal submitted</span><span class=\"timer\">within 10 working days</span></div>"
 },
 {
  "role": "ceo",
  "title": "CEO — final decision &amp; weekly oversight",
  "short": "CEO",
  "desc": "The CEO (or an independent tribunal of peers) is the final arbiter on any appeal — their decision is final. Separately, the CEO also receives a weekly report of all disciplinary cases at the Toolbox meeting, to confirm conduct is being managed fairly and consistently across every department.",
  "mock": "<div style=\"font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px\">CEO · Final decision</div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Appeal</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\">Berny Etse — written warning</span></div><div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border)\"><span style=\"font-size:12px;color:var(--muted)\">Final decision</span><span style=\"font-size:13px;font-weight:600;color:var(--navy)\"><span class=\"pen pen-R\">R</span> Upheld (warning stands)</span></div><div style=\"height:1px;background:var(--border);margin:12px 0\"></div><div style=\"font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px\">Weekly report to CEO</div><div style=\"display:flex;gap:10px;flex-wrap:wrap\"><span class=\"tag\">4 active</span><span class=\"tag\">1 awaiting response</span><span class=\"tag\">1 under appeal</span><span class=\"tag\">3 closed</span></div>"
 }
];


export const SEED_CASES=[
 {id:'DC-1042',empId:341,off:14,occ:1,rec:'D',status:'Closed',raised:'2026-05-12',desc:'Found asleep at the fuel terminal control room during night shift where public safety could be affected.',decision:'D',outcome:'Upheld'},
 {id:'DC-1051',empId:447,off:1,occ:2,rec:'R',status:'Awaiting Response',raised:'2026-06-15',desc:'Arrived more than 40 minutes late on three occasions in June without notifying the supervisor.',noticeDate:'2026-06-16'},
 {id:'DC-1048',empId:446,off:8,occ:1,rec:'S10',status:'With HR',raised:'2026-06-12',desc:'Worked in the server room without the required anti-static and safety equipment despite reminders.'},
 {id:'DC-1039',empId:440,off:16,occ:1,rec:'R',status:'Under Appeal',raised:'2026-05-28',desc:'Extensive personal use of company internet and email during working hours over several weeks.',noticeDate:'2026-05-29',appealDate:'2026-06-10'},
 {id:'DC-1033',empId:444,off:2,occ:1,rec:'S3',status:'Closed',raised:'2026-04-20',desc:'Absent for two days without authorisation or notice (AWOL).',decision:'R',outcome:'Upheld (reduced to written warning after response)'},
 {id:'DC-1055',empId:341,off:1,occ:1,rec:'A',status:'Closed',raised:'2026-03-05',desc:'Late on one occasion without prior notice.',decision:'A',outcome:'Upheld'},
 {id:'DC-1058',empId:628,off:21,occ:1,rec:'R',status:'With HR',raised:'2026-06-18',desc:'Refused a reasonable instruction from the shift supervisor and used disrespectful language.'},
 {id:'DC-1060',empId:441,off:13,occ:1,rec:'R',status:'Draft',raised:'2026-06-20',desc:'Repeated delay in submitting the monthly project progress report despite reminders.'},
];

/* Per-panel guide — a short "how this panel works" shown on every screen,
   written from the FSMPC disciplinary procedure. */
export const PANEL_GUIDE = {
  'ceo-referrals': {
    title: 'How Referrals works',
    role: 'ceo',
    points: [
      'Cases HR forwarded directly to you, or that came up through the SMT with a recommendation.',
      'Where the SMT has recommended an action, it is shown here — you may follow it or decide differently, within the offence range.',
      'Your decision is final and closes the case.',
    ],
  },
  'smt-queue': {
    title: 'How SMT Referrals works',
    role: 'smt',
    points: [
      'Cases HR has forwarded to the Senior Management Team for a recommendation before the CEO decides.',
      'Review the case, the investigation and any evidence, then recommend an action to the CEO — within the offence\u2019s penalty range — with your rationale.',
      'Once recommended, the case moves to the CEO with your recommendation attached. The CEO makes the final decision.',
    ],
  },
  'smt-decided': {
    title: 'How Recommended works',
    role: 'smt',
    points: [
      'Cases the SMT has already recommended on and sent to the CEO.',
      'Shows your recommended action and rationale, and the CEO\u2019s final decision once made.',
    ],
  },
  'lm-counsel': {
    title: 'How Counselling works',
    role: 'lm',
    points: [
      'The first, informal step — before any formal case. When a performance or conduct problem first appears, counsel the employee and log it here.',
      'Record what the issue was, what was discussed, and the outcome: Resolved (no further action), Verbal admonishment (oral warning kept on file), or Escalate to a formal case.',
      'Escalating carries the counselling notes into the new case. HR, Executives and the CEO can see this log — so issues managed early are visible, not just formal cases.',
    ],
  },
  'counsel-log': {
    title: 'How the Counselling Log works',
    role: 'hr',
    points: [
      'Every informal counselling recorded by line managers, before it becomes (or instead of becoming) a formal case.',
      'Shows the issue, what was discussed, the outcome, and whether it was escalated to a case.',
      'Read-only oversight — it confirms that problems are being counselled and managed early across the company.',
    ],
  },
  'exec-counsel': {
    title: 'How Portfolio Counselling works',
    role: 'exec',
    points: [
      'The informal counselling records for employees in your portfolio, before formal cases.',
      'Lets you see that line managers are addressing issues early, and which ones escalated.',
      'Read-only oversight view.',
    ],
  },
  'exec-portfolio': {
    title: 'How My Portfolio works',
    role: 'exec',
    points: [
      'Your portfolio is the set of departments under you. It lists the line managers and staff you oversee, from the HR structure.',
      'Structure: Staff → Line Manager → Executive Member (you). You see the disciplinary standing of everyone in your portfolio.',
      'This is a read-only oversight view — you monitor, HR and the CEO act.',
    ],
  },
  'exec-appraisals': {
    title: 'How Portfolio Appraisals works',
    role: 'exec',
    points: [
      'The appraisal status of every employee in your portfolio, by quarter — Pending, Submitted to CEO, With HR, or CEO Approved.',
      'Lets you see at a glance who still needs a completed appraisal this quarter.',
      'Appraisal data comes from the STIP system; this is a read-only oversight view.',
    ],
  },
  'exec-discipline': {
    title: 'How Portfolio Discipline works',
    role: 'exec',
    points: [
      'Every disciplinary case for employees in your portfolio departments — live from the shared case data.',
      'Filter by status to see open, awaiting-response, under-appeal or closed cases across your teams.',
      'You cannot edit cases here; this view is for oversight and reporting up the chain.',
    ],
  },
  setup: {
    title: 'How System Setup works',
    role: 'ict',
    points: [
      'One-time configuration by ICT: the Table of Charges, employees, role permissions, working-day timers and audit logging.',
      'Once set up, Line Managers can raise cases, HR reviews and decides, Staff respond, and the CEO rules on appeals.',
      'Every action is written to the Audit Log for governance.',
    ],
  },
  'lm-queue': {
    title: 'How My Team works',
    role: 'lm',
    points: [
      'Shows the cases you have drafted or submitted. Counsel the employee first — a formal case is a last resort.',
      'Drafts can be submitted to HR or deleted. Once submitted, the case moves to HR and you can track its status.',
    ],
  },
  'lm-raise': {
    title: 'How Raise a Case works',
    role: 'lm',
    points: [
      'Pick the employee and offence — the system checks history and shows the 1st/2nd/3rd occurrence and matching penalty range.',
      'Your recommended action must sit inside that range. Record the statement of facts, then submit to HR (or save as a draft).',
    ],
  },
  'hr-queue': {
    title: 'How the HR Queue works',
    role: 'hr',
    points: [
      'Cases needing HR action, in order: review & issue the official notice → record the employee response → record the decision.',
      'Issuing the notice starts the 5 working-day response window. The final decision must stay within the offence range.',
      'For serious cases, after investigation you can Forward to CEO (CEO decides) or Forward to SMT (SMT recommends, then CEO decides) — in both, the CEO takes the final decision and closes the case.',
    ],
  },
  'staff-notices': {
    title: 'How My Notices works',
    role: 'staff',
    points: [
      'Official notices addressed to employees. Respond within 5 working days, giving your side and any mitigating reasons.',
      'After the decision you may appeal within 10 working days — the appeal goes to the CEO.',
    ],
  },
  'ceo-appeals': {
    title: 'How Appeals works',
    role: 'ceo',
    points: [
      'The CEO (or an independent tribunal of peers) is the final arbiter on any appeal — the ruling is final.',
      'Uphold or overturn the earlier decision; the outcome is recorded and closes the case.',
    ],
  },

  dash: {
    title: 'How the Dashboard works',
    role: 'ict',
    points: [
      'Gives a live, company-wide picture of every disciplinary case — open, awaiting response, under appeal and closed.',
      '“Cases by category” shows where issues arise most (Attendance, Safety, Conduct, etc.), so patterns can be spotted early.',
      'Discipline is always a last resort: supervisors counsel employees first, and only raise a formal case if counselling does not resolve the problem.',
    ],
  },
  cases: {
    title: 'How the Cases panel works',
    role: 'lm',
    points: [
      'Raise a case: pick the employee and offence — the system checks history and shows if it is the 1st, 2nd or 3rd occurrence and the matching penalty range.',
      'The recommended action must sit inside that range. The case then moves through the workflow: HR review → 5-day response → decision → optional 10-day appeal → CEO ruling.',
      'You can edit or delete a case, and use the action button on each row to move it to the next step. Every change is saved.',
    ],
  },
  charges: {
    title: 'How the Table of Charges works',
    role: 'hr',
    points: [
      'The 40 recognised offences and the penalty range for each occurrence (1st / 2nd / 3rd), exactly as in the FSMPC disciplinary policy.',
      'Codes: A = Admonishment (verbal warning), R = Written warning, S# = # working-day suspension without pay (e.g. S10), D = Dismissal.',
      'A range like “R → S3” means the penalty may fall anywhere from a written warning up to a 3-day suspension. Offences can be added, edited or removed here by an administrator.',
    ],
  },
  report: {
    title: 'How the CEO Report works',
    role: 'ceo',
    points: [
      'A weekly summary of all disciplinary activity for the CEO’s Toolbox meeting — confirming conduct is managed fairly and consistently across every department.',
      'Shows open and recently closed cases, cases under appeal, and any dismissals.',
      'The CEO (or an independent tribunal of peers) is the final arbiter on any appeal — that decision is final.',
    ],
  },
  employees: {
    title: 'How the Employees panel works',
    role: 'ict',
    points: [
      'The staff directory the disciplinary system draws on — name, title, department and supervisor.',
      'Add, edit or remove employees here. The supervisor field determines who counsels and raises cases for that person.',
      'Occurrence counting is per employee and per offence, based on their closed case history.',
    ],
  },
};

/* Role-based navigation: each role sees only its own panels in the loop. */
export const ROLE_NAV = {
  ict:   [ {id:'setup',label:'System Setup',icon:'⚙️'}, {id:'charges',label:'Table of Charges',icon:'⚖️'}, {id:'employees',label:'Employees',icon:'👥'}, {id:'audit',label:'Audit Log',icon:'🧾'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  lm:    [ {id:'lm-queue',label:'My Team',icon:'👤'}, {id:'lm-counsel',label:'Counselling',icon:'💬'}, {id:'lm-raise',label:'Raise a Case',icon:'➕'}, {id:'charges',label:'Table of Charges',icon:'⚖️'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  hr:    [ {id:'hr-queue',label:'HR Queue',icon:'📥'}, {id:'hr-all',label:'All Cases',icon:'📁'}, {id:'counsel-log',label:'Counselling Log',icon:'💬'}, {id:'charges',label:'Table of Charges',icon:'⚖️'}, {id:'report',label:'Weekly CEO Report',icon:'📋'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  staff: [ {id:'staff-notices',label:'My Notices',icon:'✉️'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  ceo:   [ {id:'ceo-referrals',label:'Referrals',icon:'📨'}, {id:'ceo-appeals',label:'Appeals',icon:'⚖️'}, {id:'report',label:'Weekly Report',icon:'📋'}, {id:'counsel-log',label:'Counselling Log',icon:'💬'}, {id:'audit',label:'Audit Log',icon:'🧾'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  smt:   [ {id:'smt-queue',label:'SMT Referrals',icon:'🏛️'}, {id:'smt-decided',label:'Recommended',icon:'✅'}, {id:'charges',label:'Table of Charges',icon:'⚖️'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
  exec:  [ {id:'exec-portfolio',label:'My Portfolio',icon:'🗂️'}, {id:'exec-appraisals',label:'Portfolio Appraisals',icon:'📈'}, {id:'exec-counsel',label:'Portfolio Counselling',icon:'💬'}, {id:'exec-discipline',label:'Portfolio Discipline',icon:'⚖️'}, {id:'howto',label:'How it works',icon:'ℹ️'} ],
};

export const ROLE_ORDER = ['lm','hr','staff','exec','smt','ceo','ict'];
