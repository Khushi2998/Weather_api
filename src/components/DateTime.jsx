import { useState, useEffect } from "react";

export default function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Format date and time
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = dateTime.toLocaleDateString(undefined, options);
  const formattedTime = dateTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
      <span className="date-time">
      {formattedDate} | {formattedTime}
    </span>
  );
}
