const qGetBookById = (bookId: number) => `query {
    booksCollection(where: { bookId: ${bookId}}) {
      items {
        bookId
        title
        author
        description
        pages
        cover {
            url
        }
      }
    }
  }`;

export default qGetBookById;
