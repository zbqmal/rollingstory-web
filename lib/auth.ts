import { User, AuthResponse } from '@/types';
import { api } from './api';

type S = { u: User | null; b: boolean; e: string | null };
let s: S = { u: null, b: true, e: null };
let ls: ((x: S) => void)[] = [];
let bt = false;
const K = 'tk';

const n = () => ls.forEach(l => l(s));
const up = (p: Partial<S>) => { s = { ...s, ...p }; n(); };

export const auth = {
  w: (l: (x: S) => void) => { ls.push(l); l(s); return () => { ls = ls.filter(x => x !== l); }; },
  g: () => s,
  async i() {
    if (bt) return;
    bt = true;
    const t = typeof window !== 'undefined' ? localStorage.getItem(K) : null;
    if (!t) { up({ b: false }); return; }
    try {
      const u = await api.getCurrentUser() as User;
      up({ u, b: false });
    } catch {
      if (typeof window !== 'undefined') localStorage.removeItem(K);
      up({ u: null, b: false });
    }
  },
  async r(em: string, un: string, pw: string) {
    up({ b: true, e: null });
    try {
      const r = await api.register(em, un, pw) as AuthResponse;
      if (typeof window !== 'undefined') localStorage.setItem(K, r.token);
      up({ u: r.user, b: false });
    } catch (x) {
      up({ b: false, e: x instanceof Error ? x.message : 'Reg fail' });
      throw x;
    }
  },
  async l(c: string, pw: string) {
    up({ b: true, e: null });
    try {
      const r = await api.login(c, pw) as AuthResponse;
      if (typeof window !== 'undefined') localStorage.setItem(K, r.token);
      up({ u: r.user, b: false });
    } catch (x) {
      up({ b: false, e: x instanceof Error ? x.message : 'Login fail' });
      throw x;
    }
  },
  o() {
    if (typeof window !== 'undefined') localStorage.removeItem(K);
    up({ u: null, e: null });
  }
};
