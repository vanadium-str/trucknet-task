import { createSlice } from '@reduxjs/toolkit';
import { Event } from '../../interfaces/eventsInterfaces';

interface CurrentEventInitialState {
  eventData: Event;
}

const initialState: CurrentEventInitialState = {
  eventData: {
    id: -2,
    name: '',
    startTime: '',
    endTime: '',
  },
};

export const currentEventSlice = createSlice({
  name: 'currentEvent',
  initialState,
  reducers: {
    setCurrentEventName: (state, action) => {
      state.eventData.name = action.payload;
    },
    setCurrentEventStartTime: (state, action) => {
      state.eventData.startTime = action.payload;
    },
    setCurrentEventEndTime: (state, action) => {
      state.eventData.endTime = action.payload;
    },
    setCurrentEventId: (state, action) => {
      state.eventData.id = action.payload;
    },
    resetAll: () => {
        return initialState;
    },
  },
});

export const {
  setCurrentEventName,
  setCurrentEventStartTime,
  setCurrentEventEndTime,
  setCurrentEventId,
  resetAll
} = currentEventSlice.actions;

export default currentEventSlice.reducer;
