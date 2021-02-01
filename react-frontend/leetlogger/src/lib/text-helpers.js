export const capitalizeFirstCharacters = (string) => {
    const strArr = string.split(" ");
    const capitalizedStrArr = strArr.map(str => {
        return str[0].toUpperCase() + str.substring(1);
    })
    const wordCount = capitalizedStrArr.length - 1;
    return capitalizedStrArr.reduce((returnString, curr, i) => {
        if(i !== wordCount){
           return returnString + curr + " ";
        } else {
           return returnString + curr;
        }}, "");
}