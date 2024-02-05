import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function generateDayTimeList(date: Date) {
  const startTime = setMinutes(setHours(date, 9), 0);
  const endTime = setMinutes(setHours(date, 19), 0);
  const interval = 60;
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}

export function convertMinutesToHours(value: number) {
  const minutes = value % 60;
  const hours = Math.floor(value / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}