import axios from "axios";

export default async function GoogleBooksService(
  searchTerm: string,
  filter: string,
  category: string
) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${filter}${searchTerm}${category}&printType=books&key=${process.env.API_KEY}`
    );
    const bookData = response.data.items;
    return bookData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
