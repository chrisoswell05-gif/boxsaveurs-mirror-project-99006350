import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface VideoTestimonial {
  id: string;
  name: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
}

const VideoTestimonialsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  // Exemples de témoignages - à remplacer par vos vraies vidéos
  const testimonials: VideoTestimonial[] = [
    {
      id: "1",
      name: "Sophie Martin",
      location: "Montréal, QC",
      thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      quote: "Une découverte extraordinaire ! Les produits sont toujours frais et délicieux.",
    },
    {
      id: "2",
      name: "Marie Dubois",
      location: "Québec, QC",
      thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      quote: "J'adore découvrir de nouveaux producteurs locaux chaque mois.",
    },
    {
      id: "3",
      name: "Julie Tremblay",
      location: "Sherbrooke, QC",
      thumbnail: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=300&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      quote: "Ma famille attend chaque box avec impatience !",
    },
  ];

  return (
    <section className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">
          Ils Parlent de Nous
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Découvrez les témoignages authentiques de nos abonnés satisfaits
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div
                  className="relative aspect-video overflow-hidden"
                  onClick={() => setSelectedVideo(testimonial)}
                >
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-yellow flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-8 h-8 text-navy ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <p className="text-sm italic text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-yellow transition-colors p-2 z-10"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "{selectedVideo.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground text-lg">{selectedVideo.name}</p>
                  <p className="text-muted-foreground">{selectedVideo.location}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonialsSection;
