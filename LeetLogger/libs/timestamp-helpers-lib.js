export const twoDaysAgo = () => {
    const today = Date.now();
    const twoDaysAgo = today - (2 * 24 * 60 * 60 * 1000)
    return twoDaysAgo;
}

const timeSpanToMs = (timeSpan) => {
    let ms;
    let day = 1000 * 60 * 60 * 24;
    switch (timeSpan) {
        case "day":
            ms = day
        case "week":
            ms = 7 * day
        case '2-weeks':
            ms = 14 * day
        case '3-weeks':
            ms = 21 * day
        case "4-weeks":
            ms = 28 * day
    }
    return ms
}

const calculateChangedRevisionDate = (timeSpan, revisionDate, postpone) => {
    const msToAdd = timeSpanToMs(timeSpan);
    let newDate;
    if (postpone) {
        newDate = new Date(revisionDate + msToAdd);
    } else {
        newDate = new Date(revisionDate - msToAdd);
    }
    newDate.setHours(0, 0, 0, 0);
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    return {
        newDate: newDate.getTime(),
        currDate: currDate.getTime()
    }
}

export const calculatePostponedRevisionDate = (timeSpan, revisionDate) => {
    const POSTPONE = true;
    const [newDate] = calculateChangedRevisionDate(timeSpan, revisionDate, POSTPONE);
    return newDate.getTime();
}

export const calculateExpeditedRevisionDate = (timeSpan, revisionDate) => {
    const EXPEDITE = false;
    const [newDate, currDate] = calculateChangedRevisionDate(timeSpan, revisionDate, EXPEDITE);
    let exceededCurrDay = false;
    let newRevisionDate = newDate.getTime()
    if (newDate < currDate) {
        newRevisionDate = currDate.getTime(),
        exceededCurrDay = true
    }
    return {
        revisionDate: newRevisionDate,
        exceededCurrDay: exceededCurrDay
    }
}

export const currentDateString = () => {
    return new Date().toDateString();
}
// export const getRevisionDate = (timeSpan) => {
//     const msToAdd = timeSpanToMs(timeSpan);
//     const revisonDate = new Date(Date.now() + msToAdd);
//     revisonDate.setHours(0,0,0,0);
//     return revisionDate.getTime();
// } 