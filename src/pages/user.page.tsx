import UserService from "@/service/user.service";
import { UserResponse } from "@/types/user";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function UserPage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const params = useParams();

  useEffect(() => {
    const getUser = async (userId: string) => {
      const result = await UserService.getUserById(userId);
      setUser(result);
    };

    if (params.id) {
      console.log("user id: ", params.id);
      getUser(params.id);
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (params.id) {
      UserService.updateUser(params.id, user);
    } else {
      UserService.createUser(user);
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

  const title = params.id ? "Edit" : "Create New";

  return (
    <Container>
      <h1>User Page - {title}</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
          maxWidth: 600,
          width: "100%",
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
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            style={{ marginLeft: 40 }}
            type="submit"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
