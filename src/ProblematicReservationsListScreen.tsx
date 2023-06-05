import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GiHamburgerMenu } from 'react-icons/gi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Anchor = 'left';

interface Reservation {
  id: number;
  customer: string;
  partner: string;
  taskObject: string;
}

export default function ProblematicReservationsListScreen() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [iconExpanded, setIconExpanded] = React.useState(false); // State variable for icon expansion
  const [reservations, setReservations] = React.useState<Reservation[]>([]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleIconClick = () => {
    setIconExpanded(!iconExpanded); // Toggle the state of icon expansion
    setState({ ...state, left: !state.left }); // Toggle the state of the drawer
  };

  const getProblematicReservations = async () => {
    try {
      // Make an API call to fetch the problematic reservations list
      const response = await fetch('/api/problematic-reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching problematic reservations:', error);
    }
  };

  React.useEffect(() => {
    getProblematicReservations();
  }, []);

  const table = (
    <TableContainer component={Paper} style={{ maxWidth: '1000px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Partner</TableCell>
            <TableCell>Task Object</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.customer}</TableCell>
              <TableCell>{reservation.partner}</TableCell>
              <TableCell>{reservation.taskObject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <br />
      <br />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={handleIconClick}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 9999,
            padding: '8px',
            transform: iconExpanded ? 'scale(1.2)' : 'scale(1)', // Scale the icon when expanded
            transition: 'transform 0.2s ease-in-out', // Add a transition effect
            color: state.left ? '#741188' : 'white', // Change the color of the icon when the drawer is open
          }}
        >
          <GiHamburgerMenu size={24} /> {/* Increase the size of the icon */}
        </Button>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10vh"
        marginTop="5rem" // Add margin-top to create space below the problematic reservations list
      >
        {table}
      </Box>
    </>
  );
}
