const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomUniqueArray = (array) => {
  const newArrayLength = getRandomInteger(1, array.length);
  const copyArray = array.slice();

  return new Array(newArrayLength).fill(undefined).map(() => {
    const elementIndex = getRandomInteger(0, copyArray.length - 1);
    const element = copyArray[elementIndex];
    copyArray.splice(elementIndex, 1);
    return element;
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1),];
};

export {
  getRandomInteger,
  getRandomUniqueArray,
  isEscapeKey,
  updateItem,
};
