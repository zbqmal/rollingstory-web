'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/use-auth';

export default function LoginPage() {
  const r = useRouter();
  const { login, isLoading, error } = useAuth();
  const c = useRef<HTMLInputElement>(null);
  const p = useRef<HTMLInputElement>(null);
  const [v, setV] = useState('');

  const h = async (e: React.FormEvent) => {
    e.preventDefault();
    const cv = c.current?.value || '';
    const pv = p.current?.value || '';
    if (!cv.trim()) { setV('Email or username required'); return; }
    if (!pv) { setV('Password required'); return; }
    setV('');
    try { await login(cv, pv); r.push('/'); } catch {}
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h1>
        <form onSubmit={h} className="space-y-5">
          <div>
            <label htmlFor="c" className="block text-sm font-medium text-gray-700 mb-2">Email or Username</label>
            <input ref={c} id="c" type="text" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="p" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input ref={p} id="p" type="password" onChange={() => setV('')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" disabled={isLoading} />
          </div>
          {(v || error) && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{v || error}</div>}
          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account? <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
