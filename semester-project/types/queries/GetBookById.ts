const qGetBookById = (bookId: string) => `query {
    booksCollection(where: { sys: {id: "${bookId}"}}) {
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

export default qGetBookById;
