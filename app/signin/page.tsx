'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function SignIn() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const f = new FormData(e.currentTarget)
    try {
      await signInWithEmailAndPassword(
        auth,
        String(f.get('email')),
        String(f.get('password'))
      )
      window.location.href = '/'
    } catch (err: any) {
      alert(err?.message ?? 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brandNavy">Sign In</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="px-3 py-2 rounded-lg border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="px-3 py-2 rounded-lg border"
        />
        <button
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-brandNavy text-white"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
