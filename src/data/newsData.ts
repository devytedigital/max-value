export interface ContentBlock {
  type: "paragraph" | "heading" | "quote" | "list" | "image";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
}

export interface SupportingImage {
  url: string;
  caption: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  bannerImage: string;
  supportingImages?: SupportingImage[];
  content?: ContentBlock[];
  createdAt?: string;
}

export const newsArticles: NewsArticle[] = [];
