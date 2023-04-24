import CheckoutService from "@/service/checkout.service";
import { CheckoutListResponse } from "@/types/checkout";
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

export default function CheckoutAdminPage() {
  const [checkout, setCheckout] = useState<CheckoutListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  const params = useParams();

  useEffect(() => {
    const getCheckout = async (checkoutId: string) => {
      try {
        setLoadingData(true);
        const result = await CheckoutService.getCheckoutById(checkoutId);
        setCheckout(result);
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
      getCheckout(params.id);
    } else {
      setActionResult({
        message: "Id is required",
        messageType: "error",
      });
    }
  }, []);

  const returnBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkout) return;

    try {
      setLoading(true);
      if (params.id) {
        const returedBook = await CheckoutService.returnBook(params.id);
        setCheckout(returedBook);
      } else {
        throw new Error("Id is required");
      }
      setActionResult({
        message: "Checkout succesfully saved",
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
      <h1>Checkout Page - {title}</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "31ch" },
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
        }}
        noValidate
        autoComplete="off"
        onSubmit={returnBook}
      >
        <div>
          <TextField
            value={checkout?.user.name || ""}
            name="userName"
            label={"User"}
            required
          />
          <TextField
            value={checkout?.book.title || ""}
            label={"Book"}
            name="bookTitle"
          />
        </div>
        <div>
          <TextField
            value={checkout?.checkoutDate || ""}
            label={"Checkout Date"}
            name="checkoutDate"
          />
          <TextField
            value={checkout?.returnDate || ""}
            label={"Return Date"}
            name="returnDate"
          />
        </div>
        <div>
          <TextField
            value={checkout?.status.toUpperCase() || ""}
            label={"Status"}
            name="statusDate"
            style={{ textTransform: "capitalize" }}
            color={checkout?.status == "returned" ? "success" : "warning"}
          />
        </div>
        <Box display={"flex"} justifyContent={"space-evenly"} mt={2}>
          {checkout?.status == "requested" && (
            <Link to={"/checkouts/admin"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
          )}

          <Link to={"/checkouts/admin"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="info"
              startIcon={<FormatListBulletedIcon />}
            >
              Checkout List
            </Button>
          </Link>
          {(checkout?.status == "requested" || !checkout?.returnDate) && (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating" : "Return Book"}
            </Button>
          )}
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
