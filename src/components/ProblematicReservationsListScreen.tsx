import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles, Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import ReservationExpandedScreen from './ReservationExpandedScreen';
import { AppBar, Box, IconButton, List, ListItemButton, ListItemIcon, Toolbar, makeStyles, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Pagination } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getProblematicReservations, setCurrentReservation } from '../Redux/actions';
import { AppDispatch } from '../Redux/store';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { TextField, InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Container } from '@mui/material';
import './corner.css';
import { useNavigate } from 'react-router-dom';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transition: 'background-color 0.5s',
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      transition: 'background-color 0.5s',
    },
  },
}))(TableRow);
const useStyles = withStyles((theme) => ({
  drawer: {
    width: '1300px', // Increase the width of the drawer
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const ProblematicReservationsListScreen = ({ onLogout }) => {
  const dispatch: AppDispatch= useDispatch()
  const reservations = useSelector((state:any) => state.reservation.reservations);
  const currentReservation = useSelector((state:any) => state.reservation.currentReservation);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const pageSize = 8;

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    dispatch(getProblematicReservations(page, pageSize));
  }, [page, dispatch]);

  useEffect(() => {
    const fetchReservations = async () => {
      
      if (searchTerm) {
        try {
          const response = await axios.post(
            'https://wosh-test.herokuapp.com/api/service/searchReservations',
            {
             
                startIndex: 0,
                count: 8,
                freeText: searchTerm,
              
            }
          );
          // Update your redux store here with response.data
          dispatch({ type: 'SET_RESERVATIONS', payload: response.data });
        } catch (error) {
          console.error('Failed to fetch reservations:', error);
        }
      } else {
        dispatch(getProblematicReservations(page, pageSize));
      }
     
    };
    
    fetchReservations();
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
    navigate("/login");
  };


  return (
    // <Container>{isLoading ? (
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //     <CircularProgress />
    //   </div>
    // ) : (
    <div>
      <AppBar color="transparent" style={{ paddingBottom: '10px' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
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
      <TableContainer style={{ marginTop: '90px' }} component={Paper}>
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
                 <StyledTableCell align="right">{reservation.assignedPartners[0].name}</StyledTableCell> 
                <StyledTableCell align="right">{reservation.taskObject.nickName}</StyledTableCell>
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
        <StyledPagination count={10} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
      {currentReservation && (
        <ReservationExpandedScreen
          open={openDialog}
          onClose={closeReservationDialog}
          reservation={currentReservation}
        />
      )}
      
    </div>
    // )}
    // </Container>
  );
};

export default ProblematicReservationsListScreen;
