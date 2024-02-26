export default interface BookItem {
  bookId: number;
  title: string;
  author: string;
  description: string;
  pages: number;
  cover: {
    url: string;
  };
}
