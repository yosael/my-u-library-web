import Loader from "@/components/loader";
import BookService from "@/service/book.service";
import { ActionResult } from "@/types/actions";
import { BookResponse } from "@/types/book";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import CheckoutService from "@/service/checkout.service";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function BookPage() {
  const [book, setbook] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  const params = useParams();
  const user = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleRequestBook = async () => {
    try {
      if (params.id && user?.id) {
        setLoading(true);
        const result = await CheckoutService.createCheckout({
          book: params.id,
          user: user.id,
          checkoutDate: new Date(),
          returnDate: null,
          status: "requested",
        });
        navigate("/checkouts");
      } else {
        setActionResult({
          message: "Please login to request a book",
          messageType: "error",
        });
      }
    } catch (error) {
      setActionResult({
        message: (error as Error).message,
        messageType: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setActionResult(null);
  };

  const { title, author, genre, publishedYear, stock } = book || {};

  if (loadingData) return <Loader />;

  return (
    <Container>
      <Card style={{ marginTop: 10 }}>
        <CardHeader title={title} />
        <CardContent>
          <AutoStoriesIcon />
          <Typography variant="body1">
            <strong>Author:</strong> {author}
          </Typography>
          <Typography variant="body1">
            <strong>Genre:</strong> {genre}
          </Typography>
          <Typography variant="body1">
            <strong>Published Year:</strong> {publishedYear}
          </Typography>
          <Typography variant="body1">
            <strong>Stock:</strong> {stock}
          </Typography>
          {/*<img src="book-cover.jpg" alt="Book Cover" />*/}
        </CardContent>
        <CardActions>
          <Link to={"/books"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="info"
              startIcon={<FormatListBulletedIcon />}
            >
              Book List
            </Button>
          </Link>
          {stock && stock > 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestBook}
              style={{ marginLeft: 5 }}
              startIcon={<AddIcon />}
              disabled={loading}
            >
              {loading ? "Requesting Book" : "Request Book"}
            </Button>
          ) : (
            <Typography variant="body1" color="error">
              Out of stock
            </Typography>
          )}
        </CardActions>
      </Card>
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
    </Container>
  );
}
