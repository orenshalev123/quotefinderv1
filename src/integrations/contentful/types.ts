
import { Document } from '@contentful/rich-text-types';

export interface ContentfulArticle {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      }
    }
  };
  fields: {
    title: string;
    slug: string;
    category: string;
    date: string;
    author: string;
    readTime?: string;
    content: Document;
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

export interface QuoteFinderContent {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      }
    }
  };
  fields: {
    Articles: Document;
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
  sourceMaps?: {
    vercelContentId: string;
    vercelContentSource: string;
  };
}

