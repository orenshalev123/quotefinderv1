
export interface ContentfulArticle {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    category: string;
    date: string;
    author: string;
    readTime?: string;
    content: {
      content: {
        value: string;
      }[];
    };
    excerpt?: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
}
