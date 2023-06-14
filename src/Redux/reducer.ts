const initialState = {
    reservations: [],
    currentReservation: null
  };
  
const FETCH_RESERVATION_START = "FETCH_RESERVATION_START";
const FETCH_RESERVATION_SUCCESS = "FETCH_RESERVATION_SUCCESS";
const FETCH_RESERVATION_FAILURE = "FETCH_RESERVATION_FAILURE";
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RESERVATIONS':
        return { ...state, reservations: action.payload };
      case 'SET_CURRENT_RESERVATION':
        return { ...state, currentReservation: action.payload };
      default:
        return state;
    }
  };
  const initialState1 = {
    reservation: {},
    loading: false,
    error: null
  };
  
  export const reservationReducer = (state = initialState, action) => {
    switch(action.type) {
      case FETCH_RESERVATION_START:
        return { ...state, loading: true };
      case FETCH_RESERVATION_SUCCESS:
        return { ...state, loading: false, reservation: action.payload };
      case FETCH_RESERVATION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export default reducer;
  