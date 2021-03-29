const schema = {
  properties: {
    body: {
      type: "object",
      properties: {
        revisionDate: {
          type: "number",
        },
      },
      required: ["revisionDate"],
    },
  },
  required: ["body"],
};

export default schema;
