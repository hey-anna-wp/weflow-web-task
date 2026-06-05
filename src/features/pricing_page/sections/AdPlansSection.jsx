import Link from 'next/link';
import { Search, MapPin, Info } from 'lucide-react';
import { AD_PLANS, PRICING_NOTICE } from '@/data/pricingText';

const THEME = {
  green: {
    border: 'border-slate-800/80 hover:border-green-500/40',
    iconBg: 'bg-green-500/10 border-green-500/30',
    icon: Search,
    iconColor: 'text-green-400',
    price: 'text-green-400',
    check: 'text-green-400',
    btn: 'bg-green-600 hover:bg-green-500 text-white',
    shadow: 'hover:shadow-green-500/10',
  },
  orange: {
    border: 'border-slate-800/80 hover:border-orange-500/50',
    iconBg: 'bg-orange-500/10 border-orange-500/30',
    icon: MapPin,
    iconColor: 'text-orange-400',
    price: 'text-orange-400',
    check: 'text-orange-400',
    btn: 'bg-orange-600 hover:bg-orange-500 text-white',
    shadow: 'hover:shadow-orange-500/15',
  },
};

export default function AdPlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-black text-white">{AD_PLANS.sectionTitle}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[680px] mx-auto">
        {AD_PLANS.plans.map((plan) => {
          const t = THEME[plan.theme];
          const Icon = t.icon;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 min-h-[460px] bg-slate-900/40 backdrop-blur-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.border} ${t.shadow}`}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${t.iconBg}`}
                >
                  <Icon size={18} className={t.iconColor} />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.subtitle}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                {plan.originalPrice && (
                  <p className="text-base text-slate-500 line-through decoration-red-400 mb-1.5">
                    {plan.originalPrice}
                  </p>
                )}

                <p className={`text-3xl font-black leading-none ${t.price}`}>{plan.price}</p>

                <p className="text-sm text-slate-500 mt-1.5">VAT 포함</p>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 mb-8">
                {plan.tags.map((tag) => (
                  <li key={tag} className="flex items-start gap-2.5">
                    <span className={`text-xs  ${t.check}`}>✓</span>
                    <span className="text-sm text-slate-300">{tag}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/reservation"
                className={`block text-center py-3 rounded-xl font-black text-sm transition-all ${t.btn}`}
              >
                신청하기
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 text-xs">
          <Info size={13} className="text-slate-500 flex-shrink-0" />
          {PRICING_NOTICE}
        </div>
      </div>

      {/* 도메인 안내 */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-xs text-slate-500">도메인은 고객님 명의로 등록되며 비용은 별도입니다.</p>
        <p className="text-xs text-slate-500">위플로우에서 등록 및 연결 세팅은 무료 지원해드립니다.</p>
        <p className="text-xs text-slate-500">✓ 도메인 연결 지원 &nbsp;&nbsp; ✓ 도메인 등록 대행 가능</p>
        <p className="text-xs text-slate-500">※ 도메인 비용 별도</p>
        <p className="text-xs text-slate-500">
          ※ 광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, 위플로우는 운영 및 세팅만 진행합니다.
        </p>
        <p className="text-xs text-slate-500">※ 유지보수는 텍스트, 이미지, 링크 등 경미한 수정 기준 입니다.</p>
        <p className="text-xs text-slate-500">※ 페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.</p>
      </div>
    </section>
  );
}
