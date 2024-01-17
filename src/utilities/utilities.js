import dayjs from "dayjs";

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

export { humanizeDate }
