import moment from "moment";

export const convertDateToNumber = (year: number, month: number, date: number, hour: number = 0, minute: number = 0): number => {
    const monthCurrent = month - 1;
    return Date.parse(moment(new Date(year, monthCurrent, date, hour, minute)).format(`YYYY/MM/DD hh:mm a`));
}

export const isLeap = (year: number) => {
    return new Date(year, 1, 29).getDate() === 29;
}