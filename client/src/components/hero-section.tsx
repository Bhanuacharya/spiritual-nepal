import { useTranslation } from 'react-i18next';

//Add a VirtualTour Component here.  This is missing from the provided edited code.  A placeholder is used for demonstration.  Replace with actual implementation.
const VirtualTour = ({title, tourUrl, thumbnailUrl}) => {
    return (
        <div>
            <h3>{title}</h3>
            <iframe width="560" height="315" src={tourUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <img src={thumbnailUrl} alt={title} />
        </div>
    )
}


export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1544735716-87fa59a45b4e)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          {t('hero.subtitle')}
        </p>
        <VirtualTour
          title="Pashupatinath Temple"
          tourUrl="https://www.youtube.com/embed/YOUR_VIRTUAL_TOUR_VIDEO_ID"
          thumbnailUrl="https://images.unsplash.com/photo-1544735716-87fa59a45b4e"
        />
      </div>
    </div>
  );
}