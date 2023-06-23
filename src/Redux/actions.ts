import axios from 'axios';
import { AppThunk, RootState } from './store';
import { persistStoreData } from './reducer';
import { ThunkAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';



export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

// ... rest of your actions


const FETCH_RESERVATION_START = "FETCH_RESERVATION_START";
const FETCH_RESERVATION_SUCCESS = "FETCH_RESERVATION_SUCCESS";
const FETCH_RESERVATION_FAILURE = "FETCH_RESERVATION_FAILURE";
export const handleResolve = createAsyncThunk(
  'reservation/handleResolve',
  async (payload: { reservationId: string, status: string, serviceTeamUserId: string, message: string }, { dispatch }) => {
    try {
      const res = await api.post('service/resolveProblematicReservation', payload);
      console.log('POST response:', res);  // <-- Log the entire response
      dispatch(setCurrentReservation(null)); // Reset currentReservation state after resolving
      return payload; // Return the payload
    } catch (error) {
      console.error('Failed to resolve reservation: ', error);
      throw error;
    }
  }
);


export const handleUnresolved = createAsyncThunk(
  'reservation/handleUnresolved',
  async (payload: { reservationId: string, status: string, serviceTeamUserId: string, message: string }, { dispatch }) => {
    try {
      const res = await api.post('service/resolveProblematicReservation', payload);
      console.log(res.data);
      dispatch(setCurrentReservation(null)); // Reset currentReservation state after resolving
    } catch (error) {
      console.error('Failed to resolve reservation: ', error);
      throw error;
    }
  }
);

export const getProblematicReservations = (page: number, pageSize: number): AppThunk => async (dispatch) => {
  try {
    const data = {
      startIndex: page * pageSize,
      count: pageSize
    };
    const res = await api.post('service/getProblematicReservations', data);

    dispatch({ type: 'SET_RESERVATIONS', payload: res.data });

    // Cache the data
    dispatch(persistStoreData(res.data));
  } catch (error) {
    console.error("Failed to fetch data: ", error);
  }
};



export const fetchReservation = (reservation) => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATION_START });

    axios.get(`https://wosh-test.herokuapp.com/api/reservation/${reservation}`)
      .then(res => {
        dispatch({ type: FETCH_RESERVATION_SUCCESS, payload: res.data });

        // Cache the data
        dispatch(persistStoreData(res.data));
      })
      .catch(err => {
        dispatch({ type: FETCH_RESERVATION_FAILURE, payload: err });
      });
  };
};

export const setCurrentReservation = (reservation: any): AppThunk => (dispatch) => {
  dispatch({
    type: 'SET_CURRENT_RESERVATION',
    payload: reservation
  });
};


