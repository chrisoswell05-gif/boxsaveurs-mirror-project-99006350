const HighlightBar = () => {
  return (
    <div className="border-t border-yellow/30 py-8 bg-navy overflow-hidden">
      <div className="relative">
        <div className="flex gap-4 animate-marquee whitespace-nowrap text-navy-foreground text-sm">
          <span>PARFAIT POUR OFFRIR</span>
          <span className="text-yellow">•</span>
          <span>FRAICHEUR GARANTIE</span>
          <span className="text-yellow">•</span>
          <span>PARFAIT POUR OFFRIR</span>
          <span className="text-yellow">•</span>
          <span>FRAICHEUR GARANTIE</span>
          <span className="text-yellow">•</span>
          <span>PARFAIT POUR OFFRIR</span>
          <span className="text-yellow">•</span>
          <span>FRAICHEUR GARANTIE</span>
          <span className="text-yellow">•</span>
          <span>PARFAIT POUR OFFRIR</span>
          <span className="text-yellow">•</span>
          <span>FRAICHEUR GARANTIE</span>
        </div>
      </div>
    </div>
  );
};

export default HighlightBar;
