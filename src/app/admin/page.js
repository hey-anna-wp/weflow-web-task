'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SAMPLE_RESERVATIONS = [
  {
    id: 1,
    name: '홍길동',
    phone: '010-0000-0000',
    type: '랜딩 페이지 제작',
    industry: '피트니스',
    request: '빠른 상담 원합니다.',
    status: '대기',
  },
];

const SAMPLE_INQUIRIES = [
  {
    id: 1,
    name: '김문의',
    phone: '010-1111-2222',
    type: '홈페이지 제작',
    industry: '카페',
    request: '견적 문의드립니다.',
    status: '대기',
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const isAuth = localStorage.getItem('weflow_admin_auth');

    if (isAuth !== 'true') {
      router.push('/admin/login');
      return;
    }

    const savedReservations = JSON.parse(localStorage.getItem('weflow_reservations') || 'null');
    const savedInquiries = JSON.parse(localStorage.getItem('weflow_inquiries') || 'null');

    setReservations(savedReservations || SAMPLE_RESERVATIONS);
    setInquiries(savedInquiries || SAMPLE_INQUIRIES);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('weflow_admin_auth');
    router.push('/admin/login');
  }

  function updateReservationStatus(id, status) {
    const next = reservations.map((item) => (item.id === id ? { ...item, status } : item));

    setReservations(next);
    localStorage.setItem('weflow_reservations', JSON.stringify(next));
  }

  function deleteReservation(id) {
    const next = reservations.filter((item) => item.id !== id);

    setReservations(next);
    localStorage.setItem('weflow_reservations', JSON.stringify(next));
  }

  function updateInquiryStatus(id, status) {
    const next = inquiries.map((item) => (item.id === id ? { ...item, status } : item));

    setInquiries(next);
    localStorage.setItem('weflow_inquiries', JSON.stringify(next));
  }

  function deleteInquiry(id) {
    const next = inquiries.filter((item) => item.id !== id);

    setInquiries(next);
    localStorage.setItem('weflow_inquiries', JSON.stringify(next));
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-blue-400 tracking-[0.3em] text-xs font-bold mb-3">ADMIN</p>
            <h1 className="text-3xl font-black text-white">관리자 페이지</h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold"
          >
            로그아웃
          </button>
        </div>

        <AdminTable
          title="예약 관리"
          data={reservations}
          actions={(item) => (
            <>
              <button
                onClick={() => updateReservationStatus(item.id, '완료')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                완료
              </button>
              <button
                onClick={() => deleteReservation(item.id)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
              >
                삭제
              </button>
            </>
          )}
        />

        <AdminTable
          title="문의 관리"
          data={inquiries}
          actions={(item) => (
            <>
              <button
                onClick={() => updateInquiryStatus(item.id, '진행중')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold"
              >
                진행중
              </button>
              <button
                onClick={() => updateInquiryStatus(item.id, '완료')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
              >
                완료
              </button>
              <button
                onClick={() => deleteInquiry(item.id)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
              >
                삭제
              </button>
            </>
          )}
        />
      </div>
    </section>
  );
}

function AdminTable({ title, data, actions }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-black text-white mb-4">{title}</h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-950/70 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">이름</th>
              <th className="px-4 py-3 text-left">연락처</th>
              <th className="px-4 py-3 text-left">제작 종류</th>
              <th className="px-4 py-3 text-left">업종</th>
              <th className="px-4 py-3 text-left">요청사항</th>
              <th className="px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-left">관리</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t border-slate-800 text-slate-300">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.industry}</td>
                  <td className="px-4 py-3">{item.request}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-800 text-xs">{item.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">{actions(item)}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
