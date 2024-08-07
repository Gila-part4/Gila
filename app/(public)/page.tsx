import LandingHeroSection from '@/app/(public)/_components/landing-hero-section';
import LandingMainSection from '@/app/(public)/_components/landing-main-section';
import LandingNavigation from '@/app/(public)/_components/landing-nav';

export default function Page() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <LandingNavigation />
      <LandingHeroSection />
      <LandingMainSection />
    </div>
  );
}
