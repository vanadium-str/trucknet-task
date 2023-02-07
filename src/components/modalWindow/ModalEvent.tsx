import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isOpenModalSelector } from '../../store/modalWindow/modalSelectors';
import { setIsOpenModal } from '../../store/modalWindow/modalSlice';
import { SVGClose } from '../../assets/svg/SVGClose';
import InputEvent from '../inputs/InputEvent';
import { resetAll } from '../../store/currentEvent/currentEventSlice';
import { deleteEvent, isAddingEvent } from '../../store/events/eventsSlice';
import {
  addingEventSelector,
  allEventsSelector,
  currentEventIdSelector,
} from '../../store/events/eventsSelectors';
import {
  setCurrentEventName,
  setCurrentEventStartTime,
  setCurrentEventEndTime,
} from '../../store/currentEvent/currentEventSlice';
import {
  currentEventEndTimeSelector,
  currentEventNameSelector,
  currentEventStartTimeSelector,
} from '../../store/currentEvent/currentsEventSelectors';
import ButtonEvent from '../buttons/ButtonEvent';

function ModalEvent() {
  const [wrongData, setWrongData] = useState('');
  const active = useSelector(isOpenModalSelector);
  const addingEvent = useSelector(addingEventSelector);
  const eventId = useSelector(currentEventIdSelector);
  const allEvents = useSelector(allEventsSelector);
  const name = useSelector(currentEventNameSelector);
  const startTime = useSelector(currentEventStartTimeSelector);
  const endTime = useSelector(currentEventEndTimeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    let filteredData = allEvents.find((event) => event.id === eventId);
    if (filteredData) {
      dispatch(setCurrentEventName(filteredData.name));
      dispatch(setCurrentEventStartTime(filteredData.startTime));
      dispatch(setCurrentEventEndTime(filteredData.endTime));
    }
  }, [eventId]);

  const closeModal = () => {
    dispatch(setIsOpenModal(false));
    dispatch(isAddingEvent(false));
    dispatch(resetAll());
  };

  return (
    <div className={`modal ${active ? 'active' : ''}`} onClick={closeModal}>
      <div
        className={`modalContent ${active ? 'active' : ''} `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-solid border-light-gray px-10 py-4">
          <div className="fontOutfit text-22">{addingEvent ? 'New Event' : name}</div>
          <div className="cursor-pointer" onClick={closeModal}>
            <SVGClose />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center my-4 mx-10">
          <InputEvent id={'name'} type={'text'} label={'Name of event'} value={name} />
          <InputEvent
            id={'timeStart'}
            type={'datetime-local'}
            label={'Start time'}
            value={startTime}
          />
          <InputEvent id={'timeEnd'} type={'datetime-local'} label={'End time'} value={endTime} />
        </div>
        {wrongData ? (
          <div className="text-red-500 flex justify-center -mt-3 mb-3">{wrongData}</div>
        ) : (
          <></>
        )}

        <div className="mx-10 flex justify-end">
          {!addingEvent && (
            <button
              className="mr-5 w-136 h-11 uppercase fontRubik rounded-lg px-4 py-2 text-sm font-medium bg-light-gray hover:text-red-500"
              onClick={() => {
                allEvents.forEach((event, index) => {
                  if (event.id === eventId) {
                    dispatch(deleteEvent(index));
                  }
                });
                closeModal();
              }}
            >
              Delete Event
            </button>
          )}
          <ButtonEvent openModal={false} setWrongData={setWrongData} />
        </div>
      </div>
    </div>
  );
}

export default ModalEvent;
