import navbarCollectionResponse from "../../types/interfaces/NavbarCollectionResponse";
import qGetAllNavbarNames from "../../types/queries/GetAllNavbarNames";
import booksCollectionResponse from "../../types/interfaces/BooksCollectionResponse";
import qGetNewBooks from "../../types/queries/GetNewBooks";
import qGetBookById from "../../types/queries/GetBookById";
import qGetBooksByTabs from "../../types/queries/GetBooksByTabs";
import BookItem from "../../types/interfaces/BookItem";

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

const getBooksByTabs = async (tab: string, searchTerm: string) => {
  try {
    const response = await graphqlRequest(qGetBooksByTabs(tab, searchTerm));

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

const ContentfulService = {
  getAllNavbarNames,
  getBooksByTabs,
  getNewBooks,
  getBookById,
};

export default ContentfulService;
