import bookService from "@/service/book.service";
import { BookResponse } from "@/types/book";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ActionResult } from "@/types/actions";
import Loader from "@/components/loader";
import BookService from "@/service/book.service";

export default function BookAdminPage() {
  const [book, setbook] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  const params = useParams();

  useEffect(() => {
    const getBook = async (bookId: string) => {
      try {
        setLoadingData(true);
        const result = await BookService.getBookById(bookId);
        setbook(result);
      } catch (error) {
        setActionResult({
          message: (error as Error).message,
          messageType: "error",
        });
      } finally {
        setLoadingData(false);
      }
    };

    if (params.id) {
      getBook(params.id);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;

    try {
      setLoading(true);
      if (params.id) {
        await bookService.updateBook(params.id, book);
      } else {
        await bookService.createBook(book);
      }
      setActionResult({
        message: "Book succesfully saved",
        messageType: "success",
      });
    } catch (error) {
      setActionResult({
        message: (error as Error).message,
        messageType: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setbook((prev) => ({ ...prev, [name]: value } as BookResponse));
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setActionResult(null);
  };

  const title = params.id ? "Edit" : "Create New";

  if (loadingData) return <Loader />;

  return (
    <Container>
      <h1>Book Page - {title}</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <TextField
            value={book?.title || ""}
            name="title"
            label={"Title"}
            onChange={onInputChange}
            required
          />
          <TextField
            value={book?.author || ""}
            label={"Author"}
            onChange={onInputChange}
            name="author"
            required
          />
        </div>
        <div>
          <TextField
            value={book?.publishedYear || ""}
            label={"Published Year"}
            onChange={onInputChange}
            name="publishedYear"
            required
          />
          <TextField
            value={book?.genre || ""}
            label={"Genre"}
            onChange={onInputChange}
            name="genre"
            required
          />
          <TextField
            value={book?.stock || ""}
            label={"Stock"}
            onChange={onInputChange}
            name="stock"
            required
          />
        </div>

        <Box display={"flex"} justifyContent={"space-evenly"} mt={2}>
          <Link to={"/books/admin"}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Link>
          <Link to={"/books/admin"}>
            <Button
              variant="contained"
              color="info"
              startIcon={<FormatListBulletedIcon />}
            >
              book List
            </Button>
          </Link>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving" : "Save"}
          </Button>
        </Box>

        {actionResult && (
          <Snackbar
            open={actionResult != null}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert
              onClose={handleClose}
              severity={actionResult?.messageType}
              sx={{ width: "100%" }}
            >
              {actionResult?.message}
            </MuiAlert>
          </Snackbar>
        )}
      </Box>
    </Container>
  );
}
