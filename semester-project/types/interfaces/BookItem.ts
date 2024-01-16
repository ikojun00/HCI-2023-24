export default interface BookItem {
  bookId: number;
  title: string;
  author: string;
  description: string;
  cover: {
    url: string;
  };
}
