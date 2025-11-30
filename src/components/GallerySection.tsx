import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroBox from "@/assets/hero-box.jpg";
import conceptImage from "@/assets/concept-image.jpg";
import founderImage from "@/assets/founder.jpg";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: heroBox,
      alt: "Box Saveurs de Ferme complète avec produits artisanaux",
      title: "Box Découverte",
    },
    {
      src: conceptImage,
      alt: "Produits laitiers artisanaux et fruits frais",
      title: "Produits Bio",
    },
    {
      src: heroBox,
      alt: "Assortiment de produits fermiers",
      title: "Assortiment Fermier",
    },
    {
      src: conceptImage,
      alt: "Yaourts et fromages artisanaux",
      title: "Produits Laitiers",
    },
    {
      src: heroBox,
      alt: "Box cadeau avec produits du terroir",
      title: "Coffret Cadeau",
    },
    {
      src: conceptImage,
      alt: "Sélection de produits québécois",
      title: "Sélection Locale",
    },
  ];

  return (
    <section className="bg-cream py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">
          Découvrez Nos Produits
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Chaque box est soigneusement préparée avec des produits artisanaux authentiques de producteurs locaux
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-yellow transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Image agrandie"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
