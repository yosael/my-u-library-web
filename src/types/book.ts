export type BookRequest = {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  stock: number;
};

export type BookResponse = {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  stock: number;
};
