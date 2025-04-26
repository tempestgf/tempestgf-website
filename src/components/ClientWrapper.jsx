'use client';

import dynamic from 'next/dynamic';

// Importación dinámica de componentes (solo cliente)
const ChatAssistant = dynamic(() => import('./ChatAssistant'), {
  ssr: false,
});

const AIAssistantInfo = dynamic(() => import('./AIAssistantInfo'), {
  ssr: false,
});

export default function ClientWrapper() {
  return (
    <>
      <ChatAssistant />
      <AIAssistantInfo />
    </>
  );
} 