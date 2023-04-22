import BookService from "@/service/book.service";
import { BookResponse } from "@/types/book";
import { useState, useEffect } from "react";

export function useFetchBooks() {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await BookService.getBooks();
        setBooks(books);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
}
