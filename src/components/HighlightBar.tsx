const HighlightBar = () => {
  return (
    <div className="border-t border-yellow/30 py-8 bg-navy">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center text-navy-foreground text-sm">
          <span>PARFAIT POUR OFFRIR</span>
          <span className="text-yellow">•</span>
          <span>FRAICHEUR GARANTIE</span>
        </div>
      </div>
    </div>
  );
};

export default HighlightBar;
