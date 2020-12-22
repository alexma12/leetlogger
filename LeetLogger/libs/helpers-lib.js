
const removeCaseAndSpaceSensitivty = (str) => {
    return str ? str.toLowerCase().trim() : null
}


const addCase = (str) => {
    if (str) {
        const strArr = str.split(" ");
        for (let i in strArr) {
            strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1);
        }
        return strArr.join(" ")
    }
    return null
}

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const convertEntryToDBStruct = (jsonData) => {
    const data = JSON.parse(jsonData);
    let tempTitle = removeCaseAndSpaceSensitivty(data.title);
    tempTitle = addCase(tempTitle);
    data["title"] = tempTitle;
    return data;
}
export const twoDaysAgo = () => {
    const today = Date.now();
    const twoDaysAgo = today - (2 * 24 * 60 * 60 * 1000)
    return twoDaysAgo;
}