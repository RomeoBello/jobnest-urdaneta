# JobNest Feature Patch: Employers & Job Seekers

## What this adds
- **Employers**: Rich Post Job form (employment type, pay range & type, category, experience, requirements, benefits, company logo upload)
- **Job Seekers**: `/seekers/profile` page to upload a resume (Storage) or paste details manually; set desired pay and employment
- **Jobs page**: Filters for employment type, entity (gov/GOCC/private), pay type, and minimum pay
- **Rules**: Draft Firestore and Storage rules

## Apply this patch
Unzip into your project root and overwrite files. Then:

```bash
npm run dev
```

## Update Firebase rules
In Firebase Console:
- Firestore → Rules → paste contents of `firebase.rules`, then **Publish**
- Storage  → Rules → paste contents of `storage.rules`, then **Publish**

> Note: `request.auth.token.admin` requires setting a custom claim for admins via the Admin SDK. For now, moderation UI checks `NEXT_PUBLIC_ADMIN_UIDS`, but rules above anticipate a future hardening. We can ship a script later.

## Notes
- Logo upload goes to `logos/` (public read). Resumes go to `resumes/` (private).
- Applications collection is reserved for the next step (apply form).
