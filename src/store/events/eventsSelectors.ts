import { RootState } from "..";

export const allEventsSelector = (state: RootState) => state.events.data;
export const currentEventIdSelector = (state: RootState) => state.events.currentEventId;
export const addingEventSelector = (state: RootState) => state.events.addingEvent;