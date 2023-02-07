import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./events/eventsSlice";
import { modalSlice } from "./modalWindow/modalSlice";
import { currentEventSlice } from "./currentEvent/currentEventSlice";

export const store = configureStore({
    reducer: {
        events: eventsSlice.reducer,
        currentEvent: currentEventSlice.reducer,
        modal: modalSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>