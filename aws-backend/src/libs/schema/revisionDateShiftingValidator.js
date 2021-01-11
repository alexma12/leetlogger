const schema = { 
    properties: { 
        body: {
            type: "object",
            properties: {
                timeDelay: { 
                    type: "string",
                },
                revisionDate: {
                    type: "number"
                }

            },
            required: [
                "timeDelay", "revisionDate"
            ]
        },
    },
    required: [
        "body"
    ]
}

export default schema;