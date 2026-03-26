export interface AppConfig {
  station: string;
  dial: string;
  slogan: string;
  stream: {
    url: string;
  };
  website: string;
  api: {
    base: string;
    noticias: string;
    noticia: string;
    servicios: string;
  };
  media: {
    fallback_image: string;
  };
  app: {
    min_supported: string;
    latest: string;
    force_update: boolean;
    update_notes: string;
  };
  stores: {
    play_store: string;
    app_store: string;
  };
  contact: {
    whatsapp: {
      number: string;
      message: string;
    };
  };
  social: Array<{
    name: string;
    url: string;
  }>;
}
