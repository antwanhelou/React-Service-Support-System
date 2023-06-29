import axios from "axios";
import { AppThunk, RootState } from "./store";
import { persistStoreData } from "./reducer";
import { ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const handleResolve = createAsyncThunk(
  "reservation/handleResolve",
  async (
    payload: {
      reservationId: string;
      status: string;
      serviceTeamUserId: string;
      message: string;
    },
    { dispatch }
  ) => {
    try {
      const res = await api.post(
        "service/resolveProblematicReservation",
        payload
      );
      console.log("POST response:", res); // <-- Log the entire response
      dispatch(setCurrentReservation(null)); // Reset currentReservation state after resolving
      return payload; // Return the payload
    } catch (error) {
      console.error("Failed to resolve reservation: ", error);
      throw error;
    }
  }
);

export const handleUnresolved = createAsyncThunk(
  "reservation/handleUnresolved",
  async (
    payload: {
      reservationId: string;
      status: string;
      serviceTeamUserId: string;
      message: string;
    },
    { dispatch }
  ) => {
    try {
      const res = await api.post(
        "service/resolveProblematicReservation",
        payload
      );
      console.log(res.data);
      dispatch(setCurrentReservation(null)); // Reset currentReservation state after resolving
    } catch (error) {
      console.error("Failed to resolve reservation: ", error);
      throw error;
    }
  }
);

export const getProblematicReservations = (
  page: number,
  pageSize: number
): AppThunk => async (dispatch) => {
  try {
    const data = {
      startIndex: page * pageSize,
      count: pageSize,
    };
    const res = await api.post("service/getProblematicReservations", data);

    dispatch({ type: "SET_RESERVATIONS", payload: res.data });

    // Cache the data
    dispatch(persistStoreData(res.data));
  } catch (error) {
    console.error("Failed to fetch data: ", error);
  }
};

export const fetchReservations = (
  searchTerm: string,
  page: number,
  pageSize: number
): AppThunk => async (dispatch) => {
  try {
    if (searchTerm) {
      const response = await api.post("service/searchReservations", {
        startIndex: 0,
        count: 8,
        freeText: searchTerm,
      });

      const filteredData = response.data.slice(0, 8);
      dispatch({ type: "SET_RESERVATIONS", payload: filteredData });
    } else {
      dispatch(getProblematicReservations(page, pageSize));
    }
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  }
};

export const setCurrentReservation = (reservation: any): AppThunk => (
  dispatch
) => {
  dispatch({
    type: "SET_CURRENT_RESERVATION",
    payload: reservation,
  });
};
