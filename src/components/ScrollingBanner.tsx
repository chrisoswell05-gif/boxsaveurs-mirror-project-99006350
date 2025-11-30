const ScrollingBanner = () => {
  const bannerContent = (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="inline-flex items-center mx-8 text-sm font-semibold">
          PARFAIT POUR OFFRIR
          <span className="mx-4">•</span>
          FRAICHEUR GARANTIE
        </span>
      ))}
    </>
  );

  return (
    <div className="bg-yellow text-yellow-foreground py-3 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-scroll">
        {bannerContent}
        {bannerContent}
      </div>
    </div>
  );
};

export default ScrollingBanner;
