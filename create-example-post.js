// Script usando fetch nativo (disponible en Node 18+)
const examplePost = {
    title: "El Futuro de la Inteligencia Artificial en el Desarrollo Web",
    slug: "futuro-ia-desarrollo-web",
    content: `
    <h2>Introducción</h2>
    <p>La inteligencia artificial está revolucionando la forma en que desarrollamos aplicaciones web. En este artículo, exploramos las tendencias más importantes y cómo están transformando nuestra industria.</p>
    
    <h3>IA Generativa y Código</h3>
    <p>Las herramientas de IA como GitHub Copilot y ChatGPT están cambiando radicalmente la productividad de los desarrolladores. Ya no escribimos código desde cero, sino que colaboramos con AI para crear soluciones más rápidas y eficientes.</p>
    
    <blockquote>
      "La IA no reemplazará a los programadores, pero los programadores que usan IA reemplazarán a los que no." - Anónimo
    </blockquote>
    
    <h3>Personalización Automática</h3>
    <p>Los sistemas de IA permiten crear experiencias web personalizadas en tiempo real:</p>
    <ul>
      <li>Recomendaciones de contenido basadas en comportamiento</li>
      <li>Interfaces adaptativas que se ajustan al usuario</li>
      <li>Chatbots inteligentes para soporte 24/7</li>
      <li>Análisis predictivo de conversiones</li>
    </ul>
    
    <h3>Optimización Automática</h3>
    <p>La IA también está optimizando aspectos técnicos:</p>
    <ol>
      <li><strong>Performance:</strong> Optimización automática de imágenes y recursos</li>
      <li><strong>SEO:</strong> Generación de meta tags y contenido optimizado</li>
      <li><strong>Accesibilidad:</strong> Detección y corrección de problemas de accesibilidad</li>
      <li><strong>Seguridad:</strong> Identificación proactiva de vulnerabilidades</li>
    </ol>
    
    <pre><code>// Ejemplo de integración con IA
const aiResponse = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "user",
    content: "Optimiza este código para mejor rendimiento"
  }]
});</code></pre>
    
    <h2>El Futuro es Ahora</h2>
    <p>No estamos hablando de ciencia ficción. Estas tecnologías están disponibles hoy y ya están siendo adoptadas por empresas líderes. Los desarrolladores que aprendan a integrar IA en sus workflows tendrán una ventaja competitiva significativa.</p>
    
    <p>¿Estás listo para el futuro del desarrollo web? <strong>El momento de empezar es ahora.</strong></p>
  `,
    excerpt: "Descubre cómo la inteligencia artificial está transformando el desarrollo web y qué significa para el futuro de nuestra industria. Desde IA generativa hasta optimización automática.",
    featuredImage: "",
    category: "Inteligencia Artificial",
    tags: ["IA", "Desarrollo Web", "Tecnología", "Futuro"],
    status: "published",
    author: "Tempestgf",
    seoTitle: "El Futuro de la IA en el Desarrollo Web | Tempestgf",
    seoDescription: "Explora cómo la inteligencia artificial está revolucionando el desarrollo web con IA generativa, personalización automática y optimización inteligente."
};

async function createPost() {
    try {
        const response = await fetch('http://localhost:3001/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer admin123'
            },
            body: JSON.stringify(examplePost)
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ Post creado exitosamente!');
            console.log('📝 ID:', data.post.id);
            console.log('🔗 URL:', `http://localhost:3001/blog/${data.post.slug}`);
        } else {
            console.error('❌ Error:', data.error || data.errors);
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
}

createPost();
