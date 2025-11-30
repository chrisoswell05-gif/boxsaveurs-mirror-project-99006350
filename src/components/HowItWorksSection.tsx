import step1 from "@/assets/step-1.png";
import step2 from "@/assets/step-2.png";
import step3 from "@/assets/step-3.png";

const HowItWorksSection = () => {
  const steps = [
    { icon: step1, text: "Je choisis l'offre qui me correspond" },
    { icon: step2, text: "Je reçois ma box à la maison" },
    { icon: step3, text: "Je savoure l'instant" },
  ];

  return (
    <section className="bg-cream py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <img src={step.icon} alt={`Étape ${index + 1}`} className="w-32 h-32" />
              </div>
              <p className="text-lg font-medium text-foreground">
                {index + 1} - {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
