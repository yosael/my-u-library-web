import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { Link, NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Loader from "@/components/loader";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchCheckouts } from "@/hooks/useFetchCheckouts";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function CheckoutListAdminPage() {
  const { checkouts, loading, actionResult, handleActionMessageClose } =
    useFetchCheckouts();

  const [searchCheckout, setSearchCheckout] = useState<string | null>(null);

  const filteredCheckouts =
    searchCheckout != null
      ? checkouts.filter(
          (checkout) =>
            checkout.user.name
              .toLowerCase()
              .includes(searchCheckout.toLowerCase()) ||
            checkout.book.title
              .toLowerCase()
              .includes(searchCheckout.toLowerCase()) ||
            checkout.checkoutDate
              .toString()
              .toLowerCase()
              .includes(searchCheckout.toLowerCase())
        )
      : checkouts;

  if (loading) return <Loader />;

  return (
    <Container>
      <h1>Checkout List</h1>
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
              placeholder="Search checkout by User, Book Title or Date"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchCheckout || ""}
              onChange={(e) => setSearchCheckout(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box></Box>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Checkouts table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Book</TableCell>
              <TableCell>Checkout Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCheckouts?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>{row.user.name}</b>
                </TableCell>
                <TableCell>{row.book.title}</TableCell>
                <TableCell>{row.checkoutDate.toString()}</TableCell>
                <TableCell>
                  {row.returnDate ? row.returnDate.toString() : null}
                </TableCell>
                <TableCell
                  style={{
                    color: row.status == "returned" ? "green" : "#ffa726",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell>
                  <Link to={`/checkouts/admin/${row.id}`}>
                    <EditIcon />
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
