const schema = { 
    properties: { 
        queryStringParameters: {
            type: "object",
            properties: {
                title: { 
                    type: "string",
                }
            },
            required: [
                "title"
            ]
        },
    },
    required: [
        "queryStringParameters"
    ]
}

export default schema;