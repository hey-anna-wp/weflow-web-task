'use client';

import { useState } from 'react';
import { AlignLeft, ChevronDown } from 'lucide-react';
import { STICKY_FORM } from '@/data/commonText';

export default function StickyForm({ id }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: STICKY_FORM.fields.type.defaultOption,
    industry: '',
    request: '',
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.agree) return alert('개인정보 수집 및 이용에 동의해 주세요.');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div id={id} className="bg-[#080c18] border border-white/[0.08] rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold text-white mb-2">접수 완료!</h3>
        <p className="text-sm text-slate-400">빠른 시간 내에 연락드리겠습니다.</p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-[#0d1220] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 transition-colors';

  return (
    <div
      id={id}
      className="bg-[#080c18] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
    >
      {/* 헤더 */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <AlignLeft size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{STICKY_FORM.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{STICKY_FORM.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="px-6 pt-4 pb-4 space-y-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {STICKY_FORM.fields.name.label}
            {STICKY_FORM.fields.name.required && <span className="text-blue-400 ml-0.5">*</span>}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.name.placeholder}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {STICKY_FORM.fields.phone.label}
            {STICKY_FORM.fields.phone.required && <span className="text-blue-400 ml-0.5">*</span>}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.phone.placeholder}
            required
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="block text-sm text-slate-300 mb-1">{STICKY_FORM.fields.type.label}</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`${inputClass} appearance-none pr-10`}
          >
            {STICKY_FORM.fields.type.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="absolute right-2 top-[70%] -translate-y-1/2 text-slate-300 pointer-events-none"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">{STICKY_FORM.fields.industry.label}</label>
          <input
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.industry.placeholder}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">{STICKY_FORM.fields.request.label}</label>
          <textarea
            name="request"
            value={form.request}
            onChange={handleChange}
            placeholder={STICKY_FORM.fields.request.placeholder}
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 flex-shrink-0"
          />
          <span className="text-xs text-slate-400">{STICKY_FORM.fields.agree}</span>
        </label>

        <button type="submit" className="w-full gradient-blue text-white font-bold py-3 rounded-xl text-sm mt-1">
          {STICKY_FORM.submit}
        </button>
      </form>
    </div>
  );
}
