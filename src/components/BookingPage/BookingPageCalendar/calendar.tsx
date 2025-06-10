import React, { useState } from "react";
import styles from "./calendar.module.scss";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const generateMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: (number | null)[] = [];

    // Пустые дни в начале месяца
    for (let i = 0; i < firstDayOffset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Пустые ячейки в конце месяца
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const monthData = generateMonthData(currentDate);

  const chunkIntoWeeks = (days: (number | null)[]) => {
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  const weeks = chunkIntoWeeks(monthData);

  const formatMonthTitle = (date: Date) => {
    const month = date.toLocaleString("ru-RU", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "prev" ? -1 : 1),
        1
      )
    );
  };

  const handleDayClick = (day: number | null) => {
    if (day) {
      const selected = new Date(currentDate);
      selected.setDate(day);
      onDateSelect(selected);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={() => navigateMonth("prev")}
        >
          &lt;
        </button>
        <p className={styles.monthTitle}>{formatMonthTitle(currentDate)}</p>
        <button
          className={styles.navButton}
          onClick={() => navigateMonth("next")}
        >
          &gt;
        </button>
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.weekdays}>
          {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.week}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`${styles.day} ${day === null ? styles.empty : ""} ${
                  dayIndex >= 5 ? styles.weekend : ""
                } ${
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                    ? styles.currentDay
                    : ""
                } ${
                  selectedDate &&
                  day === selectedDate.getDate() &&
                  currentDate.getMonth() === selectedDate.getMonth() &&
                  currentDate.getFullYear() === selectedDate.getFullYear()
                    ? styles.selectedDay
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
