const schema = {
    properties: { 
        body: { 
            type: "object",
            properties: { 
                title: {
                    type: "string",
                },
                questionType: {
                    type: "array"
                },
                tags: { 
                    type: "array"
                },
                approxCompletionMins: {
                    type: "number"
                },
                difficulty: {
                    type: "string"
                }
            },
            required: [
                "title", "questionType", "approxCompletionMins", "difficulty"
            ]
        },
        required: [
            "body"
        ]
    }
}

export default schema;