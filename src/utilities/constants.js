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
}

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {
  DATE_FORMAT,
  Mode,
  UserAction,
  UpdateType,
  FilterType,
  EndPoints,
  Method
};
