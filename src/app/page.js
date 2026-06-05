import HeroSection from '@/features/home_page/sections/HeroSection';
import BenefitsSection from '@/features/home_page/sections/BenefitsSection';
import ProcessSection from '@/features/home_page/sections/ProcessSection';
import CasesSection from '@/features/home_page/sections/CasesSection';
import DiagnosisSection from '@/features/home_page/sections/DiagnosisSection';
import ReviewSection from '@/features/home_page/sections/ReviewSection';
import StickyForm from '@/components/ui/StickyForm';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="relative mx-auto max-w-[1560px] xl:grid xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-8">
        <div className="min-w-0">
          <BenefitsSection />
          <CasesSection />
          <ProcessSection />
          <DiagnosisSection />
          <ReviewSection />
        </div>

        <aside className="hidden xl:block pt-8 pr-6">
          <div className="sticky top-20 max-h-[calc(100vh-96px)] overflow-y-auto">
            <StickyForm />
          </div>
        </aside>
      </div>
    </>
  );
}
