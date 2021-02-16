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
        difficulty: {
          type: "string",
        },
        content: {
          type: "string",
        },
      },
      required: [
        "title",
        "questionType",
        "approxCompletionMins",
        "difficulty",
        "content",
      ],
    },
  },
  required: ["body"],
};

export default schema;
