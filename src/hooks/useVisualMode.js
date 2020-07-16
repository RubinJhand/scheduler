import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      const prevHistory = history.slice(0, -1);
      setHistory(prevHistory);
      setMode(prevHistory[prevHistory.length - 1]);
    }
  };
  return { mode, transition, back };
}
