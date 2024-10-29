import Countdown from "react-countdown";

const CountdownTimer = ({
  targetDate,
  targetTime,
}: {
  targetDate: string;
  targetTime: string;
}) => {
  const targetDateTime = new Date(`${targetDate}T${targetTime}`);

  return (
    <Countdown
      date={targetDateTime}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <div className="text-green-600 font-semibold">Time's up!</div>;
        } else {
          return (
            <div className="text-red-600 font-semibold">
              {days}d {hours}h {minutes}m {seconds}s
            </div>
          );
        }
      }}
    />
  );
};

export { CountdownTimer };
