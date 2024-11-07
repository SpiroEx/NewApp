import { Timestamp } from "firebase/firestore";

export type MonthAbbrev =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export default abstract class DateHelper {
  static monthAbbrev: MonthAbbrev[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  static monthFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  static getMonthAbbrev(month: number): MonthAbbrev {
    return this.monthAbbrev[month];
  }

  static getLastMonthAbbrev<T extends { [key in MonthAbbrev]?: number }>(
    currentYear: T | null
  ): MonthAbbrev {
    if (currentYear === null) return "Jan";

    for (let i = 11; i >= 0; i--) {
      if (currentYear?.[this.monthAbbrev[i]] !== undefined) {
        return this.monthAbbrev[i];
      }
    }

    return "Jan";
  }

  static getPrevMonthAbbrev(month: MonthAbbrev): MonthAbbrev {
    return this.monthAbbrev[(this.monthAbbrev.indexOf(month) - 1 + 12) % 12];
  }

  static logsDate(timestamp: Timestamp) {
    const date = timestamp.toDate();

    const month = this.monthAbbrev[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert to 12-hour format

    return `${month} ${day}, ${year} - ${hour}:${minute < 10 ? "0" + minute : minute
      } ${period}`;
  }

  // 10/23/2024 - 10:43 PM
  static millisToDateStr(millis: number) {
    const date = new Date(millis);

    const month = this.monthAbbrev[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert to 12-hour format

    return `${month} ${day}, ${year} - ${hour}:${minute < 10 ? "0" + minute : minute
      } ${period}`;
  }

  static currentMillis() {
    return Date.now();
  }

  // 10/23/2024 - 20:43
  static epochMsToLogDate(epochMs: number) {
    return this.epochSecondsToLogDate(epochMs / 1000);
  }


  // 10/23/2024 - 20:43
  static epochSecondsToLogDate(epochSeconds: number) {
    if (epochSeconds === 0 || isNaN(epochSeconds)) return "N/A";
    const date = new Date(epochSeconds * 1000);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = String(date.getFullYear()).substring(2);

    let hour = date.getHours();
    const minute = date.getMinutes();
    // const period = hour >= 12 ? "PM" : "AM";
    // hour = hour % 12 || 12; // convert to 12-hour format

    return `${month < 10 ? "0" + month : month}/${day}/${year} ${hour}:${minute < 10 ? "0" + minute : minute
      }`;
  }
}
