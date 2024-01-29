import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DATE_FORMAT } from './constants.js';
import { FilterType } from './constants.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';
const humanizeDuration = (value) => value.format(DATE_FORMAT.minsDuration);
const getDuration = (from, to) => {
  const HOURS_PER_DAY = 24;
  const MINS_PER_HOUR = 60;
  const MINS_PER_DAY = MINS_PER_HOUR * HOURS_PER_DAY;

  const TimeUnits = {
    MIN: 'minute',
    HOUR: 'hour',
    DAY: 'day'
  };

  const diffMins = dayjs(to).diff(dayjs(from), TimeUnits.MIN);
  const diffHours = dayjs(to).diff(dayjs(from), TimeUnits.HOUR);
  const diffDays = dayjs(to).diff(dayjs(from), TimeUnits.DAY);

  switch (true) {
    case (diffMins < MINS_PER_HOUR):
      return `${diffMins}M`;
    case (diffMins >= MINS_PER_HOUR && diffMins < MINS_PER_DAY):
      return `${diffHours}H ${diffMins - diffHours * MINS_PER_HOUR}M`;
    default:
      return `${diffDays}D ${diffHours - diffDays * HOURS_PER_DAY}H ${diffMins - diffHours * MINS_PER_HOUR}M`;
  }
};

const isPointFuture = (date) => date && dayjs(date).isAfter(dayjs().format());

const isPointPast = (date) => date && dayjs(date).isBefore(dayjs().format());

const isPointPastAndFuture = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore(dayjs().format()) && dayjs(dateTo).isSameOrAfter(dayjs().format());


const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPastAndFuture(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo)),
};


export { humanizeDate, humanizeDuration, getDuration, filter };
