'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/use-auth';

export default function RegisterPage() {
  const r = useRouter();
  const { register, isLoading, error } = useAuth();
  const e = useRef<HTMLInputElement>(null);
  const u = useRef<HTMLInputElement>(null);
  const p1 = useRef<HTMLInputElement>(null);
  const p2 = useRef<HTMLInputElement>(null);
  const [v, setV] = useState('');

  const h = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const ev = e.current?.value || '';
    const uv = u.current?.value || '';
    const p1v = p1.current?.value || '';
    const p2v = p2.current?.value || '';
    if (!ev.trim()) { setV('Email required'); return; }
    if (!ev.includes('@')) { setV('Invalid email'); return; }
    if (!uv.trim()) { setV('Username required'); return; }
    if (uv.length < 3) { setV('Username 3+ chars'); return; }
    if (!p1v) { setV('Password required'); return; }
    if (p1v.length < 6) { setV('Password 6+ chars'); return; }
    if (p1v !== p2v) { setV('Passwords must match'); return; }
    setV('');
    try { await register(ev, uv, p1v); r.push('/'); } catch {}
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>
        <form onSubmit={h} className="space-y-5">
          <div>
            <label htmlFor="e" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input ref={e} id="e" type="email" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="u" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input ref={u} id="u" type="text" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="p1" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input ref={p1} id="p1" type="password" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="p2" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input ref={p2} id="p2" type="password" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          {(v || error) && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{v || error}</div>}
          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login</a></p>
        </div>
      </div>
    </div>
  );
}
