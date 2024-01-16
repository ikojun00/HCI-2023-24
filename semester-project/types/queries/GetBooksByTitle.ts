const qGetBooksByTitle = (searchTerm: string) => `
  query {
    booksCollection(where: { title_contains: "${searchTerm}" }) {
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
  }
`;

export default qGetBooksByTitle;
