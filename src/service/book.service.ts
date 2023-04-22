import { BookRequest, BookResponse } from "@/types/book";

export default class BookService {
  public static async getBooks(): Promise<BookResponse[]> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books`);
      const data = (await response.json()) as BookResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getBookById(id: string): Promise<BookResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/books/${id}`
      );
      const data = (await response.json()) as BookResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createBook(book: BookRequest): Promise<BookResponse> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const data = (await response.json()) as BookResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async updateBook(
    id: string,
    book: BookRequest
  ): Promise<BookResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );
      const data = (await response.json()) as BookResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async findBookBy(by: string, value: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/books/find?by=${by}value=${value}`
      );
      const data = (await response.json()) as BookResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
