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
            <div className="text-secondary-700 font-semibold bg-white p-1 rounded-md text-center">
              {days ? `${days}d ` : ""}
              {hours || days ? `${hours}h ` : ""}
              {minutes || hours || days ? `${minutes}m ` : ""}
              {seconds || minutes || hours || days ? `${seconds}s` : ""}
            </div>
          );
        }
      }}
    />
  );
};

export { CountdownTimer };
