import axios from 'axios';
import { AppThunk } from './store';


const FETCH_RESERVATION_START = "FETCH_RESERVATION_START";
 const FETCH_RESERVATION_SUCCESS = "FETCH_RESERVATION_SUCCESS";
 const FETCH_RESERVATION_FAILURE = "FETCH_RESERVATION_FAILURE";

export const getProblematicReservations = (page: number, pageSize: number): AppThunk => async (dispatch) => {
  try {
    const data = {
      startIndex: page * pageSize,
      count: pageSize
    };

    const res = await axios.post('https://wosh-test.herokuapp.com/api/service/getProblematicReservations', data);
    dispatch({ type: 'SET_RESERVATIONS', payload: res.data });
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
        })
        .catch(err => {
          dispatch({ type: FETCH_RESERVATION_FAILURE, payload: err });
        });
    };
  };
export const setCurrentReservation = (reservation:any): AppThunk => (dispatch) => {
  dispatch({
    type: 'SET_CURRENT_RESERVATION',
    payload: reservation
  });
};
