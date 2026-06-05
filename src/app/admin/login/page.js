'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = '1234';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      alert('비밀번호가 올바르지 않습니다.');
      return;
    }

    localStorage.setItem('weflow_admin_auth', 'true');
    router.push('/admin');
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-8">
        <p className="text-blue-400 tracking-[0.3em] text-xs font-bold mb-3">ADMIN</p>
        <h1 className="text-2xl font-black text-white mb-8">관리자 로그인 : 비번 1234</h1>

        <label className="block text-sm text-slate-300 mb-2">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="관리자 비밀번호"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white mb-5"
        />

        <button type="submit" className="w-full gradient-blue text-white font-bold py-3 rounded-xl">
          로그인
        </button>
      </form>
    </section>
  );
}
