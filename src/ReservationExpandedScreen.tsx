import React, { useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface IReservationDetails {
  name: string;
  mobileNumber: string;
  eventsList: string[];
  // Add other reservation details here as needed.
}

// Assume this function is provided somewhere in your project.
const resolveProblematicReservation = async (id: string) => {
  // Call to API to resolve the reservation
};

const ReservationExpandedScreen: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<IReservationDetails | null>(null);

  const handleClickOpen = async () => {
    // Fetch reservation details by id here...
    // Example:
    // const details = await fetchReservationDetails(id);
    // setReservationDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResolve = async () => {
    await resolveProblematicReservation(id);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reservation Details</DialogTitle>
        <DialogContent>
          {reservationDetails && (
            <>
              <div>Name: {reservationDetails.name}</div>
              <div>Mobile Number: {reservationDetails.mobileNumber}</div>
              <div>
                Events List:
                {reservationDetails.eventsList.map((event, index) => (
                  <div key={index}>{event}</div>
                ))}
              </div>
              {/* Display other reservation details here... */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleResolve} color="secondary">
            Resolve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReservationExpandedScreen;
