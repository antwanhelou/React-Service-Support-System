import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  withStyles,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import ReservationExpandedScreen from "./ReservationExpandedScreen";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  makeStyles,
  styled,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Pagination } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  getProblematicReservations,
  setCurrentReservation,
} from "../Redux/actions";
import { AppDispatch } from "../Redux/store";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { TextField, InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, Container } from "@mui/material";
import "./corner.css";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Switch } from "@mui/material";
import { useCache } from "react-cache";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: "50%",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      transition: "background-color 0.5s",
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
      transition: "background-color 0.5s",
    },
  },
}))(TableRow);

const useStyles = withStyles((theme) => ({
  drawer: {
    width: "1300px", // Increase the width of the drawer
  },
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const ProblematicReservationsListScreen = ({ onLogout }) => {
  const dispatch: AppDispatch = useDispatch();
  const reservations = useSelector(
    (state: any) => state.reservation.reservations
  );
  const currentReservation = useSelector(
    (state: any) => state.reservation.currentReservation
  );
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const pageSize = 8;
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    dispatch(getProblematicReservations(page, pageSize));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(fetchReservations(searchTerm, page, pageSize));
  }, [searchTerm, page, pageSize, dispatch]);

  const openReservationDialog = (reservation) => {
    dispatch(setCurrentReservation(reservation));
    setOpenDialog(true);
  };

  const closeReservationDialog = () => {
    dispatch(setCurrentReservation(null));
    setOpenDialog(false);
  };

  const handleLogout = () => {
    // Call the onLogout function passed from the App component
    onLogout();
    navigate("/");
  };

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ff0000",
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#3f51b",
        secondary: "#333333",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            textTransform: "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            padding: "10px",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
          },
        },
      },
      // Add more component styles here
    },
    // Add more theme options here
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#00ff00",
      },
      background: {
        default: "#111111",
        paper: "#222222",
      },
      text: {
        primary: "#ffffff",
        secondary: "#cccccc",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "uppercase",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "#333333",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "16px",
            padding: "12px",
            backgroundColor: "#333333",
            color: "#ffffff",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: "black",
            color: "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#333333",
          },
        },
      },
      // Add more component styles here
    },
    // Add more theme options here
  });

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div>
        <AppBar color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reservations"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ flexGrow: 1 }} />
            <Switch
              checked={themeMode === "dark"}
              onChange={toggleTheme}
              color="primary"
            />{" "}
            {/* Toggle theme button */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItemButton key="Logout" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
                Logout
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Drawer>
        <TableContainer style={{ marginTop: "90px" }} component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align="right">Partner</StyledTableCell>
                <StyledTableCell align="right">Car</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <StyledTableRow key={reservation.id}>
                  <StyledTableCell component="th" scope="row">
                    {reservation.customer.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {reservation.assignedPartners[0].name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {reservation.taskObject.nickName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => openReservationDialog(reservation)}>
                      <OpenInNewIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledPagination
            count={10}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
        {currentReservation && (
          <ReservationExpandedScreen
            open={openDialog}
            onClose={closeReservationDialog}
            reservation={currentReservation}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ProblematicReservationsListScreen;
