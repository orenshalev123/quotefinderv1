
export interface StoryblokArticle {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  content: {
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    content: any; // Rich text content
    excerpt: string;
    featured_image: {
      filename: string;
    };
    component: string;
  };
  published_at: string;
  created_at: string;
}

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  category?: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  sourceMaps?: {
    storyblokEditorUrl?: string;
    storyblokContentId?: string;
  };
}
