import BookService from "@/service/book.service";
import { BookResponse } from "@/types/book";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BookListPage() {
  const [books, setBooks] = useState<BookResponse[]>([]);

  useEffect(() => {
    document.title = "Book List";
    const getBooks = async () => {
      const result = await BookService.getBooks();
      setBooks(result);
    };
    getBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
    </div>
  );
}
