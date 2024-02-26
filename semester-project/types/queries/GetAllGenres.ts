const qGetAllGenres = `query {
    genresCollection(order: title_ASC) {
      items {
        title
        image {
          url
        }
      }
    }
}`;

export default qGetAllGenres;
