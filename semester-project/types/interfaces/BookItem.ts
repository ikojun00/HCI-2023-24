export default interface BookItem {
  sys: {
    id: string;
  };
  title: string;
  author: string;
  description: string;
  cover: {
    url: string;
  };
}
