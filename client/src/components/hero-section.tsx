import { useTranslation } from 'react-i18next';
import VirtualTour from './virtual-tour';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1544735716-87fa59a45b4e)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="relative z-10 text-center text-white px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col items-center gap-8">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.location.href = '/destinations'}
          >
            {t('hero.exploreButton')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="max-w-2xl mx-auto">
            <VirtualTour
              title={t('hero.virtualTour.pashupatinath')}
              tourUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
              thumbnailUrl="https://images.unsplash.com/photo-1544735716-87fa59a45b4e"
            />
          </div>
        </div>
      </div>
    </div>
  );
}