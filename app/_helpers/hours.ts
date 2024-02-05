import { addMinutes, format, setMinutes } from "date-fns";

type GenerateDayTimeListParams = {
  date: Date;
  hourStart: number;
  hourEnd: number;
};

export function generateDayTimeList({ date, hourEnd, hourStart }: GenerateDayTimeListParams) {
  const startTime = setMinutes(date, hourStart);
  const endTime = setMinutes(date, hourEnd - 60);
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