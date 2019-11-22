import { START_LOADING, STOP_LOADING } from "./actionTypes";


export const startLoading  = name => ({
  type: START_LOADING,
  payload: { name }
});

export const stopLoading = name => ({
  type: STOP_LOADING,
  payload: { name }
});