# FSMPC Disciplinary Management

React + Vite app implementing the FSMPC disciplinary procedure and Table of Charges.

## Run
```
npm install
npm run dev      # development
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## What it does
- **Dashboard** — live overview of all cases by status and category.
- **Cases** — raise, edit, delete, and progress cases through the full workflow:
  Draft → With HR → Awaiting Response (5 working days) → Awaiting Decision →
  Closed, with an optional Appeal → CEO ruling (10 working days).
  Occurrence (1st/2nd/3rd) and the penalty range are worked out automatically
  from the employee's closed-case history and the Table of Charges.
- **Table of Charges** — all 40 offences with penalty ranges by occurrence;
  add / edit / delete offences (codes: A, R, S#, D).
- **Employees** — staff directory; add / edit / delete.
- **CEO Report** — weekly summary for executive review.
- **How it works** — full step-by-step walkthrough; every panel also has its own
  short guide banner.

Data (cases, employees, charges) is saved to the browser's localStorage in this
review build. The production app persists to MongoDB via the API. Use
"Reset sample data" in the sidebar to restore the seed data.

## Cross-check
All 40 offences and their 1st/2nd/3rd penalty ranges were verified against the
FSMPC Offences & Rules document.
