export const twoDaysAgo = () => {
    const today = Date.now();
    const twoDaysAgo = today - (2 * 24 * 60 * 60 * 1000)
    return twoDaysAgo;
}

const timeSpanToMs = (timeSpan) => {
    let ms;
    let day = (1000 * 60 * 60 * 24);
    switch (timeSpan) {
        case "day":
            ms = day
            break;
        case "week":
            ms = 7 * day
            break;
        case '2-weeks':
            ms = 14 * day
            break;
        case '3-weeks':
            ms = 21 * day
            break;
        case "4-weeks":
            ms = 28 * day
            break;
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
    return [newDate.getTime(), currDate.getTime()]
}

export const calculatePostponedRevisionDate = (timeSpan, revisionDate) => {
    const POSTPONE = true;
    const [newDate, currDate] = calculateChangedRevisionDate(timeSpan, revisionDate, POSTPONE);
    return newDate;
}

export const calculateExpeditedRevisionDate = (timeSpan, revisionDate) => {
    const EXPEDITE = false;
    const [newDate, currDate] = calculateChangedRevisionDate(timeSpan, revisionDate, EXPEDITE);
    let exceededCurrDay = false;
    let newRevisionDate = newDate
    if (newDate < currDate) {
        newRevisionDate = currDate,
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