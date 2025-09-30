const gameConfig = {
  4: {
    small: 1,
    large: 1,
  },
  5: {
    small: 1,
    large: 2,
  },
  6: {
    small: 2,
    large: 2,
  },
};

const shipsConfig = {
  small: {
    units: 2,
    shape: "🟠",
  },
  large: {
    units: 3,
    shape: "🔵",
  },
  empty: {
    units: 0,
    shape: "❗",
  },
};

module.exports = { gameConfig, shipsConfig };
