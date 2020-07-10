import { useState } from 'react';

//(1) take in an initial mode
export default function useVisualMode(initial) {
  //(1) set the mode state with the initial mode provided
  const [mode, setMode] = useState(initial);
  //(4)
  const [history, setHistory] = useState([initial]);
  //(2) create a transition function within useVisualMode that will take in a (newMode)
  //(7)replace mode in history with newMode passing an optional argument to transition(newMode, replace = false); replace has default setting so it is always defined
  const transition = (newMode, replace = false) => {
    //(7) if replace is true, set history to newMode
    if (replace) {
      //(7) if replace is false, remove last index value from history array, but not set mode to previous item
      history.pop();
    }
    //(2) update mode state with new value
    setMode(newMode);
    //(5) When transition is called, we need to add the new mode to our history
    setHistory([...history, newMode]);
  };
  //(3) add back() function that goes back to the previous mode
  const back = () => {
    //(6) back function should not allow the user to go back past the initial mode
    if (history.length > 1) {
      //(5) When back is called, we should set the mode to the previous item in our history array
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
