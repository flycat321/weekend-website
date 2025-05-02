// 内容块基础类型
export type ContentBlockBase = {
  id: string;
  type: string;
}

// 标题块
export type HeadingBlock = ContentBlockBase & {
  type: "heading";
  content: string;
  level: number;
}

// 文本块
export type TextBlock = ContentBlockBase & {
  type: "text";
  content: string;
}

// 图片块
export type ImageBlock = ContentBlockBase & {
  type: "image";
  src: string;
  alt?: string;
  caption?: string;
}

// 特性列表块
export type FeaturesBlock = ContentBlockBase & {
  type: "features";
  items: { title: string, description: string }[];
}

// 图片画廊块
export type GalleryBlock = ContentBlockBase & {
  type: "gallery";
  images: { src: string, alt?: string }[];
}

// 内容块联合类型
export type ContentBlock = HeadingBlock | TextBlock | ImageBlock | FeaturesBlock | GalleryBlock;

// 页面数据类型
export type PageData = {
  id: number;
  title: string;
  path: string;
  content: ContentBlock[];
}

// 页面映射类型
export type PagesMap = {
  [key: string]: PageData;
};
