const qGetAllProfileImages = `query {
    profileImagesCollection(order: title_ASC) {
      items {
        id
        title
        image {
          url
        }
      }
    }
}`;

export default qGetAllProfileImages;
