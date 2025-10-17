# JobNest Urdaneta – MVP Completion Notes

## New pages
- `/jobs/[id]` – job details page
- `/admin/review` – admin moderation (approve/reject)
- `/privacy` and `/terms` – basic legal pages

## Admin access
- Add your Firebase **UID** to `.env.local`:
  ```
  NEXT_PUBLIC_ADMIN_UIDS=REPLACE_WITH_YOUR_UID
  ```
  Multiple admins: `uid1,uid2,uid3`

- Find your UID after signing in: check `auth.currentUser.uid` in browser console or from Firebase Console → Authentication.

## Firestore documents
Each job:
```json
{
  "title": "...",
  "company": "...",
  "location": "Urdaneta City",
  "entityType": "government|gocc|private",
  "salary": "...",
  "description": "...",
  "contactEmail": "hr@example.com",
  "createdAt": "<serverTimestamp>",
  "createdBy": "<uid|null>",
  "status": "pending|approved|rejected"
}
```

## Suggested next improvements
- Tighten security rules to allow `update` only for admins (using custom claims) and allow read only when `status != 'rejected'`.
- Add email notifications on approval/rejection.
- Add pagination and richer search.
- Add image/logo upload for employers.
