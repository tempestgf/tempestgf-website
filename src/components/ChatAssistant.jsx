'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);
  const chatContainerRef = useRef(null);

  // Verificar si está en el lado cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Desplazar hacia abajo cuando se añadan nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Añadir mensaje del usuario al historial
    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentMessage = message;
    setMessage('');

    try {
      // Enviar mensaje a la API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await response.json();
      
      // Añadir respuesta del asistente al historial
      if (response.ok) {
        setChatHistory(prev => [...prev, { sender: 'assistant', text: data.response }]);
      } else {
        console.error('Error en la respuesta del servidor:', data.error);
        setChatHistory(prev => [...prev, { 
          sender: 'assistant', 
          text: data.response || 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.'
        }]);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setChatHistory(prev => [...prev, { 
        sender: 'assistant', 
        text: 'Lo siento, ha ocurrido un error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // No renderizar nada durante SSR
  if (!isMounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón para abrir/cerrar el chat */}
      <motion.button
        onClick={toggleChat}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        className="w-16 h-16 bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden group"
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,102,0,0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Efecto de brillo pulsante */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-white"
          animate={{ 
            scale: [0.85, 1, 0.85],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Efecto de brillo en hover */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30"
          initial={{ scale: 0 }}
          animate={buttonHover ? {
            scale: [0, 1.5],
            opacity: [0.7, 0],
          } : {}}
          transition={{ 
            duration: 1, 
            repeat: buttonHover ? Infinity : 0 
          }}
          style={{ border: '2px solid rgba(255,255,255,0.5)', borderRadius: '100%' }}
        />
        
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-20 right-0 w-[420px] sm:w-[500px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden backdrop-blur-sm"
          >
            {/* Elementos decorativos en las esquinas */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-button-bg)]/40 opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-button-bg)]/40 opacity-70"></div>
            
            {/* Cabecera */}
            <div className="bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white p-5 relative overflow-hidden">
              {/* Patrón decorativo */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <pattern id="chat-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#chat-grid)" />
                </svg>
              </div>
              
              <h3 className="font-bold flex items-center relative z-10 text-lg">
                <div className="w-10 h-10 mr-3 rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                Asistente Virtual
              </h3>
              <div className="flex items-center mt-2 relative z-10 ml-12">
                <motion.span 
                  className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-xs text-white/80">Activo</p>
              </div>
            </div>
            
            {/* Historial de chat mejorado */}
            <div 
              ref={chatContainerRef}
              className="p-5 h-[450px] overflow-y-auto bg-[var(--color-background)]/90 relative scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Estilos para ocultar scrollbar */}
              <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                * {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }
                *::-webkit-scrollbar {
                  display: none;
                  width: 0;
                  height: 0;
                }
              `}</style>
              
              {/* Patrón de fondo animado */}
              <motion.div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                animate={{
                  y: [-5, 5, -5],
                  x: [2, -2, 2]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="120%" height="120%" style={{ position: "absolute", top: "-10%", left: "-10%" }}>
                  <pattern id="chat-bg-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="40" height="40" fill="none" stroke="var(--color-button-bg)" strokeOpacity="0.2" />
                    <circle cx="20" cy="20" r="1" fill="var(--color-button-bg)" fillOpacity="0.2" />
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#chat-bg-grid)" />
                </svg>
              </motion.div>
              
              {/* Elementos decorativos flotantes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 2
                    }}
                    style={{
                      width: 4 + i * 2,
                      height: 4 + i * 2,
                      left: `${20 + (i * 30)}%`,
                      top: `${10 + (i * 30)}%`,
                      background: `var(--color-button-bg)`,
                      filter: 'blur(1px)'
                    }}
                  />
                ))}
              </div>
              
              {chatHistory.length === 0 ? (
                <div className="text-center my-12 relative z-10">
                  {/* Estado inicial mejorado */}
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-button-bg)]/30 to-[var(--color-button-bg)]/5 flex items-center justify-center text-[var(--color-button-bg)] mx-auto mb-6 relative"
                    animate={{
                      boxShadow: ['0 0 0px rgba(255,102,0,0)', '0 0 20px rgba(255,102,0,0.3)', '0 0 0px rgba(255,102,0,0)']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Círculos orbitantes */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`orbit-${i}`}
                        className="absolute inset-0 rounded-full border border-[var(--color-button-bg)]/30"
                        animate={{
                          rotate: 360,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                        }}
                      />
                    ))}
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-foreground)] via-[var(--color-foreground)] to-[var(--color-button-bg)]">
                      ¡Hola! Soy tu asistente virtual.
                    </h4>
                    
                    <p className="text-base text-[var(--color-primary)] mt-4 max-w-xs mx-auto">
                      Estoy aquí para ayudarte con cualquier duda sobre la página web. ¿En qué puedo asistirte hoy?
                    </p>
                    
                    {/* Sugerencias rápidas */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {["¿Qué servicios ofrecen?", "Contacto", "Proyectos recientes"].map((text, i) => (
                        <motion.button
                          key={i}
                          className="text-sm px-4 py-2 rounded-full border border-[var(--color-button-bg)]/30 text-[var(--color-button-bg)] hover:bg-[var(--color-button-bg)]/10 transition-colors"
                          whileHover={{ y: -2, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          onClick={() => {
                            setMessage(text);
                          }}
                        >
                          {text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-6 relative z-10">
                  {/* Mensajes animados y mejorados */}
                  {chatHistory.map((chat, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 500,
                        damping: 25
                      }}
                      className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Avatar para mensajes del asistente */}
                      {chat.sender === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-button-bg)]/30 to-[var(--color-button-bg)]/5 flex items-center justify-center text-[var(--color-button-bg)] mr-2 self-end">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                          chat.sender === 'user' 
                            ? 'bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white rounded-tr-none backdrop-blur-sm' 
                            : 'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] rounded-tl-none'
                        }`}
                      >
                        <div className="relative">
                          <div className="text-[15px] leading-relaxed">{chat.text}</div>
                          
                          {/* Efectos decorativos */}
                          {chat.sender === 'user' ? (
                            <motion.div 
                              className="absolute top-0 right-0 w-2 h-2 -translate-x-0 -translate-y-3 border-t-2 border-r-2 border-white/20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          ) : (
                            <motion.div 
                              className="absolute top-0 left-0 w-2 h-2 -translate-x-3 -translate-y-3 border-t-2 border-l-2 border-[var(--color-button-bg)]/40"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          )}
                          
                          {/* Timestamp */}
                          <div className={`text-[10px] mt-2 ${chat.sender === 'user' ? 'text-white/70 text-right' : 'text-[var(--color-primary)]/70'}`}>
                            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Animación de carga mejorada */}
                  {isLoading && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-button-bg)]/30 to-[var(--color-button-bg)]/5 flex items-center justify-center text-[var(--color-button-bg)] mr-2 self-end">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      
                      <div className="bg-[var(--color-background)] border border-[var(--color-border)] p-4 rounded-lg rounded-tl-none relative max-w-[80%]">
                        <div className="flex space-x-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div 
                              key={i}
                              className="w-2 h-2 bg-[var(--color-button-bg)] rounded-full"
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.3, 1, 0.3]
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Elementos decorativos para animación de carga */}
                        <motion.div 
                          className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[var(--color-button-bg)]/10 rounded-full" 
                          animate={{ 
                            opacity: [0.3, 0.6, 0.3],
                            width: ["50%", "60%", "50%"] 
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ bottom: "-4px" }}
                        />
                        
                        <motion.div 
                          className="absolute top-0 left-0 w-2 h-2 -translate-x-3 -translate-y-3 border-t-2 border-l-2 border-[var(--color-button-bg)]/40"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            
            {/* Formulario de entrada mejorado */}
            <form onSubmit={handleSendMessage} className="border-t border-[var(--color-border)] p-5 relative">
              {/* Línea decorativa superior */}
              <motion.div 
                className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[var(--color-button-bg)]/20 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full pl-5 pr-14 py-4 bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)] focus:ring-1 focus:ring-[var(--color-button-bg)] transition-colors peer text-base"
                />
                
                {/* Efecto de focus mejorado */}
                {activeField === 'message' && (
                  <>
                    <motion.div
                      layoutId="active-input"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--color-button-bg)]/30 via-[var(--color-button-bg)] to-[var(--color-button-bg)]/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-[var(--color-button-bg)]/20 blur-[2px]" 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </>
                )}
                
                {/* Botón de envío mejorado */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 10px rgba(255,102,0,0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Efecto de brillo al pasar el mouse */}
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0, left: '-100%' }}
                    whileHover={{
                      left: ['0%', '100%'],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ duration: 1 }}
                  />
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Nota informativa */}
              <div className="mt-2 text-center">
                <p className="text-[11px] text-[var(--color-primary)]/50 italic">
                  Powered by Google Gemini 2.5 Flash
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant; 