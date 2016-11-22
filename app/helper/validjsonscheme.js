module.exports = {

    postRating: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "taskid": {
                "type": "integer"
            },
            "value": {
                "type": "integer"
            },
            "comment": {
                "type": "string"
            }
        },
        "required": [
            "taskid",
            "value"
        ]
    },

    postTask: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "payment": {
                "type": "integer"
            },
            "position": {
                "type": "object",
                "properties": {
                    "latitude": {
                        "type": "number"
                    },
                    "longitude": {
                        "type": "number"
                    }
                },
                "required": [
                    "latitude",
                    "longitude"
                ]
            },
            "starts": {
                "type": "string"
            }
        },
        "required": [
            "name",
            "description",
            "payment",
            "position",
            "starts"
        ]
    },

    putTask: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "payment": {
                "type": "integer"
            },
            "position": {
                "type": "object",
                "properties": {
                    "latitude": {
                        "type": "number"
                    },
                    "longitude": {
                        "type": "number"
                    }
                },
                "required": [
                    "latitude",
                    "longitude"
                ]
            },
            "starts": {
                "type": "string"
            }
        }
    }

};