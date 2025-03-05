import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      title: "Rendimiento Inigualable",
      description: "Optimizado para ofrecer velocidad y eficiencia en cada proyecto.",
      icon: "⚡",
    },
    {
      title: "Seguridad Robusta",
      description: "Protección avanzada para mantener tus datos y proyectos seguros.",
      icon: "🔒",
    },
    {
      title: "Interfaz Intuitiva",
      description: "Diseñada para ofrecer la mejor experiencia de usuario.",
      icon: "🎨",
    },
  ];

  return (
    <section id="features" className="py-20 px-8 sm:px-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#121212] dark:to-[#1e1e1e]">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Características Destacadas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        >
          Potencia tu desarrollo con herramientas y funcionalidades de última generación.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white dark:bg-[#0a0a0a] p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
