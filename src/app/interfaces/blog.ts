export interface IBlog {
    id?: string;
    date: string;
    description: string;
    image: string;
    title: string;
    url: string;
}

export interface MediumRSSArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Record<string, unknown>; // Or: { [key: string]: any } if preferred
  categories: string[];
}