import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles, Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import ReservationExpandedScreen from './ReservationExpandedScreen';
import { AppBar, Box, IconButton, List, ListItemButton, ListItemIcon, Toolbar, makeStyles, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Pagination } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
    fontSize: 14,'&:hover': {
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
function ProblematicReservationsListScreen() {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pageSize = 8;

  const getProblematicReservations = async () => {
    try {
      const data = {
        startIndex: page * pageSize,
        count: pageSize
      };

      const res = await axios.post('https://wosh-test.herokuapp.com/api/service/getProblematicReservations', data);
      console.log(res.data);
      setReservations(res.data);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    getProblematicReservations();
  }, [page]);

  const openReservationDialog = (reservation) => {
    setCurrentReservation(reservation);
    setOpenDialog(true);
  };

  const closeReservationDialog = () => {
    setCurrentReservation(null);
    setOpenDialog(false);
  };

  return (
    
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItemButton key='Logout' >
            <ListItemIcon><LogoutIcon />Logout</ListItemIcon>
            
          </ListItemButton>
        </List>
      </Drawer>
    
        <TableContainer component={Paper}>
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
                  <StyledTableCell component="th" scope="row">{reservation.customer.name}</StyledTableCell>
                  <StyledTableCell align="right">{reservation.assignedPartners[0].name}</StyledTableCell>
                  <StyledTableCell align="right">{reservation.taskObject.nickName}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => openReservationDialog(reservation)}>View</Button>
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
    );
  }


export default ProblematicReservationsListScreen;
