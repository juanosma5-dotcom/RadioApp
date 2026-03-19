// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN GENERAL DE LA APP — Antena de los Andes
//  Cambia solo este archivo para actualizar datos de la emisora.
//  No toques los componentes para cambiar URLs o números de contacto.
// ─────────────────────────────────────────────────────────────────────────────

export const CONFIG = {

  // ---------------------------------------------------------------------------
  // IDENTIDAD
  // ---------------------------------------------------------------------------

  /** Nombre de la emisora (aparece en el header y el reproductor) */
  nombreEmisora: 'Antena de los Andes',


  // ---------------------------------------------------------------------------
  // STREAMING DE AUDIO
  // ---------------------------------------------------------------------------

  /** URL del stream de radio en vivo (Zeno.fm u otro proveedor) */
  streamUrl: 'https://radiolatina.live/9374/stream',


  // ---------------------------------------------------------------------------
  // API DE NOTICIAS (WordPress REST API)
  // ---------------------------------------------------------------------------

  /** Base del sitio web de la emisora */
  sitioWeb: 'https://antenadelosandes.com',

  /** Endpoint para obtener el listado de noticias recientes */
  apiNoticias: 'https://antenadelosandes.com/wp-json/wp/v2/posts?_embed&per_page=10',

  /** Endpoint para obtener una noticia por ID — usar con: `${CONFIG.apiNoticia}/${id}?_embed` */
  apiNoticia: 'https://antenadelosandes.com/wp-json/wp/v2/posts',

  /** Endpoint para obtener los servicios desde la web */
  apiServicios: 'https://antenadelosandes.com/servicios',

  /** Imagen de respaldo cuando una noticia no tiene imagen destacada */
  imagenFallback: 'https://antenadelosandes.com/wp-content/uploads/2025/07/cropped-IMG.png',


  // ---------------------------------------------------------------------------
  // CONTACTO — WHATSAPP
  // ---------------------------------------------------------------------------

  /** Número de WhatsApp en formato internacional sin espacios ni + (ej: 573117963757) */
  whatsappNumber: '573232216439',

  /** Mensaje predeterminado al abrir WhatsApp desde la app */
  whatsappMensaje:
    '¡Hola! 👋 Te escribo desde la app de *Antena de los Andes*. Me gustaría ponerme en contacto con ustedes.',

};
