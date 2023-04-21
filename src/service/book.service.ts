import { Book } from "@/types/book";

export default class BookService {
  public static async getBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books`);
      const data = (await response.json()) as Book[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/books/${id}`
      );
      const data = (await response.json()) as Book;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createBook(book: Book): Promise<Book> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const data = (await response.json()) as Book;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
