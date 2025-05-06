import { useEffect, useState } from "react";
import "../../styles/countdown.scss";

interface CountDownProps {
  targetDate: string;
}

const Countdown: React.FC<CountDownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div id="countdown-container">
      <div id="countdown-timer">
        <div className="countdown-days">
          <div className="countdown-numbers">{timeLeft.days}</div>
          days
        </div>
        <div className="countdown-hours">
          <div className="countdown-numbers">{timeLeft.hours}</div>
          hours
        </div>
        <div className="countdown-minutes">
          <div className="countdown-numbers">{timeLeft.minutes}</div>
          minutes
        </div>
        <div className="countdown-seconds">
          <div className="countdown-numbers">{timeLeft.seconds}</div>
          seconds
        </div>
      </div>
    </div>
  );
};
export default Countdown;
