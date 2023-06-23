import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ProblematicReservationsListScreen from './components/ProblematicReservationsListScreen';
import ReservationExpandedScreen from './components/ReservationExpandedScreen';
import React from 'react';
import Error404 from './components/Error404';

const AppRouter: FC = () => {
  return (
  
      <Routes>
      
        <Route path="/problematic-reservations" element={<ProblematicReservationsListScreen onLogout={undefined} />} />
        <Route path="/reservation/:id" element={<ReservationExpandedScreen open={undefined} onClose={undefined} reservation={undefined}/>} />
      </Routes>
   
  );
};

export default AppRouter;
