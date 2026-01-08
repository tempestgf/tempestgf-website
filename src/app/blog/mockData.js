export const mockPosts = [
  {
    id: 1,
    title: "El Futuro de la IA Generativa en el Desarrollo Web",
    slug: "futuro-ia-generativa-desarrollo-web",
    content: `
      <p class="lead text-xl md:text-2xl leading-relaxed text-zinc-300 font-light mb-12">La inteligencia artificial generativa ha dejado de ser una promesa futurista para convertirse en el motor de una transformación radical en la industria del software. No estamos hablando solo de herramientas más rápidas, sino de una redefinición completa del rol del desarrollador.</p>

      <h2>La Revolución Silenciosa</h2>
      <p>Hasta hace poco, el flujo de trabajo de un desarrollador frontend consistía en traducir diseños de Figma a CSS, escribir lógica de estado en React y conectar endpoints. Hoy, herramientas como v0.dev, GitHub Copilot y modelos como GPT-4 o Claude 3 están automatizando la "fontanería" del código, permitiéndonos centrarnos en la arquitectura y la experiencia de usuario.</p>
      
      <p>La pregunta ya no es <em>"¿Cómo centro este div?"</em>, sino <em>"¿Cómo diseño un sistema que escale y se adapte a las necesidades del usuario en tiempo real?"</em>.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" alt="Abstract visualization of neural networks" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Visualización abstracta de redes neuronales interactuando con estructuras de código.</figcaption>
      </figure>

      <h2>Más Allá del Autocompletado: Desarrollo Asistido por Contexto</h2>
      <p>Los IDEs modernos están evolucionando de ser editores de texto a ser compañeros de programación conscientes del contexto. Imagina un editor que no solo sugiere la siguiente línea, sino que entiende la arquitectura completa de tu proyecto mono-repo.</p>

      <h3>Caso de Estudio: Refactorización Semántica</h3>
      <p>Supongamos que necesitas migrar un componente de clase legacy a un funcional con hooks. Antes, esto era una tarea manual y propensa a errores. Ahora, es un comando semántico.</p>

      <pre><code class="language-javascript">// Input: Código Legacy
class UserProfile extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.id);
  }
  render() {
    return &lt;div&gt;{this.props.user.name}&lt;/div&gt;;
  }
}

// Output: Refactorización Generativa
const UserProfile = ({ id }) =&gt; {
  const { data: user } = useQuery(['user', id], () =&gt; fetchUser(id));
  
  if (!user) return &lt;Skeleton /&gt;;
  return &lt;div className="text-xl font-bold"&gt;{user.name}&lt;/div&gt;;
};</code></pre>
      
      <p>Observa cómo la IA no solo tradujo la sintaxis, sino que infirió el uso de una librería moderna de data-fetching como React Query y añadió un estado de carga que no existía en el original. Esto es <strong>inteligencia contextual</strong>.</p>

      <h2>Generative UI: Interfaces que se Dibujan a sí Mismas</h2>
      <p>Quizás el avance más emocionante es la "Generative UI". En lugar de diseñar flujos estáticos para cada posible interacción, podemos diseñar sistemas de diseño que la IA utiliza para generar interfaces al vuelo según la intención del usuario.</p>
      
      <blockquote>
        "La interfaz de usuario definitiva es aquella que no existe hasta que la necesitas, y desaparece cuando terminas."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Aza Raskin</footer>
      </blockquote>

      <p>Vercel AI SDK ya permite enviar componentes de React como respuesta a un prompt de texto. Esto significa que un chat de soporte no te dice "haz clic en configuración"; te <em>muestra</em> el panel de configuración renderizado dentro del chat.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" alt="Futuristic interface" />
      </figure>

      <h2>El Nuevo Stack del Desarrollador Centauro</h2>
      <p>Para sobrevivir y prosperar en esta nueva era, el desarrollador debe convertirse en un "Centauro": mitad humano (creatividad, empatía, estrategia), mitad máquina (velocidad, sintaxis, memoria).</p>

      <ul>
        <li><strong>Prompt Engineering Avanzado:</strong> Saber pedir es tan importante como saber codificar.</li>
        <li><strong>Auditoría de IA:</strong> Capacidad para leer código generado y detectar alucinaciones o vulnerabilidades.</li>
        <li><strong>Arquitectura de Sistemas:</strong> Entender cómo conectar modelos LLM con bases de datos vectoriales (RAG).</li>
      </ul>

      <h2>Ética y Responsabilidad</h2>
      <p>Con gran poder viene gran responsabilidad. A medida que delegamos más decisiones técnicas a algoritmos, la transparencia y la auditabilidad se vuelven críticas. ¿Cómo aseguramos que el código generado no introduzca vulnerabilidades de seguridad sutiles o sesgos algorítmicos?</p>

      <p>La respuesta no es frenar la innovación, sino elevar nuestros estándares de revisión. El code review se vuelve más importante que nunca.</p>

      <div class="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8 my-12">
        <strong class="block text-xl text-cyan-400 mb-2">Conclusión</strong>
        <p class="text-zinc-300">El futuro no pertenece a la IA, sino a los desarrolladores que aprendan a bailar con ella. La barrera de entrada técnica ha bajado, pero la barrera de entrada a la calidad y la originalidad ha subido.</p>
      </div>
    `,
    excerpt: "La IA generativa no es solo una herramienta, es un cambio de paradigma. Exploramos cómo los modelos LLM están transformando la arquitectura de software.",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    category: "Artificial Intelligence",
    author: "G3NJ1",
    author_role: "Lead Architect",
    created_at: new Date().toISOString(),
    reading_time: 8,
    tags: ["AI", "Generative UI", "Future Tech", "React"]
  },
  {
    id: 2,
    title: "Cyberseguridad en la Era Post-Cuántica",
    slug: "cyberseguridad-era-post-cuantica",
    content: `
      <p class="lead text-xl md:text-2xl leading-relaxed text-zinc-300 font-light mb-12">Cuando las computadoras cuánticas sean lo suficientemente potentes para romper RSA, internet tal como lo conocemos dejará de ser seguro. La carrera por la criptografía post-cuántica (PQC) ya ha comenzado, y el tiempo corre en nuestra contra.</p>

      <h2>El Apocalipsis Criptográfico</h2>
      <p>La mayor parte de la seguridad digital actual se basa en la dificultad de factorizar números primos grandes. El algoritmo RSA, que protege desde tu correo electrónico hasta las transacciones bancarias, asume que ninguna computadora clásica puede factorizar un número de 2048 bits en un tiempo razonable.</p>
      
      <p>Una computadora cuántica con suficientes qubits estables podría resolver esto en <strong>minutos</strong> usando el algoritmo de Shor. No es ciencia ficción: IBM, Google y empresas chinas están en una carrera para alcanzar la "ventaja cuántica criptográfica".</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop" alt="Quantum computer processor" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Procesador cuántico de última generación con qubits superconductores.</figcaption>
      </figure>

      <h2>La Amenaza "Harvest Now, Decrypt Later"</h2>
      <p>Aunque las computadoras cuánticas capaces aún están a años de distancia, los atacantes sofisticados (estados-nación, principalmente) ya están ejecutando una estrategia devastadora: <strong>capturar datos cifrados hoy para descifrarlos mañana</strong>.</p>
      
      <p>Esto significa que la información sensible que transmites hoy —secretos comerciales, comunicaciones gubernamentales, historiales médicos— podría ser legible en 5-10 años. Para datos que deben permanecer confidenciales por décadas, la amenaza es <em>inmediata</em>.</p>

      <blockquote>
        "Cada byte cifrado con RSA que cruza internet hoy es un regalo envuelto para los adversarios del mañana."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Michele Mosca, Institute for Quantum Computing</footer>
      </blockquote>

      <h2>Criptografía Post-Cuántica: Los Nuevos Algoritmos</h2>
      <p>El NIST (National Institute of Standards and Technology) finalizó en 2024 la estandarización de los primeros algoritmos resistentes a ataques cuánticos. Estos se basan en problemas matemáticos que ni siquiera una computadora cuántica puede resolver eficientemente:</p>

      <h3>1. CRYSTALS-Kyber (Encapsulación de Claves)</h3>
      <p>Basado en el problema de "Learning With Errors" (LWE) sobre retículos algebraicos. Es el estándar para el intercambio de claves y ya está siendo integrado en TLS 1.3.</p>

      <pre><code class="language-python"># Ejemplo conceptual de intercambio de claves con Kyber
from kyber import Kyber512

# Alice genera un par de claves
public_key, secret_key = Kyber512.keygen()

# Bob encapsula una clave compartida usando la clave pública de Alice
ciphertext, shared_secret_bob = Kyber512.encaps(public_key)

# Alice desencapsula para obtener la misma clave compartida
shared_secret_alice = Kyber512.decaps(ciphertext, secret_key)

assert shared_secret_alice == shared_secret_bob  # ✓ Ambos tienen la misma clave</code></pre>

      <h3>2. CRYSTALS-Dilithium (Firmas Digitales)</h3>
      <p>También basado en retículos, Dilithium reemplaza a RSA y ECDSA para firmar documentos, certificados SSL y autenticación. Sus firmas son más grandes (~2.4 KB vs ~256 bytes de ECDSA), pero el trade-off es la seguridad a largo plazo.</p>

      <h3>3. SPHINCS+ (Firmas basadas en Hash)</h3>
      <p>Un enfoque más conservador que no depende de la dificultad de problemas de retículos, sino de la seguridad de funciones hash. Más lento y con firmas más grandes, pero con una base de seguridad más probada.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" alt="Data center security" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Los centros de datos ya están comenzando la migración a criptografía post-cuántica.</figcaption>
      </figure>

      <h2>El Plan de Migración: Agilidad Criptográfica</h2>
      <p>La transición no será un interruptor que se enciende de un día para otro. Requiere lo que los expertos llaman <strong>agilidad criptográfica</strong>: la capacidad de intercambiar algoritmos sin rediseñar sistemas completos.</p>

      <ul>
        <li><strong>Inventario Criptográfico:</strong> Auditar cada sistema para saber qué algoritmos usa y dónde.</li>
        <li><strong>Híbridos Transicionales:</strong> Usar RSA + Kyber simultáneamente durante la transición.</li>
        <li><strong>Pruebas de Rendimiento:</strong> Los nuevos algoritmos son más lentos; hay que medir el impacto en latencia.</li>
        <li><strong>Actualización de Hardware:</strong> HSMs (Hardware Security Modules) necesitan soporte nativo para PQC.</li>
      </ul>

      <h2>Signal y el Protocolo X3DH Post-Cuántico</h2>
      <p>La app de mensajería Signal ya ha implementado una versión híbrida de su protocolo de cifrado, combinando X25519 (curva elíptica) con Kyber-1024. Esto significa que incluso si Kyber tuviera una vulnerabilidad desconocida, la seguridad de X25519 permanece como fallback.</p>

      <pre><code class="language-javascript">// Pseudocódigo del handshake híbrido de Signal
const classicSharedSecret = x25519(myPrivateKey, theirPublicKey);
const pqSharedSecret = kyberDecaps(kyberCiphertext, myKyberSecretKey);

// La clave final es una derivación de ambos secretos
const finalKey = hkdf(
  classicSharedSecret + pqSharedSecret,
  "Signal_PQ_Handshake"
);</code></pre>

      <h2>¿Cuándo Llegará el "Q-Day"?</h2>
      <p>Las estimaciones varían enormemente. Los más optimistas dicen que una computadora cuántica capaz de romper RSA-2048 llegará en 2030. Los más conservadores hablan de 2040 o más. Pero la incertidumbre es precisamente el problema: no podemos esperar a tener certeza.</p>

      <div class="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-8 my-12">
        <strong class="block text-xl text-red-400 mb-2">Acción Urgente</strong>
        <p class="text-zinc-300">Si tu organización maneja datos que deben permanecer confidenciales por más de 10 años, el momento de comenzar la migración a PQC es <strong>ahora</strong>. No mañana. No el próximo trimestre. Ahora.</p>
      </div>

      <h2>Recursos para Desarrolladores</h2>
      <p>Si quieres comenzar a experimentar con criptografía post-cuántica, estas son las librerías más maduras:</p>

      <ul>
        <li><strong>liboqs (Open Quantum Safe):</strong> Implementación de referencia en C de todos los algoritmos NIST.</li>
        <li><strong>PQCrypto-SIDH:</strong> Implementación del algoritmo SIKE (aunque fue roto en 2022, sirve como estudio).</li>
        <li><strong>BoringSSL / OpenSSL 3.2+:</strong> Ya incluyen soporte experimental para Kyber.</li>
      </ul>

      <p>La era post-cuántica no es una cuestión de "si", sino de "cuándo". Los que se preparen hoy serán los que sobrevivan mañana.</p>
    `,
    excerpt: "Preparando nuestros sistemas para el momento en que la computación cuántica rompa la encriptación actual. Una guía técnica sobre criptografía post-cuántica.",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    category: "Security",
    author: "Tempest",
    author_role: "Security Analyst",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    reading_time: 12,
    tags: ["Quantum", "Security", "Cryptography", "PQC"]
  },
  {
    id: 3,
    title: "Diseño UI/UX Inmersivo con Three.js y WebGL",
    slug: "diseno-ui-ux-inmersivo-three-js",
    content: `
      <p class="lead text-xl md:text-2xl leading-relaxed text-zinc-300 font-light mb-12">La web plana está muriendo. Los usuarios de 2026 esperan experiencias que respondan, que respiren, que se sientan <em>vivas</em>. Three.js nos permite crear interfaces que trascienden las limitaciones del DOM tradicional y se adentran en el territorio del arte interactivo.</p>

      <h2>El Renacimiento del WebGL</h2>
      <p>Durante años, WebGL fue territorio exclusivo de demos técnicas y juegos experimentales. Pero la combinación de hardware más potente, APIs más maduras y el auge del "creative coding" ha democratizado el 3D en la web. Hoy, desde portfolios personales hasta landing pages de startups de IA, el 3D es la nueva frontera del diseño digital.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop" alt="Abstract 3D visualization" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Visualización 3D abstracta renderizada en tiempo real con Three.js.</figcaption>
      </figure>

      <h2>Three.js: El Puente entre Arte y Código</h2>
      <p>Three.js abstrae la complejidad de WebGL en una API de alto nivel que se siente casi declarativa. No necesitas entender matrices de transformación o shaders GLSL para crear algo impresionante (aunque ayuda).</p>

      <h3>Anatomía de una Escena Básica</h3>
      <p>Toda experiencia 3D en Three.js se compone de tres elementos fundamentales: una escena (el contenedor), una cámara (el punto de vista) y un renderer (el motor de dibujo).</p>

      <pre><code class="language-javascript">import * as THREE from 'three';

// 1. Escena: El universo donde viven tus objetos
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// 2. Cámara: Los ojos del usuario
const camera = new THREE.PerspectiveCamera(
  75,                                    // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                   // Near clipping plane
  1000                                   // Far clipping plane
);
camera.position.z = 5;

// 3. Renderer: El pintor que dibuja cada frame
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: true  // Fondo transparente para integrarse con el DOM
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);</code></pre>

      <h2>Geometrías Procedurales y Arte Generativo</h2>
      <p>Lo verdaderamente emocionante de Three.js no es renderizar cubos estáticos, sino crear formas que responden a datos, tiempo y comportamiento del usuario. Esto es <strong>arte generativo</strong>.</p>

      <h3>Ejemplo: Esfera Reactiva al Audio</h3>
      <p>Imagina una esfera cuya superficie se deforma en tiempo real según las frecuencias del audio que está reproduciendo el usuario:</p>

      <pre><code class="language-javascript">// Crear geometría con suficientes vértices para deformar
const geometry = new THREE.IcosahedronGeometry(2, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  wireframe: true,
  emissive: 0x001111
});
const sphere = new THREE.Mesh(geometry, material);

// En el loop de animación, deformar según datos de audio
function animate() {
  requestAnimationFrame(animate);
  
  const positions = geometry.attributes.position;
  const frequencies = audioAnalyser.getFrequencyData();
  
  for (let i = 0; i < positions.count; i++) {
    const vertex = new THREE.Vector3().fromBufferAttribute(positions, i);
    const freqIndex = Math.floor((i / positions.count) * frequencies.length);
    const amplitude = frequencies[freqIndex] / 256;
    
    // Normalizar y escalar
    vertex.normalize().multiplyScalar(2 + amplitude * 0.5);
    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  
  positions.needsUpdate = true;
  renderer.render(scene, camera);
}</code></pre>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" alt="Generative art sphere" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Visualización de audio reactivo con geometría deformada proceduralmente.</figcaption>
      </figure>

      <h2>Shaders: El Lenguaje del GPU</h2>
      <p>Para efectos verdaderamente únicos, necesitas hablar directamente con la GPU usando shaders GLSL. Un shader es un pequeño programa que se ejecuta en paralelo para cada vértice o cada píxel de tu escena.</p>

      <h3>Shader de Ruido Orgánico</h3>
      <p>Este fragment shader crea un patrón de ruido que se anima suavemente, perfecto para fondos ambientales:</p>

      <pre><code class="language-glsl">// Fragment Shader
uniform float uTime;
uniform vec2 uResolution;

// Función de ruido simplex (simplificada)
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  
  // Crear capas de ruido a diferentes escalas
  float n = 0.0;
  n += 0.5 * noise(uv * 4.0 + uTime * 0.1);
  n += 0.25 * noise(uv * 8.0 - uTime * 0.15);
  n += 0.125 * noise(uv * 16.0 + uTime * 0.2);
  
  // Mapear a colores cyan/magenta
  vec3 color = mix(
    vec3(0.0, 1.0, 1.0),  // Cyan
    vec3(1.0, 0.0, 1.0),  // Magenta
    n
  );
  
  gl_FragColor = vec4(color * 0.3, 1.0);
}</code></pre>

      <h2>React Three Fiber: El Matrimonio Perfecto</h2>
      <p>Para proyectos modernos con React, <strong>React Three Fiber</strong> (R3F) es el estándar. Permite declarar escenas 3D como componentes JSX, integrándose perfectamente con el ecosistema React.</p>

      <pre><code class="language-jsx">import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function AnimatedBox() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    &lt;mesh ref={meshRef}&gt;
      &lt;boxGeometry args={[1, 1, 1]} /&gt;
      &lt;meshStandardMaterial color="cyan" /&gt;
    &lt;/mesh&gt;
  );
}

export default function Scene() {
  return (
    &lt;Canvas camera={{ position: [0, 0, 5] }}&gt;
      &lt;ambientLight intensity={0.5} /&gt;
      &lt;pointLight position={[10, 10, 10]} /&gt;
      &lt;AnimatedBox /&gt;
    &lt;/Canvas&gt;
  );
}</code></pre>

      <h2>Optimización: El Arte de los 60 FPS</h2>
      <p>Una experiencia 3D que tartamudea es peor que no tener 3D. Estas son las técnicas esenciales para mantener el rendimiento:</p>

      <ul>
        <li><strong>Level of Detail (LOD):</strong> Reducir la complejidad de objetos lejanos.</li>
        <li><strong>Instancing:</strong> Renderizar miles de objetos idénticos en una sola draw call.</li>
        <li><strong>Frustum Culling:</strong> No renderizar objetos fuera del campo de visión.</li>
        <li><strong>Texture Atlases:</strong> Combinar múltiples texturas en una para reducir cambios de estado.</li>
        <li><strong>RequestAnimationFrame throttling:</strong> Limitar a 30 FPS en dispositivos móviles.</li>
      </ul>

      <blockquote>
        "El mejor efecto visual es el que el usuario no nota conscientemente, pero que hace que la experiencia se sienta mágica."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Ricardo Cabello (Mr.doob), creador de Three.js</footer>
      </blockquote>

      <h2>Recursos Esenciales</h2>
      <p>Para profundizar en el mundo del 3D web, estos recursos son invaluables:</p>

      <ul>
        <li><strong>Three.js Journey:</strong> El curso definitivo por Bruno Simon (vale cada euro).</li>
        <li><strong>Shadertoy:</strong> Comunidad de shaders con miles de ejemplos interactivos.</li>
        <li><strong>pmndrs:</strong> El colectivo detrás de R3F, Drei, y otras herramientas esenciales.</li>
        <li><strong>The Book of Shaders:</strong> Introducción visual a la programación de shaders.</li>
      </ul>

      <div class="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-8 my-12">
        <strong class="block text-xl text-purple-400 mb-2">El Futuro es Inmersivo</strong>
        <p class="text-zinc-300">Con WebGPU en el horizonte y el hardware cada vez más potente, las experiencias 3D en la web solo van a mejorar. Aprende Three.js hoy y estarás preparado para el mañana.</p>
      </div>
    `,
    excerpt: "Cómo crear experiencias web que se sienten vivas utilizando Three.js, shaders GLSL y React Three Fiber. Una guía completa de diseño 3D para la web.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    category: "Design",
    author: "G3NJ1",
    author_role: "Creative Developer",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    reading_time: 14,
    tags: ["Three.js", "WebGL", "React", "Creative Coding"]
  },
  {
    id: 4,
    title: "Server Components y el Renacimiento del SSR",
    slug: "server-components-renacimiento-ssr",
    content: `
      <p class="lead text-xl md:text-2xl leading-relaxed text-zinc-300 font-light mb-12">Durante una década, el frontend se movió inexorablemente hacia el cliente. SPAs, client-side rendering, hidratación masiva. Ahora, React Server Components y Next.js App Router están invirtiendo la tendencia. El servidor ha vuelto, y esta vez es personal.</p>

      <h2>La Era del Client-Side Rendering (y sus Problemas)</h2>
      <p>Alrededor de 2015, la industria adoptó masivamente las Single Page Applications. La promesa era clara: experiencias de usuario fluidas, sin recargas de página, con toda la lógica en el navegador. Frameworks como React, Angular y Vue dominaron.</p>

      <p>Pero este modelo tenía costos ocultos que se hicieron evidentes con el tiempo:</p>

      <ul>
        <li><strong>Bundles JavaScript gigantes:</strong> Aplicaciones que enviaban 2-5 MB de JS al cliente.</li>
        <li><strong>Time to Interactive (TTI) degradado:</strong> El usuario veía una página en blanco mientras se descargaba, parseaba y ejecutaba el JS.</li>
        <li><strong>SEO problemático:</strong> Los crawlers no siempre ejecutaban JavaScript correctamente.</li>
        <li><strong>Waterfalls de red:</strong> El JS se descargaba, luego hacía fetch de datos, luego renderizaba. Tres viajes de red secuenciales.</li>
      </ul>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" alt="Server infrastructure" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">La infraestructura de servidor moderna permite SSR a escala global.</figcaption>
      </figure>

      <h2>React Server Components: Un Nuevo Paradigma</h2>
      <p>Los React Server Components (RSC) no son simplemente "renderizado en el servidor". Son un modelo mental completamente nuevo donde los componentes se clasifican en dos categorías:</p>

      <h3>Server Components (por defecto)</h3>
      <p>Se ejecutan <em>solo</em> en el servidor. Nunca envían JavaScript al cliente. Pueden acceder directamente a bases de datos, sistemas de archivos y APIs internas sin exponer credenciales.</p>

      <pre><code class="language-jsx">// app/users/page.js — Server Component (por defecto)
import { db } from '@/lib/database';

export default async function UsersPage() {
  // Esto se ejecuta en el servidor. Sin "use client", sin fetch().
  const users = await db.query('SELECT * FROM users LIMIT 100');
  
  return (
    &lt;main&gt;
      &lt;h1&gt;Users&lt;/h1&gt;
      &lt;ul&gt;
        {users.map(user =&gt; (
          &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/main&gt;
  );
}</code></pre>

      <h3>Client Components (opt-in)</h3>
      <p>Se marcan explícitamente con <code>"use client"</code>. Se hidratan en el navegador y pueden usar hooks como <code>useState</code>, <code>useEffect</code>, y event handlers.</p>

      <pre><code class="language-jsx">// components/LikeButton.jsx — Client Component
"use client";

import { useState } from 'react';

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  
  return (
    &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;
      ❤️ {likes}
    &lt;/button&gt;
  );
}</code></pre>

      <h2>La Composición: Server + Client</h2>
      <p>El poder real de RSC emerge cuando compones ambos tipos. Un Server Component puede renderizar un Client Component, pasándole datos ya fetched como props:</p>

      <pre><code class="language-jsx">// app/posts/[id]/page.js — Server Component
import { db } from '@/lib/database';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';

export default async function PostPage({ params }) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  
  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;p&gt;{post.content}&lt;/p&gt;
      
      {/* Client Component con datos del servidor */}
      &lt;LikeButton initialLikes={post.likes} /&gt;
      
      {/* Otro Client Component */}
      &lt;CommentSection postId={post.id} /&gt;
    &lt;/article&gt;
  );
}</code></pre>

      <blockquote>
        "Los Server Components no reemplazan a los Client Components. Los complementan. Es como tener dos herramientas especializadas en lugar de una herramienta genérica."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Dan Abramov, React Core Team</footer>
      </blockquote>

      <h2>Streaming y Suspense: La Magia del Renderizado Progresivo</h2>
      <p>Con RSC, el servidor puede <em>transmitir</em> el HTML progresivamente. No tienes que esperar a que toda la página esté lista; las partes que dependen de datos lentos pueden llegar después.</p>

      <pre><code class="language-jsx">// app/dashboard/page.js
import { Suspense } from 'react';
import UserStats from '@/components/UserStats';
import RecentActivity from '@/components/RecentActivity';
import Recommendations from '@/components/Recommendations';

export default function Dashboard() {
  return (
    &lt;div className="grid grid-cols-3 gap-6"&gt;
      {/* Se renderiza inmediatamente */}
      &lt;h1&gt;Dashboard&lt;/h1&gt;
      
      {/* Cada sección se carga independientemente */}
      &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;
        &lt;UserStats /&gt;  {/* Consulta rápida: ~50ms */}
      &lt;/Suspense&gt;
      
      &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;
        &lt;RecentActivity /&gt;  {/* Consulta media: ~200ms */}
      &lt;/Suspense&gt;
      
      &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;
        &lt;Recommendations /&gt;  {/* ML inference: ~500ms */}
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <p>El usuario ve el header y los skeletons instantáneamente. Luego, cada sección "aparece" cuando sus datos están listos, sin bloquear las demás.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Data streaming visualization" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">El streaming HTTP permite enviar HTML progresivamente al cliente.</figcaption>
      </figure>

      <h2>Server Actions: Mutaciones sin API Routes</h2>
      <p>Quizás la feature más revolucionaria de Next.js 14+ son los Server Actions. Permiten definir funciones que se ejecutan en el servidor y se invocan directamente desde formularios o event handlers, sin crear API routes manualmente.</p>

      <pre><code class="language-jsx">// app/contact/page.js
async function submitForm(formData) {
  "use server";  // Esta función se ejecuta en el servidor
  
  const email = formData.get('email');
  const message = formData.get('message');
  
  await db.contact.create({
    data: { email, message }
  });
  
  // Revalidar la caché si es necesario
  revalidatePath('/contact');
}

export default function ContactPage() {
  return (
    &lt;form action={submitForm}&gt;
      &lt;input name="email" type="email" required /&gt;
      &lt;textarea name="message" required /&gt;
      &lt;button type="submit"&gt;Enviar&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

      <p>Esto funciona <em>sin JavaScript en el cliente</em>. El formulario hace un POST tradicional. Pero si JS está disponible, Next.js lo intercepta y hace la mutación con fetch, proporcionando una experiencia más fluida.</p>

      <h2>Caching y Revalidación</h2>
      <p>Next.js App Router introduce un sistema de caché de múltiples capas que puede ser confuso al principio, pero es increíblemente potente:</p>

      <ul>
        <li><strong>Request Memoization:</strong> Deduplicación automática de fetches idénticos en un mismo render.</li>
        <li><strong>Data Cache:</strong> Persistencia de resultados de fetch entre requests.</li>
        <li><strong>Full Route Cache:</strong> HTML pre-renderizado para rutas estáticas.</li>
        <li><strong>Router Cache:</strong> Caché client-side de segmentos de ruta visitados.</li>
      </ul>

      <pre><code class="language-jsx">// Revalidación basada en tiempo
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }  // Revalidar cada hora
});

// Revalidación on-demand
import { revalidateTag } from 'next/cache';

async function updateProduct(id) {
  "use server";
  await db.product.update({ where: { id }, data: {...} });
  revalidateTag('products');  // Invalida todas las fetches con este tag
}</code></pre>

      <div class="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8 my-12">
        <strong class="block text-xl text-green-400 mb-2">El Balance Perfecto</strong>
        <p class="text-zinc-300">RSC no es "todo servidor" ni "todo cliente". Es elegir la herramienta correcta para cada componente. Datos estáticos en el servidor, interactividad en el cliente. Simple, pero profundo.</p>
      </div>
    `,
    excerpt: "React Server Components y Next.js App Router están redefiniendo cómo construimos aplicaciones web. Una inmersión profunda en el nuevo paradigma del renderizado.",
    image_url: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop",
    category: "Engineering",
    author: "G3NJ1",
    author_role: "Lead Architect",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    reading_time: 15,
    tags: ["Next.js", "React", "SSR", "RSC"]
  },
  {
    id: 5,
    title: "Minimalismo Digital: El Arte de la Reducción",
    slug: "minimalismo-digital",
    content: `
      <p class="lead text-xl md:text-2xl leading-relaxed text-zinc-300 font-light mb-12">En un mundo donde cada app compite por tu atención con notificaciones, badges rojos y "engagement loops", el minimalismo digital no es solo una estética. Es un acto de resistencia. Es diseñar para la calma en lugar del caos.</p>

      <h2>La Economía de la Atención</h2>
      <p>Nuestra atención se ha convertido en el recurso más escaso y más codiciado del siglo XXI. Empresas con equipos de PhD en psicología del comportamiento diseñan interfaces específicamente para <em>capturarte</em>. El scroll infinito, los autoplay de videos, los likes con animaciones dopamínicas... nada es accidental.</p>

      <p>Como diseñadores y desarrolladores, tenemos una elección: podemos ser cómplices de esta carrera hacia el fondo, o podemos construir algo diferente.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop" alt="Minimal workspace" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Un espacio de trabajo minimalista reduce la carga cognitiva y aumenta el enfoque.</figcaption>
      </figure>

      <h2>Principios del Diseño Minimalista</h2>
      <p>El minimalismo no es "quitar cosas hasta que se rompa". Es un proceso intencional de destilación donde cada elemento que permanece tiene un propósito claro.</p>

      <h3>1. Jerarquía Visual Radical</h3>
      <p>En una interfaz minimalista, la jerarquía no se establece con colores llamativos o badges, sino con <strong>espacio</strong>. El espacio en blanco (o "espacio negativo") es tan importante como el contenido.</p>

      <blockquote>
        "El espacio en blanco no es espacio vacío. Es espacio que respira."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Jan Tschichold</footer>
      </blockquote>

      <pre><code class="language-css">/* Espaciado generoso para legibilidad */
.article-content {
  max-width: 65ch;           /* Longitud de línea óptima */
  line-height: 1.8;          /* Interlineado amplio */
  letter-spacing: -0.01em;   /* Tracking ligeramente ajustado */
}

.article-content p {
  margin-bottom: 2rem;       /* Separación entre párrafos */
}

.article-content h2 {
  margin-top: 4rem;          /* Espacio antes de secciones */
  margin-bottom: 1.5rem;
}</code></pre>

      <h3>2. Paleta de Color Restringida</h3>
      <p>Una paleta minimalista típicamente consiste en:</p>
      
      <ul>
        <li><strong>Un color de fondo:</strong> Generalmente neutro (blanco, off-white, negro, gris oscuro).</li>
        <li><strong>Un color de texto:</strong> Con suficiente contraste para accesibilidad (ratio mínimo 4.5:1).</li>
        <li><strong>Un color de acento:</strong> Usado <em>extremadamente</em> con moderación para CTAs y elementos interactivos.</li>
      </ul>

      <pre><code class="language-css">:root {
  /* Sistema de colores minimalista */
  --color-bg: #0a0a0a;
  --color-text: #e5e5e5;
  --color-text-secondary: #737373;
  --color-accent: #06b6d4;  /* Cyan - usado solo para enlaces y CTAs */
  --color-border: #262626;
}</code></pre>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" alt="Minimal color palette" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">Una paleta restringida crea coherencia y reduce la fatiga visual.</figcaption>
      </figure>

      <h3>3. Tipografía como Elemento Central</h3>
      <p>Sin elementos decorativos que compitan por atención, la tipografía debe brillar. Una sola familia tipográfica bien elegida, con variaciones de peso, puede crear toda la jerarquía necesaria.</p>

      <pre><code class="language-css">/* Sistema tipográfico minimalista */
body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}

h1 { 
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

h2 { 
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

p, li { 
  font-size: 1.125rem;
  font-weight: 400;
}</code></pre>

      <h2>Micro-interacciones Sutiles</h2>
      <p>El minimalismo no significa ausencia de movimiento. Las animaciones, cuando son sutiles y con propósito, mejoran la usabilidad al proporcionar feedback y guiar la atención.</p>

      <h3>Principios de Animación Minimalista</h3>
      <ul>
        <li><strong>Duración corta:</strong> 150-300ms para la mayoría de transiciones.</li>
        <li><strong>Easing natural:</strong> <code>cubic-bezier(0.4, 0, 0.2, 1)</code> para entradas, <code>cubic-bezier(0, 0, 0.2, 1)</code> para salidas.</li>
        <li><strong>Propiedades simples:</strong> Preferir <code>opacity</code> y <code>transform</code> sobre cambios de layout.</li>
      </ul>

      <pre><code class="language-css">/* Transiciones sutiles pero efectivas */
.link {
  position: relative;
  color: var(--color-text);
  transition: color 200ms ease;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.link:hover {
  color: var(--color-accent);
}

.link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}</code></pre>

      <h2>Diseño de Interacciones Respetuosas</h2>
      <p>Un diseño verdaderamente minimalista respeta el tiempo y la autonomía del usuario. Esto significa:</p>

      <ul>
        <li><strong>Sin popups de suscripción agresivos.</strong> Si ofreces un newsletter, hazlo visible pero no intrusivo.</li>
        <li><strong>Sin patrones oscuros.</strong> Los botones de "cancelar" deben ser tan visibles como los de "confirmar".</li>
        <li><strong>Sin métricas de vanidad.</strong> ¿Realmente necesitas mostrar "4.2K likes"? ¿O es solo para crear FOMO?</li>
        <li><strong>Controles de usuario reales.</strong> Modo oscuro, preferencias de notificación, control sobre los datos.</li>
      </ul>

      <blockquote>
        "La tecnología está a su mejor cuando es invisible."
        <footer class="text-sm text-cyan-400 mt-4 not-italic font-mono">— Jony Ive</footer>
      </blockquote>

      <h2>Casos de Estudio</h2>
      
      <h3>iA Writer</h3>
      <p>La app de escritura iA Writer es el epítome del minimalismo funcional. Una sola fuente (iA Writer Duo), un solo color de fondo, un cursor. Nada más. Y sin embargo, es una de las herramientas de escritura más poderosas que existen, precisamente <em>porque</em> elimina distracciones.</p>

      <h3>Linear</h3>
      <p>Linear ha demostrado que incluso herramientas de productividad empresarial pueden ser minimalistas. Su interfaz es oscura, limpia, y brutalmente eficiente. Cada interacción está optimizada para velocidad: atajos de teclado, búsqueda global, transiciones instantáneas.</p>

      <h3>Notion (con matices)</h3>
      <p>Notion es un caso interesante porque su canvas es minimalista (página en blanco), pero ofrece una paleta de herramientas enorme. El minimalismo aquí es <em>opcional</em>: puedes crear páginas sobrecargadas o páginas zen. La herramienta no te juzga.</p>

      <figure class="my-16">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop" alt="Minimal desk setup" />
        <figcaption class="text-center text-sm text-zinc-500 mt-4 font-mono">El minimalismo digital es una extensión del minimalismo físico.</figcaption>
      </figure>

      <h2>El Costo del Minimalismo</h2>
      <p>Seamos honestos: el minimalismo tiene trade-offs. Requiere más tiempo de diseño (la simplicidad es difícil). Puede parecer "aburrido" a stakeholders que esperan dashboards llenos de gráficos. Y no es apropiado para todas las aplicaciones: un editor de video profesional <em>necesita</em> complejidad visible.</p>

      <p>Pero cuando es apropiado, el minimalismo crea experiencias que los usuarios aman usar día tras día, sin fatiga, sin frustración, sin la sensación de estar siendo manipulados.</p>

      <div class="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700 rounded-xl p-8 my-12">
        <strong class="block text-xl text-white mb-2">Reflexión Final</strong>
        <p class="text-zinc-300">El minimalismo digital no es una moda estética. Es una posición ética sobre cómo la tecnología debería relacionarse con los humanos. En un mundo de ruido, diseñar para el silencio es un acto radical.</p>
      </div>
    `,
    excerpt: "En un mundo de notificaciones infinitas y diseño manipulador, el minimalismo digital es un acto de resistencia. Exploramos sus principios y aplicaciones.",
    image_url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop",
    category: "Design",
    author: "Tempest",
    author_role: "Design Lead",
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    reading_time: 11,
    tags: ["Design", "Minimalism", "UX", "Ethics"]
  }
];
