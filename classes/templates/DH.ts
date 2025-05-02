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

export default abstract class DH {
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

  static dateAlarmFromTime(hour: number, minute: number, meridian: "AM" | "PM") {
    const date = new Date();
    date.setHours(meridian === "PM" ? hour + 12 : hour, minute, 0, 0);

    if (date < new Date()) {
      date.setDate(date.getDate() + 1); // Set to next day if time is in the past
    }

    return date;
  }

  // 10/23/2024 - 10:43 PM
  static format(inp?: number | string | Date | Timestamp): string {
    let date: Date;

    if (inp === undefined) {
      date = new Date();
    } else if (typeof inp === "number" || typeof inp === "string") {
      date = new Date(inp);
    } else if (inp instanceof Date) {
      date = inp;
    } else if ("toDate" in inp && typeof inp.toDate === "function") {
      date = inp.toDate();
    } else {
      throw new Error("Invalid input type");
    }

    const month = this.monthAbbrev[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert to 12-hour format

    return `${month} ${day}, ${year} - ${hour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  }

  static currentMillis() {
    return Date.now();
  }

  // 20:43
  static militaryTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
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
