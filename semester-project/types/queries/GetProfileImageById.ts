const qGetProfileImageById = (id: number) => `query {
    profileImagesCollection(where: { id: ${id}}) {
      items {
        id
        title
        image {
          url
        }
      }
    }
  }`;

export default qGetProfileImageById;
