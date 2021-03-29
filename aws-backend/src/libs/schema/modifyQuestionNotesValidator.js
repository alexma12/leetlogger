const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        noteID: {
          type: "string",
        },
        content: {
          type: "string",
        },
        title: {
          type: "string",
        },
        action: {
          type: "string",
        },
        questionID: {
          type: "string",
        },
      },
      required: ["noteID", "content", "title", "action", "questionID"],
    },
  },
  required: ["body"],
};

export default schema;
