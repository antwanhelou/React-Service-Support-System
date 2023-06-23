import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';

const initialState = {
  reservations: [],
  currentReservation: null
};

const reservationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_RESERVATIONS':
      return { ...state, reservations: action.payload };
    case 'SET_CURRENT_RESERVATION':
      return { ...state, currentReservation: action.payload };
      case 'reservation/handleResolve/fulfilled':  // <-- Add this case
      return {
        ...state,
        reservations: state.reservations.filter(
          reservation => reservation.id !== action.payload.reservationId
        )
      };
    
    default:
      return state;
  }
};

const persistConfig = {
  key: 'reservation',
  storage,
};

const persistedReservationReducer = persistReducer(persistConfig, reservationReducer);

const rootReducer = combineReducers({
  reservation: persistedReservationReducer,
  auth: authReducer,
});

export default rootReducer;

export const persistStoreData = (data: any) => ({
  type: 'PERSIST_STORE_DATA',
  payload: data
});
