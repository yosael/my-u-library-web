import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Link, NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Loader from "@/components/loader";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PageviewIcon from "@mui/icons-material/Pageview";
import IconText from "@/components/IconText";

export default function BookListPage() {
  const { books, loading, actionResult, handleActionMessageClose } =
    useFetchBooks();
  const [searchBook, setSearchBook] = useState<string | null>(null);

  const filteredBooks =
    searchBook != null
      ? books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
            book.author.toLowerCase().includes(searchBook.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchBook.toLowerCase())
        )
      : books;

  if (loading) return <Loader />;

  return (
    <Container>
      <h1>Book List</h1>
      <Paper sx={{ width: "100%", overflow: "hidden", my: 4 }}>
        <Box
          py={1}
          ml={2}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box></Box>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search book by Title, Author, Genre"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchBook || ""}
              onChange={(e) => setSearchBook(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box></Box>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Books table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published Year</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.publishedYear}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>
                  <Link
                    to={`/book/${row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconText iconProp={<PageviewIcon />} text="View" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {actionResult && (
        <Snackbar
          open={actionResult != null}
          autoHideDuration={6000}
          onClose={handleActionMessageClose}
        >
          <MuiAlert
            onClose={handleActionMessageClose}
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
