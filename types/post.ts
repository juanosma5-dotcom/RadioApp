export interface WpTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WpMedia {
  source_url: string;
}

export interface WpEmbedded {
  'wp:featuredmedia'?: WpMedia[];
  'wp:term'?: WpTerm[][];
}

export interface WpPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: WpEmbedded;
}
