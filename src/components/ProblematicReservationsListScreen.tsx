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
import {AppDispatch} from '../Redux/store'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
  const dispatch: AppDispatch= useDispatch()
  const reservations = useSelector((state:any) => state.reservations);
  const currentReservation = useSelector((state:any) => state.currentReservation);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pageSize = 8;

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    dispatch(getProblematicReservations(page, pageSize));
  }, [page, dispatch]);

  const openReservationDialog = (reservation) => {
    dispatch(setCurrentReservation(reservation));
    setOpenDialog(true);
  };

  const closeReservationDialog = () => {
    dispatch(setCurrentReservation(null));
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
                    <Button  onClick={() => openReservationDialog(reservation)}><OpenInNewIcon/></Button>
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
