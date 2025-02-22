export default function HeroSection() {
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
          Discover Nepal's Spiritual Heritage
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Embark on a journey through ancient temples, monasteries, and sacred sites
          that have inspired seekers for centuries.
        </p>
      </div>
    </div>
  );
}
