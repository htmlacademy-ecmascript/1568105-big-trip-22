const DATE_FORMAT = {
  monthDay: 'MMM D',
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

export {
  DATE_FORMAT,
  Mode,
  UserAction,
  UpdateType
};
