export const paginatedData = (data = [], maxItems) => {
  let dataCounter = 0;
  const dataMap = {};
  while (dataCounter < data.length) {
    let pageCounter = 1;
    while (pageCounter <= maxItems && dataCounter < data.length) {
      let page = Math.floor(dataCounter / maxItems) + 1;
      const dataObj = data[dataCounter];

      if (dataMap[page]) {
        dataMap[page].push(dataObj);
      } else {
        dataMap[page] = [dataObj];
      }
      pageCounter++;
      dataCounter++;
    }
  }
  return dataMap;
};
