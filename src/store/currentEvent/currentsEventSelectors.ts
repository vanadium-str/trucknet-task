import { RootState } from "..";

export const currentEventNameSelector = (state: RootState) => state.currentEvent.eventData.name;
export const currentEventStartTimeSelector = (state: RootState) => state.currentEvent.eventData.startTime;
export const currentEventEndTimeSelector = (state: RootState) => state.currentEvent.eventData.endTime;
export const currentEventSelector = (state: RootState) => state.currentEvent.eventData;