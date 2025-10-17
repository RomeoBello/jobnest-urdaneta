# JobNest Patch: Apply flow + Employer dashboard

## New routes
- **/apply/[jobId]** — job application page (name, email, message, optional resume upload)
- **/employer/jobs** — list of jobs posted by the logged-in employer
- **/employer/jobs/[jobId]/applicants** — view applications submitted for a job

## How it works
- Applications go to the `applications` collection, with optional `resumeUrl` in Storage.
- Employer jobs list filters by `createdBy == currentUser.uid`.
- Applicants page queries `applications` by `jobId`.

## Setup
1) Unzip into your project root and allow overwrite.
2) Make sure your Firestore **rules** allow creating `applications` and reading your own data (we added a dev-friendly set earlier).
3) Run dev server:
```bash
npm run dev
```
4) Test: open one job card at `/jobs`, then go to `/apply/[jobId]` by replacing the ID.

## Notes
- Resume uploads require the user to be signed in (Storage rules).
- We can add admin toggles and notifications next.
