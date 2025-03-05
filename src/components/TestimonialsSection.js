import Image from "next/image";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "TempestGF revolucionó nuestra forma de trabajar, llevando nuestros proyectos a nuevas alturas de innovación.",
      name: "Carlos Méndez",
      role: "CEO de Innovatech",
      avatar: "/avatar1.jpg",
    },
    {
      quote: "El equipo de TempestGF combina profesionalismo y creatividad, ofreciendo soluciones que superan todas las expectativas.",
      name: "María López",
      role: "Directora de Proyectos en Creativa",
      avatar: "/avatar2.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-8 sm:px-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-[#121212] dark:to-[#1e1e1e]">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          Lo Que Dicen Nuestros Clientes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        >
          Testimonios reales de quienes han experimentado el poder transformador de nuestras soluciones.
        </motion.p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} whileHover={{ scale: 1.03 }} className="bg-white dark:bg-[#0a0a0a] p-8 rounded-xl shadow-lg flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
