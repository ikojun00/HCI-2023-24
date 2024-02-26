const qGetNewBooks = `query {
  booksCollection(order: sys_publishedAt_DESC, limit: 4) {
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

export default qGetNewBooks;
