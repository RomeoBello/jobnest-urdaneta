export function isAdmin(uid?: string | null) {
  if (!uid) return false;
  const raw = process.env.NEXT_PUBLIC_ADMIN_UIDS || '';
  const list = raw.split(',').map(s => s.trim()).filter(Boolean);
  return list.includes(uid);
}
