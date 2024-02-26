const qGetBooksByTabs = (
  tab: string,
  searchTerm: string,
  limit: number,
  skip: number
) => `
  query {
    booksCollection(where: { ${tab}_contains: "${searchTerm}" }, limit: ${limit}, skip: ${skip}) {
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
  }
`;

export default qGetBooksByTabs;
