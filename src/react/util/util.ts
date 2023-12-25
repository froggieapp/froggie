import { toast } from "react-toastify";
import { StoreEvent } from "../store/createEventStore";

export const showError = (msg: string) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showInfo = (msg: string) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

let id = 0;
export const getUniqueId = () => {
  return (id++).toString();
};

export const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

export const getAPIErrorForKick = async (res: Response, defaultMsg: string) => {
  let msg = defaultMsg;
  try {
    msg = (await res.json())?.status?.message || defaultMsg;
  } catch {
    /* avoid throwing here */
  }
  return msg;
};

export const getFirstUntouchedMessage = (events: StoreEvent[], content: string) => {
  const eventCount = events.length - 1;
  for (let i = eventCount; i >= 0; i -= 1) {
    const event = events[i];
    if (event.type === "MESSAGE" && event.isOptimistic && !event.isTouched && event.content === content) {
      return event.id;
    }
  }
  return null;
};

export const splitArrayInChunks = <T>(arr: T[], chunkSize: number) => {
  const res: T[][] = new Array(Math.ceil(arr.length / chunkSize));
  for (let i = 0; i < res.length; i += 1) {
    res[i] = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
  }
  return res;
};

export const sanitizeRegex = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
