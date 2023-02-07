import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsOpenModal } from '../../store/modalWindow/modalSlice';
import {
  currentEventEndTimeSelector,
  currentEventNameSelector,
  currentEventSelector,
  currentEventStartTimeSelector,
} from '../../store/currentEvent/currentsEventSelectors';
import { createEvent, editEvent, isAddingEvent } from '../../store/events/eventsSlice';
import { resetAll, setCurrentEventId } from '../../store/currentEvent/currentEventSlice';
import {
  addingEventSelector,
  allEventsSelector,
  currentEventIdSelector,
} from '../../store/events/eventsSelectors';

interface ButtonEventProps {
  openModal: boolean;
  setWrongData?: React.Dispatch<React.SetStateAction<string>>;
}

function ButtonEvent({ openModal, setWrongData }: ButtonEventProps) {
  const dispatch = useDispatch();
  const addingEvent = useSelector(addingEventSelector);
  const allEvents = useSelector(allEventsSelector);
  const currentEventId = useSelector(currentEventIdSelector);
  const name = useSelector(currentEventNameSelector);
  const startTime = useSelector(currentEventStartTimeSelector);
  const endTime = useSelector(currentEventEndTimeSelector);
  const currentEvent = useSelector(currentEventSelector);

  useEffect(() => {
    if (setWrongData) {
      setWrongData('');
    }
    dispatch(
      setCurrentEventId(addingEvent ? Math.floor((1 + Math.random()) * 0x10000) : currentEventId)
    );
  }, [currentEventId, addingEvent]);

  const openingModal = () => {
    dispatch(isAddingEvent(true));
    dispatch(setIsOpenModal(true));
  };

  const closeModal = () => {
    dispatch(setIsOpenModal(false));
    dispatch(isAddingEvent(false));
    dispatch(resetAll());
  };

  const checkBookedTime = (): boolean => {
    const enteredStart = new Date(startTime);
    const enteredEnd = new Date(endTime);
    let result = true;

    allEvents.forEach((event) => {
      let start = new Date(event.startTime)
      let end = new Date(event.endTime)

      if (start < enteredEnd && enteredStart < end) {
        setWrongData ? setWrongData('This time is already booked') : <></>
        result = false;
      } else if (enteredStart > enteredEnd) {
        setWrongData ? setWrongData('Please enter correct date') : <></>
        result = false
      }
    })
    return result
  }

  return (
    <button
      className={`w-136 h-11 uppercase fontRubik rounded-lg px-4 py-2 text-sm font-medium ${
        !openModal && (!name || !startTime || !endTime)
          ? 'bg-light-gray text-disabled-font'
          : 'bg-custom text-white'
      }`}
      disabled={!openModal && (!name || !startTime || !endTime)}
      onClick={() => {
        if (openModal) {
          openingModal();
        } else if (addingEvent && checkBookedTime()) {
          dispatch(createEvent(currentEvent));
          closeModal();
        } else {
          allEvents.forEach((event, index) => {
            if (event.id === currentEventId) {
              dispatch(editEvent({ index: index, data: currentEvent }));
              closeModal();
            }
          });
        }
      }}
    >
      {addingEvent || openModal ? 'Create event' : 'Save event'}
    </button>
  );
}

export default ButtonEvent;
