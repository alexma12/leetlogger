const schema = {
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        questionType: {
          type: "string",
        },
      },
      required: ["questionType"],
    },
  },
  required: ["queryStringParameters"],
};

export default schema;
