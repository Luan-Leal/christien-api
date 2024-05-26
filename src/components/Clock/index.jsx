import { useEffect, useState } from "react";
import "./index.css";

const Clock = () => {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  const updateClock = () => {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const daysOfWeek = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ];

    const monthsOfYear = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    const currentDay = `${dayOfWeek}, ${dayOfMonth} de ${month} de ${year}`;

    setTime(currentTime);
    setDay(currentDay);
  };

  useEffect(() => {
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relogio">
      <div className="clock">
        <span className="time">{time}</span>
        <span className="day">{day}</span>
      </div>
    </div>
  );
};

export default Clock;
