import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventRow from './EventRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { allEventsSelector } from '../../store/events/eventsSelectors';
import ButtonEvent from '../buttons/ButtonEvent';

function Events() {
  const allEvents = useSelector(allEventsSelector);
  const [date, setDate] = useState(new Date().toString());
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  useEffect(() => {
    let filterResult = allEvents.filter((item) => {
      let eventDate = new Date(item.startTime);
      let enteredDate = new Date(date);
      if (
        enteredDate.getDate() === eventDate.getDate() &&
        enteredDate.getMonth() === eventDate.getMonth() &&
        enteredDate.getFullYear() === eventDate.getFullYear()
      ) {
        return true;
      }
    });

    setFilteredEvents(
      filterResult.length ? filterResult.sort((a, b) => (a.startTime > b.startTime ? 1 : -1)) : []
    );
  }, [date, allEvents]);

  return (
    <div className="my-5 mx-10">
      <div className="flex items-center justify-between mb-5">
        <ButtonEvent openModal={true} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Choose the date"
            value={date}
            onChange={(value) => {
              if (value) {
                setDate(value.toString());
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {filteredEvents.length ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={1}>
                  Name
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Time start
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Time end
                </TableCell>
                <TableCell align="center" colSpan={1} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.map((event) => {
                return <EventRow key={event.id} event={event} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="fontOutfit flex justify-center mt-10">You have no events for this date</div>
      )}
    </div>
  );
}

export default Events;
