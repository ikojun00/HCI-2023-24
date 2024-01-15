const qGetAllBooks = (searchTerm: string) => `
  query {
    booksCollection(where: { title_contains: "${searchTerm}" }) {
      items {
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

export default qGetAllBooks;
