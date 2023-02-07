import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  setCurrentEventEndTime,
  setCurrentEventName,
  setCurrentEventStartTime,
} from '../../store/currentEvent/currentEventSlice';

interface InputEventProps {
  id: string;
  type: string;
  label: string;
  value: string;
}

function InputEvent({ id, type, label, value }: InputEventProps) {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (event: string) => {
    if (id === 'name') {
      dispatch(setCurrentEventName(event));
    } else if (id === 'timeStart') {
      dispatch(setCurrentEventStartTime(event));
    } else if (id === 'timeEnd') {
      dispatch(setCurrentEventEndTime(event));
    }
  };

  return (
    <div className="mb-5 min-h-80">
      {(value || isFocused) && 
        <label className="fontOutfit text-sm text-dark-gray font-light" htmlFor={id}>
          {label}
        </label>
      }

      <input
        type={type}
        id={id}
        placeholder={label}
        value={value}
        className="w-80 h-14 border-b border-solid border-custom-gray fontOutfit text-22 font-light text-dark-gray text-lg"
        onChange={(event) => handleInput(event.target.value)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </div>
  );
}

export default InputEvent;
