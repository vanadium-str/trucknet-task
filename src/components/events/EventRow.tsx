import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Event } from '../../interfaces/eventsInterfaces';
import { useDispatch } from 'react-redux';
import { setIsOpenModal } from '../../store/modalWindow/modalSlice';
import { setEventId } from '../../store/events/eventsSlice';
import { formattingDate } from '../../utils/functions';

interface EventRowProps {
  event: Event;
}

function EventRow({ event }: EventRowProps) {
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell align="center">{event.name}</TableCell>
      <TableCell align="center">{formattingDate(event.startTime)}</TableCell>
      <TableCell align="center">{formattingDate(event.endTime)}</TableCell>
      <TableCell align="center">
        <button
          className="w-20 h-9 bg-custom text-white uppercase fontRubik rounded-lg px-4 py-2 text-sm font-medium"
          onClick={() => {
            dispatch(setEventId(event.id));
            dispatch(setIsOpenModal(true));
          }}
        >
          Edit
        </button>
      </TableCell>
    </TableRow>
  );
}

export default EventRow;
