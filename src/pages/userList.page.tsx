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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SchoolIcon from "@mui/icons-material/School";
import IconText from "@/components/IconText";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchUsers } from "@/hooks/useFetchUsers";

export default function UserListPage() {
  const { users, loading } = useFetchUsers();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsersByRole = users.filter((user) => {
    if (selectedRole === "") return true;
    return user.role === selectedRole;
  });

  const filteredUsers =
    searchUser != null && searchUser.length > 1
      ? filteredUsersByRole.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(searchUser.toLowerCase())
        )
      : filteredUsersByRole;

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
          <NavLink to={"/user"} style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add User
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
              placeholder="Search user"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
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
              <MenuItem value={"student"}>
                <IconText text="Student" iconProp={<SchoolIcon />} />
              </MenuItem>
              <MenuItem value={"librarian"}>
                <IconText text="Librarian" iconProp={<LocalLibraryIcon />} />
              </MenuItem>
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
            {filteredUsers.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.role == "student" ? (
                    <IconText text="Student" iconProp={<SchoolIcon />} />
                  ) : (
                    <IconText
                      text="Librarian"
                      iconProp={<LocalLibraryIcon />}
                    />
                  )}
                </TableCell>
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
