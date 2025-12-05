import founderImage from "@/assets/founder.jpg";
const AboutSection = () => {
  return <section className="bg-navy py-16 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-shrink-0">
            <img alt="Chris Oswell" className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-yellow" src="/lovable-uploads/8fc08bef-2fdf-489e-aa15-7eafd90e318b.jpg" />
          </div>
          <div className="text-navy-foreground space-y-4">
            <p className="text-lg leading-relaxed">
              passionné par le goût authentique et les produits artisanaux.
            </p>
            <p className="text-lg leading-relaxed">
              Mon objectif ? Faire découvrir des saveurs uniques et naturelles tout en soutenant nos producteurs locaux.
            </p>
            <p className="text-lg leading-relaxed">
              Avec chaque box, j'offre une expérience gourmande qui allie plaisir, qualité et authenticité. 🧀🥛🍓
            </p>
            <p className="font-semibold text-xl pt-2">
              Chris oswell
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;