import UserService from "@/service/user.service";
import { UserResponse } from "@/types/user";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Link, NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Loader from "@/components/loader";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function UserListPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const result = await UserService.findAll();
        setUsers(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value);
  };

  const filteredUSers = users.filter((user) => {
    if (selectedRole === "") return true;
    return user.role === selectedRole;
  });

  if (loading) return <Loader />;

  return (
    <Container>
      <h1>User List</h1>
      <Paper sx={{ width: "100%", overflow: "hidden", my: 4 }}>
        <Box
          py={1}
          ml={2}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <NavLink to={"/user"}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add User
            </Button>
          </NavLink>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Search By Role
            </InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              value={selectedRole}
              onChange={handleChange}
              autoWidth
              label="Search by role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"librarian"}>Librarian</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Firtname</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUSers.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Link to={`/user/${row.id}`}>
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
