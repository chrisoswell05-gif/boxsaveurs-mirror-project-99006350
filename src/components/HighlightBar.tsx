const HighlightBar = () => {
  return (
    <div className="border-t border-yellow/30 py-8 bg-navy overflow-hidden">
      <div className="relative flex">
        <div className="flex gap-4 animate-marquee whitespace-nowrap text-navy-foreground text-sm">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <span>PARFAIT POUR OFFRIR</span>
              <span className="text-yellow">•</span>
              <span>FRAICHEUR GARANTIE</span>
              <span className="text-yellow">•</span>
              <span>100% PRODUCTEURS LOCAUX</span>
              <span className="text-yellow">•</span>
              <span>LIVRAISON RAPIDE</span>
              <span className="text-yellow">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightBar;
