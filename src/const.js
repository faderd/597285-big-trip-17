const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const ListEmptyMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const FilterTypes = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const SortTypes = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export {
  TYPES,
  ListEmptyMessages,
  FilterTypes,
  SortTypes,
};
