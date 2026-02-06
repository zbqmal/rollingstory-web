'use client';

import { useEffect, useState } from 'react';
import { auth } from './auth';

export function useAuth() {
  const [d, setD] = useState(() => auth.g());
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const rm = auth.w(setD);
    auth.i().then(() => setOk(true));
    return rm;
  }, []);

  return {
    user: d.u,
    isAuthenticated: d.u !== null,
    isLoading: d.b,
    error: d.e,
    ready: ok,
    register: auth.r,
    login: auth.l,
    logout: auth.o,
  };
}
