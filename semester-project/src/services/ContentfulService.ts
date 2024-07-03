import navbarCollectionResponse from "../../types/interfaces/NavbarCollectionResponse";
import qGetAllNavbarNames from "../../types/queries/GetAllNavbarNames";
import booksCollectionResponse from "../../types/interfaces/BooksCollectionResponse";
import qGetNewBooks from "../../types/queries/GetNewBooks";
import qGetBookById from "../../types/queries/GetBookById";
import qGetBooksByTabs from "../../types/queries/GetBooksByTabs";
import BookItem from "../../types/interfaces/BookItem";
import qGetAllGenres from "../../types/queries/GetAllGenres";
import genresCollectionResponse from "../../types/interfaces/GenresCollectionResponse";
import GenreItem from "../../types/interfaces/GenreItem";
import ProfileImageItem from "../../types/interfaces/ProfileImageItem";
import qGetAllProfileImages from "../../types/queries/GetAllProfileImages";
import profileImagesCollectionResponse from "../../types/interfaces/ProfileImagesCollectionResponse";
import qGetProfileImageById from "../../types/queries/GetProfileImageById";

const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

const graphqlRequest = async (query: string) => {
  return await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: query }),
  });
};

const booksCollection = (data: booksCollectionResponse) => {
  return data.booksCollection.items.map((item) => ({
    bookId: item.bookId,
    title: item.title,
    author: item.author,
    description: item.description,
    pages: item.pages,
    cover: item.cover,
  }));
};

const getAllNavbarNames = async () => {
  try {
    const response = await graphqlRequest(qGetAllNavbarNames);
    const body = (await response.json()) as {
      data: navbarCollectionResponse;
    };

    const navbarNames = body.data.navbarCollection.items.map((item) => ({
      title: item.title,
      path: item.path,
      dropdowns: item.dropdowns.map((dropdown) => dropdown),
    }));

    return navbarNames;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getBooksByTabs = async (
  tab: string,
  searchTerm: string,
  limit: number,
  skip: number
) => {
  try {
    const response = await graphqlRequest(
      qGetBooksByTabs(tab, searchTerm, limit, skip)
    );

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };

    return booksCollection(body.data);
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getNewBooks = async () => {
  try {
    const response = await graphqlRequest(qGetNewBooks);

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };
    return booksCollection(body.data);
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getBookById = async (bookId: number): Promise<BookItem> => {
  try {
    const response = await graphqlRequest(qGetBookById(bookId));

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };

    return booksCollection(body.data)[0];
  } catch (error) {
    throw error;
  }
};

const getAllGenres = async (): Promise<GenreItem[]> => {
  try {
    const response = await graphqlRequest(qGetAllGenres);
    const body = (await response.json()) as {
      data: genresCollectionResponse;
    };

    const genres = body.data.genresCollection.items.map((item) => ({
      title: item.title,
      image: item.image,
    }));

    return genres;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getAllProfileImages = async (): Promise<ProfileImageItem[]> => {
  try {
    const response = await graphqlRequest(qGetAllProfileImages);
    const body = (await response.json()) as {
      data: profileImagesCollectionResponse;
    };

    const profileImages = body.data.profileImagesCollection.items.map(
      (item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })
    );

    return profileImages;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getProfileImageById = async (id: number): Promise<ProfileImageItem | null> => {
  try {
    const response = await graphqlRequest(qGetProfileImageById(id));
    const body = (await response.json()) as {
      data: profileImagesCollectionResponse;
    };

    const profileImages = body.data.profileImagesCollection.items.map(
      (item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      })
    );

    return profileImages[0];
  } catch (error) {
    console.log(error);

    return null;
  }
};

const ContentfulService = {
  getAllNavbarNames,
  getBooksByTabs,
  getNewBooks,
  getBookById,
  getAllGenres,
  getAllProfileImages,
  getProfileImageById
};

export default ContentfulService;
