
import { useEffect, useState } from "react";

interface TimerProps {
  minutes: number;
}

const Timer = ({ minutes }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to get the saved timer value from sessionStorage
    const savedTime = sessionStorage.getItem('timerValue');
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      // Validate the saved time to ensure it's sensible
      if (!isNaN(parsedTime) && parsedTime > 0 && parsedTime <= minutes * 60) {
        return parsedTime;
      }
    }
    return minutes * 60; // Default to full time if no valid saved time
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        // Save the current timer value to sessionStorage
        sessionStorage.setItem('timerValue', newValue.toString());
        return newValue;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center my-6">
      <p className="text-sm text-red-700 mb-1">Limited Time Offer</p>
      <div className="text-xl font-bold text-red-700">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Timer;
