import { createSlice } from '@reduxjs/toolkit';
import { Event } from '../../interfaces/eventsInterfaces';

interface EventsInitialState {
  currentEventId: number;
  data: Event[];
  addingEvent: boolean;
}

const initialState: EventsInitialState = {
  currentEventId: -1,
  data: [
    {
      id: 1,
      name: 'Dinning Chair',
      startTime: '2023-02-05T12:00',
      endTime: '2023-02-05T13:00',
    },
    {
      id: 2,
      name: 'Dinning Table',
      startTime: '2023-02-03T13:00',
      endTime: '2023-02-03T17:00',
    },
  ],
  addingEvent: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.data.unshift(action.payload);
    },
    deleteEvent: (state, action) => {
      state.data.splice(action.payload, 1);
      state.currentEventId = -1;
    },
    editEvent: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    isAddingEvent: (state, action) => {
      state.addingEvent = action.payload;
      state.currentEventId = -1;
    },
    setEventId: (state, action) => {
      state.currentEventId = action.payload;
    },
  },
});

export const { createEvent, deleteEvent, editEvent, isAddingEvent, setEventId } =
  eventsSlice.actions;

export default eventsSlice.reducer;
