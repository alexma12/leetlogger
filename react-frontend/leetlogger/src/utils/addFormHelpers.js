import { titleToTypeMap } from "utils/titleAndTypeMaps";
export const validateValues = (formFields) => {
  const {
    url,
    completionHrs,
    completionMins,
    questionType,
    difficulty,
  } = formFields;

  if (!url.includes("leetcode.com/problems")) {
    return `The Url Must Be Entered In The Form: "leetcode.com/problems/{title}" `;
  }

  if (difficulty === "") {
    return "The Question Difficulty Must Be Specified";
  }

  if (questionType === "") {
    return "The Question Type Must Be Specified";
  }

  if (
    completionHrs === null ||
    completionHrs === "" ||
    completionMins === null ||
    completionMins === ""
  ) {
    return "Please Enter A Valid Completion Time";
  }

  return true;
};

export const formatEntryBody = (formFields, content = "") => {
  let {
    url,
    solved,
    completionHrs,
    completionMins,
    reviewLater,
    reviewDate,
    title,
    questionType,
    tags,
    difficulty,
  } = formFields;

  if (!reviewLater) {
    reviewDate = -1;
  } else {
    reviewDate = new Date(reviewDate).getTime();
  }

  tags = tags.map(({ title }) => title);

  if (!url.includes("https://")) {
    url = "https://" + url.trim();
  }
  const formattedEntry = {
    url,
    title: title.trim(),
    tags: tags,
    revisionDate: reviewDate,
    approxCompletionMins: Number(completionMins),
    approxCompletionHrs: Number(completionHrs),
    solvedWithSolution: solved,
    difficulty: difficulty.toLowerCase(),
    questionType: titleToTypeMap[questionType],
    content,
  };

  return formattedEntry;
};
