const qGetNewBooks = `query {
    booksCollection(order: sys_publishedAt_DESC, limit: 4) {
      items {
        sys {
          id
        }
        title
        author
        description
        cover {
            url
        }
      }
    }
}`;

export default qGetNewBooks;
