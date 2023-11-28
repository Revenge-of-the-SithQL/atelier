const compareByFirstEntry = (a, b) => {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] === b[0]) {
    return 0;
  }
  if (a[0] > b[0]) {
    return 1;
  }
};

export default compareByFirstEntry;
