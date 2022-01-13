export const alphabeticalSort = (data = []) => {
  const sortedData = {};
  data.forEach((item) => {
    const firstLetter = item.title.charAt(0).toLowerCase();
    if (sortedData[firstLetter]) {
      sortedData[firstLetter].push(item);
    } else {
      sortedData[firstLetter] = [item];
    }
  });
  return sortedData;
};
