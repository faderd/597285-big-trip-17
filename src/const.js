const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const ListEmptyMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const FilterTypes = {
  DEFAULT: 'everything',
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const SortTypes = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserActions = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export {
  TYPES,
  ListEmptyMessages,
  FilterTypes,
  SortTypes,
  UpdateTypes,
  UserActions,
};
