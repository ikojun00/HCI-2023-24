import GenreItem from "./GenreItem";

export default interface genresCollectionResponse {
  genresCollection: {
    items: GenreItem[];
  };
}
