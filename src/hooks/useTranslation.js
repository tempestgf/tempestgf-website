'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { translations } from '../lib/i18n/translations';

// Crear un contexto para el idioma
export const LanguageContext = createContext();

// Proveedor de idioma
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Idioma predeterminado español
  
  // Cambiar el idioma
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };
  
  // Detectar el idioma guardado o el del navegador al cargar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Detectar idioma del navegador y establecer uno compatible si es posible
      const browserLang = navigator.language.split('-')[0]; // 'es-ES' -> 'es'
      
      if (translations[browserLang]) {
        setLanguage(browserLang);
        localStorage.setItem('preferredLanguage', browserLang);
      }
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar traducciones
export const useTranslation = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  
  const t = (key) => {
    // Función para acceder a las traducciones anidadas mediante notación de puntos
    // Ejemplo: t('header.subtitle')
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Devolver la clave si no se encuentra la traducción
      }
    }
    
    return result;
  };
  
  // Retornar las funciones y valores necesarios
  return {
    t, // función de traducción
    language, // idioma actual
    changeLanguage, // función para cambiar el idioma
    availableLanguages: Object.keys(translations) // idiomas disponibles
  };
};

export default useTranslation; 