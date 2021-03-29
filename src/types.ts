export type bookEntry = {
  content?: string;
  contentSnippet?: string;
  guid?: string;
  isoDate?: string;
  link?: string;
  pubDate?: string;
  title?: string;
  'book_id'?: string,
  'book_small_image_url'?: string,
  'book_medium_image_url'?: string,
  'book_large_image_url'?: string,
  'book_description'?: string,
  'book'?: {
    'num_pages'?: string[],
  },
  'author_name'?: string,
  'isbn'?: string,
  'user_name'?: string,
  'user_date_added'?: string,
  'user_read_at'?: string,
  'user_review'?: string,
  'average_rating'?: string,
  'user_shelves'?: string,
}

export type feedData = {
  copyright?: string;
  description?: string;
  feedUrl?: string;
  image?: {
    height?: string;
    link?: string;
    title?: string;
    url?: string;
    width?: string;
  };
  items?: bookEntry[];
  language?: string;
  lastBuildDate?: string;
  link?: string;
  title?: string;
}
