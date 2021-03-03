export const alphabeticalSort = (data = []) => {
  const sortedData = {};
  console.log(data);
  data.forEach((item) => {
    const firstLetter = item.title.charAt(0).toLowerCase();
    console.log(firstLetter);
    if (sortedData[firstLetter]) {
      sortedData[firstLetter].push(item);
    } else {
      sortedData[firstLetter] = [item];
    }
  });
  return sortedData;
};
