import BookItem from "./BookItem";

export default interface booksCollectionResponse {
  booksCollection: {
    items: BookItem[];
  };
}
