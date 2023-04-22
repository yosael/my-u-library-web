import BookService from "@/service/book.service";
import { ActionResult } from "@/types/actions";
import { BookResponse } from "@/types/book";
import { useState, useEffect } from "react";

export function useFetchBooks() {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setActionResult(null);
        const books = await BookService.getBooks();
        setBooks(books);
      } catch (error) {
        setActionResult({
          message: (error as Error).message,
          messageType: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleActionMessageClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setActionResult(null);
  };

  return { books, loading, actionResult, handleActionMessageClose };
}
