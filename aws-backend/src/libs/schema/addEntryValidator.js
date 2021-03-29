const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        questionType: {
          type: "string",
        },
        tags: {
          type: "array",
        },
        approxCompletionMins: {
          type: "number",
        },
        approxCompletionHrs: {
          type: "number",
        },
        difficulty: {
          type: "string",
        },
        content: {
          type: "string",
        },
        url: {
          type: "string",
        },
        revisionDate: {
          type: "number",
        },
        solvedWithSolution: {
          type: "boolean",
        },
      },
      required: [
        "title",
        "questionType",
        "approxCompletionMins",
        "approxCompletionHrs",
        "url",
        "difficulty",
        "content",
        "revisionDate",
        "solvedWithSolution",
      ],
    },
  },
  required: ["body"],
};

export default schema;
