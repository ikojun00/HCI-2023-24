const qGetBookById = (bookId: number) => `query {
    booksCollection(where: { bookId: ${bookId}}) {
      items {
        bookId
        title
        author
        description
        cover {
            url
        }
      }
    }
  }`;

export default qGetBookById;
