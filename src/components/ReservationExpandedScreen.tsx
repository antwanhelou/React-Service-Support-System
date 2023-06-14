import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  textField: {
    margin: theme.spacing(2),
  },
  resolveButton: {
    backgroundImage: 'linear-gradient(45deg, #00d4ff 30%, #377909 90%)',
    color: 'white',
  },
  unresolveButton: {
    backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
}));

function ReservationExpandedScreen({ open, onClose, reservation }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [message, setMessage] = useState('');

  const handleResolve = async () => {
    try {
      const res = await axios.post('https://wosh-test.herokuapp.com/api/service/resolveProblematicReservation', 
      { 
        reservationId: reservation.id,
        status: "RESOLVED",
        serviceTeamUserId: "4c61a0a9-7a18-4c1d-b2f7-3f8a4f1f16c9",
        message: message
      });
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error("Failed to resolve reservation: ", error);
    }
  };
  
  const handleUnresolved= async () => {
    try {
      const res = await axios.post('https://wosh-test.herokuapp.com/api/service/resolveProblematicReservation', 
      { 
        reservationId: reservation.id,
        status: "UNRESOLVED",
        serviceTeamUserId: "4c61a0a9-7a18-4c1d-b2f7-3f8a4f1f16c9",
        message: message
      });
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

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>Reservation Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.sectionTitle}>Task object:</Typography>
                <Typography>Name: {reservation.taskObject.nickName}, {reservation.taskObject.type}</Typography>
                <Typography>Plate Number: {reservation.taskObject.plateNumber}</Typography>
                <Typography>Year: {reservation.taskObject.year}</Typography>
                <Typography variant="h6" className={classes.sectionTitle}></Typography>
                <Typography variant="h6" className={classes.sectionTitle}>FeedBack:</Typography>
                <Typography>message: {reservation.feedback.message}</Typography>
                <Typography>FeedBack type: {reservation.feedback.feedbackType}</Typography>
                <Typography>Rating: {reservation.feedback.feedbackStars}</Typography>
      
              </CardContent>
            </Card>
           
            <TextField
              className={classes.textField}
              variant="outlined"
              required
              fullWidth
              id="message"
              label="Documenation"
              name="message"
              value={message}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={1} md={6}>
         
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.sectionTitle}>Customer:</Typography>
                <Typography>Name: {reservation.customer.name}</Typography>
                <Typography>Email: {reservation.customer.email}</Typography>
                <Typography variant="h6" className={classes.sectionTitle}></Typography>
                <Typography variant="h6" className={classes.sectionTitle}>Partner:</Typography>
                <Typography>Name: {reservation.assignedPartners[0].name}</Typography>
                <Typography>Email: {reservation.assignedPartners[0].email}</Typography>
                <Typography>Stars: {reservation.assignedPartners[0].stars}</Typography>
                <Typography>Reviews: {reservation.assignedPartners[0].reviews}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h6" className={classes.sectionTitle}>Reservation Log:</Typography>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reservation Status</TableCell>
                    <TableCell>Status Text</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? reservation.reservationEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : reservation.reservationEvents
                  ).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell style={{backgroundColor: log.statusColor}}>{log.reservationStatus}</TableCell>
                     <TableCell>{log.statusText}</TableCell> 
                    
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleUnresolved}className={classes.unresolveButton} >UNRESOLVED</Button>
        <Button onClick={handleResolve} className={classes.resolveButton}>Resolve</Button>
       
      </DialogActions>
    </Dialog>
  );
}

export default ReservationExpandedScreen;
