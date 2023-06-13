import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import ReservationExpandedScreen from './ReservationExpandedScreen';
import { Box } from '@mui/material';

function ProblematicReservationsListScreen() {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
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

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const openReservationDialog = (reservation) => {
    setCurrentReservation(reservation);
    setOpenDialog(true);
  };

  const closeReservationDialog = () => {
    setCurrentReservation(null);
    setOpenDialog(false);
  };

  useEffect(() => {
    getProblematicReservations();
  }, [page]);

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        {/* Drawer contents here */}
      </Drawer>
      <br /><br /><br /><br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor: "#dd0db0"}}>Customer</TableCell>
              <TableCell style={{backgroundColor: "#dd0db0"}} align="right">Partner</TableCell>
              <TableCell style={{backgroundColor: "#dd0db0"}} align="right">Task Object</TableCell>
              <TableCell style={{backgroundColor: "#dd0db0"}} align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell component="th" scope="row">{reservation.customer.name}</TableCell>
                <TableCell align="right">{reservation.assignedPartners[0].name}</TableCell>
                <TableCell align="right">{reservation.taskObject.nickName}</TableCell>
                <TableCell align="right">
  <Button onClick={() => openReservationDialog(reservation)}>View</Button>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center">
      <Button onClick={goToPreviousPage}>Previous Page</Button>
      <Button onClick={goToNextPage}>Next Page</Button>
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
