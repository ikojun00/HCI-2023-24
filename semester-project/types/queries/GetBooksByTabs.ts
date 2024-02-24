const qGetBooksByTabs = (tab: string, searchTerm: string) => `
  query {
    booksCollection(where: { ${tab}_contains: "${searchTerm}" }, limit: 6) {
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

export default qGetBooksByTabs;
