

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

// export const isEmptyObject = (obj) => {
//     return Object.keys(obj).length === 0 && obj.constructor === Object
// }

export const convertEntryToDBStruct = (jsonData) => {
    const data = jsonData;
    if(!data.title){
        return {};
    }
    let tempTitle = removeCaseAndSpaceSensitivty(data.title);
    tempTitle = addCase(tempTitle);
    data["title"] = tempTitle;
    return data;
}


export const generateNoteId = (userID, title, uuidString) => {
    const titleArr = title.split(" ");
    const titleStr = titleArr.join("-");
    return userID + "-" + titleStr + "-" + uuidString
}

export const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === JSON.stringify({});
}

export const convertArrayToString = (array) => {
    return array.join(", ")
}