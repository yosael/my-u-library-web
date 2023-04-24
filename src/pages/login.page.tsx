import { Box } from "@mui/material";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import UserService from "@/service/user.service";
import { useAppDispatch } from "@/hooks/storeHooks";
import { loginStore } from "@/store/userSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ActionResult } from "@/types/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await UserService.login(email, password);
      console.log(data);
      if (data?.token) {
        dispatch(
          loginStore({
            id: data.id,
            name: data.firstName + " " + data.lastName,
            email: data.email,
            role: data.role,
            isAuth: true,
          })
        );
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in to My U Library
          </Typography>
          <MenuBookIcon style={{ marginLeft: 4 }} />
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Loading" : "Sign In"}
          </Button>
        </Box>
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
    </Container>
  );
}
