import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: "Proyecto Aurora",
      description: "Una plataforma revolucionaria que integra inteligencia artificial para potenciar la productividad.",
      image: "/portfolio1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Vortex Digital",
      description: "Una experiencia interactiva que fusiona diseño y tecnología para crear soluciones únicas.",
      image: "/portfolio2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Nebula App",
      description: "Aplicación móvil de vanguardia para conectar comunidades a través de la innovación.",
      image: "/portfolio3.jpg",
      link: "#",
    },
  ];

  return (
    <section id="portfolio" className="py-20 px-8 sm:px-16 bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Nuestro Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        >
          Descubre algunos de nuestros proyectos destacados y soluciones innovadoras.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-[#0a0a0a] shadow-lg rounded-xl overflow-hidden"
          >
            <div className="relative h-56">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                quality={80}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <Link href={project.link} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                Ver Proyecto →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
