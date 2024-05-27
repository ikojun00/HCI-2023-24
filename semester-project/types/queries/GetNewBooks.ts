const qGetNewBooks = `query {
  booksCollection(order: sys_publishedAt_DESC, limit: 5) {
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
