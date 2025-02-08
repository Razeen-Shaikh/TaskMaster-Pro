import { useEffect, useRef, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  getYear,
  getMonth,
  isBefore,
} from "date-fns";
import { addDays } from "date-fns";
import { formatDisplayDate } from "../utils/helper";
import "./styles/Calendar.css";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const YEARS = Array.from({ length: 10 }, (_, i) => getYear(new Date()) - 5 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2000, i, 1), "MMMM")
);

interface CalendarPopupProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({
  selectedDate,
  onSelect,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setIsOpen(!isOpen);
  const handleDateSelect = (date: Date) => {
    setIsOpen(false);
    onSelect(date);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-popup" ref={dropdownRef}>
      <div className="flex-row align-center">
        <button className={className} onClick={togglePopup}>
          {children}
        </button>

        <p>{selectedDate && formatDisplayDate(new Date(selectedDate))}</p>
      </div>

      {isOpen && (
        <div className="popup-content">
          <Calendar
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            onSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

interface CalendarProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  onSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  setCurrentMonth,
  onSelect,
  selectedDate,
}) => {
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(startDate, { weekStartsOn: 1 });
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfWeek,
    end: endDate,
  });

  return (
    <div className="calendar-container">
      <div className="calendar-header flex-row justify-center align-center">
        <select
          value={MONTHS[getMonth(currentMonth)]}
          onChange={(e) =>
            setCurrentMonth(
              new Date(getYear(currentMonth), MONTHS.indexOf(e.target.value), 1)
            )
          }
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={getYear(currentMonth)}
          onChange={(e) =>
            setCurrentMonth(
              new Date(Number(e.target.value), getMonth(currentMonth), 1)
            )
          }
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="weekdays-row">
        {WEEKDAYS.map((day) => (
          <span key={day} className="weekday">
            {day}
          </span>
        ))}
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <button
            key={day.toString()}
            className={`day-button ${
              selectedDate &&
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? "selected"
                : ""
            }`}
            onClick={() => onSelect(day)}
            disabled={isBefore(day, addDays(new Date(), -1))}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};
