import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectId: 10245,
  apiData: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, apiData: action.payload };
    },
    incrementId: (state) => {
      return { ...state, objectId: state.objectId + 1 };
    },
    decrementId: (state) => {
      return { ...state, objectId: state.objectId - 1 };
    },
    enterCustomId: (state, action) => {
      return { ...state, objectId: action.payload };
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setData, incrementId, decrementId, enterCustomId, resetData } =
  dataSlice.actions;

// Thunk
export const fetchData = () => {
  const fetchDataThunk = async (dispatch, getState) => {
    let state = getState();
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`
    );
    const rData = await response.json();
    dispatch(setData(rData));
  };
  return fetchDataThunk;
};

export default dataSlice.reducer;
