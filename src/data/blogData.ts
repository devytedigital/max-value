export interface BlogContentBlock {
  type: "paragraph" | "heading" | "quote" | "list" | "image" | "callout";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
  title?: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: Author;
  readTime: string;
  summary: string;
  bannerImage: string;
  tags: string[];
  content: BlogContentBlock[];
  isFeatured?: boolean;
}

export const blogCategories = [
  "All",
  "Gold Loan Insights",
  "Financial Literacy",
  "MSME & Traders",
  "Personal Finance",
  "Corporate Growth",
];

export const blogPosts: BlogPost[] = [];

export function getBlogPostById(idOrSlug: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === idOrSlug || post.slug === idOrSlug);
}

export function getRelatedBlogPosts(currentId: string, limit = 3): BlogPost[] {
  return blogPosts.filter(post => post.id !== currentId).slice(0, limit);
}
