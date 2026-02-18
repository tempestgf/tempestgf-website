import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document para Pages Router.
 * Necesario para resolver el módulo /_document que algunas dependencias o el build esperan.
 * Las rutas reales usan App Router (src/app); este archivo solo evita PageNotFoundError.
 */
export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
