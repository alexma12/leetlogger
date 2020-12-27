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
                revisionDate: {
                    type: "number"
                },
                difficulty: {
                    type: "string"
                }
            },
            required: [
                "title", "questionType", "revisionDate", "difficulty"
            ]
        },
        required: [
            "body"
        ]
    }
}

export default schema;