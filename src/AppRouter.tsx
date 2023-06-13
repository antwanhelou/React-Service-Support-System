import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import ProblematicReservationsListScreen from './ProblematicReservationsListScreen';
import ReservationExpandedScreen from './ReservationExpandedScreen';
import React from 'react';

const AppRouter: FC = () => {
  return (
  
      <Routes>
      
        <Route path="/problematic-reservations" element={<ProblematicReservationsListScreen />} />
        <Route path="/reservation/:id" element={<ReservationExpandedScreen open={undefined} onClose={undefined} reservation={undefined}/>} />
      </Routes>
   
  );
};

export default AppRouter;
