import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import axios from 'axios';

function ReservationExpandedScreen({ open, onClose, reservation }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleResolve = async () => {
    try {
      const res = await axios.post('https://wosh-test.herokuapp.com/api/service/resolveProblematicReservation', { id: reservation.id });
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error("Failed to resolve reservation: ", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reservation Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customer:</Typography>
                <p>Name: {reservation.customer.name}</p>
                <p>Email: {reservation.customer.email}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Partner:</Typography>
                <p>Name: {reservation.assignedPartners[0].name}</p>
                <p>Email: {reservation.assignedPartners[0].email}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Car:</Typography>
                <p>Name: {reservation.taskObject.nickName}</p>
                <p>Plate Number: {reservation.taskObject.plateNumber}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Reservation Log:</Typography>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? reservation.reservationEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : reservation.reservationEvents
                  ).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.reservationStatus}</TableCell>
                      <TableCell>{log.logTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={reservation.reservationEvents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange ={handleChangePage}
                onRowsPerPageChange ={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleResolve} color="primary">Resolve</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReservationExpandedScreen;
