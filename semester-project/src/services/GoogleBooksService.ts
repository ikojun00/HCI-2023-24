import axios from "axios";

export default async function GoogleBooksService(searchTerm: string) {
    try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=4`
        );
        const bookData = response.data.items;
        return bookData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}
