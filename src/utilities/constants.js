const DATE_FORMAT = {
  monthDay: 'MMM D',
  dayMonth: 'D MMM',
  day: 'D',
  hours: 'HH:mm',
  date: 'DD/MM/YY HH:mm'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const EndPoints = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const EmptyListMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
  LOADING: 'Loading...',
  FAILD: 'Failed to load latest route information'
};

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic w43232344428hS23';

const SortingList = [
  {
    ID: 'day',
    TEXT: 'Day',
    DISABLED: false,
    DATA_SORT: 'DEFAULT'
  },
  {
    ID: 'event',
    TEXT: 'Event',
    DISABLED: true,
    DATA_SORT: ''
  },
  {
    ID: 'time',
    TEXT: 'Time',
    DISABLED: false,
    DATA_SORT: 'TIME'
  },
  {
    ID: 'price',
    TEXT: 'Price',
    DISABLED: false,
    DATA_SORT: 'PRICE'
  },
  {
    ID: 'offer',
    TEXT: 'Offers',
    DISABLED: true,
    DATA_SORT: ''
  },
]

export {
  DATE_FORMAT,
  Mode,
  UserAction,
  UpdateType,
  FilterType,
  EndPoints,
  Method,
  TimeLimit,
  EmptyListMessage,
  SortingList,
  END_POINT,
  AUTHORIZATION
};
