const romanNumeralsMap = {
  ii: true,
  iii: true,
  iv: true,
  vi: true,
  vii: true,
  viii: true,
  ix: true,
};

export const capitalizeFirstCharacters = (string) => {
  if (!string) return "";
  const strArr = string.split(" ");
  const capitalizedStrArr = strArr.map((str) => {
    if (!str) return str;
    if (typeof romanNumeralsMap[str] !== "undefined") {
      return str.toUpperCase();
    }
    return str[0].toUpperCase() + str.substring(1);
  });
  const wordCount = capitalizedStrArr.length - 1;
  return capitalizedStrArr.reduce((returnString, curr, i) => {
    if (i !== wordCount) {
      return returnString + curr + " ";
    } else {
      return returnString + curr;
    }
  }, "");
};

export const lowercaseFirstCharacters = (string) => {
  if (!string) return "";
  const strArr = string.split(" ");
  const capitalizedStrArr = strArr.map((str) => {
    return str[0].toLowerCase() + str.substring(1);
  });
  const wordCount = capitalizedStrArr.length - 1;
  return capitalizedStrArr.reduce((returnString, curr, i) => {
    if (i !== wordCount) {
      return returnString + curr + " ";
    } else {
      return returnString + curr;
    }
  }, "");
};
