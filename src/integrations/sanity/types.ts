
// Basic Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Sanity image object
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

// SanityBlock for portable text
export interface SanityBlock {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
  }[];
  style: string;
}

// Sanity Article type
export interface SanityArticle extends SanityDocument {
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  category: string;
  author: string;
  excerpt?: string;
  readTime?: string;
  date: string;
  content: SanityBlock[];
  mainImage?: SanityImage;
}

// Mapped article type (similar to the one from Contentful)
export interface SanityArticleData {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  content: string; // HTML string
  excerpt?: string;
  featuredImage?: string;
  sourceMaps?: {
    sanityDocumentId: string;
    sanityStudioUrl: string;
  };
}
