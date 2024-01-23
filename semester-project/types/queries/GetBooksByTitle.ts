const qGetBooksByTitle = (searchTerm: string) => `
  query {
    booksCollection(where: { title_contains: "${searchTerm}" }, limit: 6) {
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
  }
`;

export default qGetBooksByTitle;
