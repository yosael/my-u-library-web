import CheckoutService from "@/service/checkout.service";
import { CheckoutResponse } from "@/types/checkout";
import { useEffect, useState } from "react";
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
import { useFetchCheckouts } from "@/hooks/useFetchCheckouts";

export default function CheckoutListAdminPage() {
  const { checkouts, loading } = useFetchCheckouts();

  const [searchCheckout, setSearchCheckout] = useState<string | null>(null);

  const filteredCheckouts =
    searchCheckout != null
      ? checkouts.filter(
          (checkout) =>
            checkout.userId
              .toLowerCase()
              .includes(searchCheckout.toLowerCase()) ||
            checkout.bookId
              .toLowerCase()
              .includes(searchCheckout.toLowerCase()) ||
            checkout.checkoutDate
              .toDateString()
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
          <NavLink to={"/checkout/admin"} style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Checkout
            </Button>
          </NavLink>
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
              placeholder="Search checkout by Title, Author, Genre or Stock"
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
            {filteredCheckouts.map((row) => (
              <TableRow
                key={row.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.userId}
                </TableCell>
                <TableCell>{row.bookId}</TableCell>
                <TableCell>{row.checkoutDate.toString()}</TableCell>
                <TableCell>
                  {row.returnDate ? row.returnDate.toString() : null}
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Link to={`/checkout/admin/${row.id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
