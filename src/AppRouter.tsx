import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import ProblematicReservationsListScreen from './ProblematicReservationsListScreen';
import ReservationExpandedScreen from './ReservationExpandedScreen';
import React from 'react';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
  
        <Route path="/problematic-reservations" element={<ProblematicReservationsListScreen />} />
        <Route path="/reservation" element={<ReservationExpandedScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
