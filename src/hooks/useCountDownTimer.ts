import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function useCountDownTimer(targetTime: string) {
  const [remainingTime, setRemaingTime] = useState('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = dayjs();
      const targetDate = dayjs(targetTime);
      const durationtime = dayjs.duration(targetDate.diff(currentTime));

      const days = String(durationtime.days()).padStart(2, '0');
      const hours = String(durationtime.hours()).padStart(2, '0');
      const minutes = String(durationtime.minutes()).padStart(2, '0');
      const seconds = String(durationtime.seconds()).padStart(2, '0');

      setRemaingTime(`${hours}: ${minutes}: ${seconds}`);
    };

    const intervalId = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return {
    remainingTime,
  };
}
