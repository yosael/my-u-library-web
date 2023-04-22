import UserService from "@/service/user.service";
import { UserResponse } from "@/types/user";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ActionResult } from "@/types/actions";
import Loader from "@/components/loader";

export default function UserPage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  const params = useParams();

  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        setLoadingData(true);
        const result = await UserService.getUserById(userId);
        setUser(result);
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
      getUser(params.id);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      if (params.id) {
        await UserService.updateUser(params.id, user);
      } else {
        await UserService.createUser(user);
      }
      setActionResult({
        message: "User succesfully saved",
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

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setUser((prev) => ({ ...prev, role: value } as UserResponse));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: value } as UserResponse));
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
      <h1>User Page - {title}</h1>

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
            value={user?.firstName || ""}
            name="firstName"
            label={"Firsname"}
            onChange={onInputChange}
            required
          />
          <TextField
            value={user?.lastName || ""}
            label={"Lastname"}
            onChange={onInputChange}
            name="lastName"
            required
          />
        </div>
        <div>
          <TextField
            value={user?.email || ""}
            label={"Email"}
            onChange={onInputChange}
            name="email"
            required
          />
          <TextField
            id="select-role"
            value={user?.role || ""}
            label="Role"
            name="role"
            select
            required
            onChange={handleSelectChange}
          >
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"librarian"}>Librarian</MenuItem>
          </TextField>
        </div>
        <Box display={"flex"} justifyContent={"space-evenly"} mt={2}>
          <Link to={"/users"}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Link>
          <Link to={"/users"}>
            <Button
              variant="contained"
              color="info"
              startIcon={<FormatListBulletedIcon />}
            >
              User List
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
