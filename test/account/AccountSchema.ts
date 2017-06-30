export const AccountSchema = {
    title: "Account",
    type: "object",
    definitions: {
        name: {
            type: "object",
            properties: {
                first: { type: "string" },
                last: { type: "string" },
            },
        },
        email: {
            type: "object",
            properties: {
                address: { type: "string" },
                verified: { type: "boolean" },
            },
        },
    },
    properties: {
        id: { type: "string" },
        name: { $ref: "#/definitions/name" },
        email: { $ref: "#/definitions/email" },
        temp: { type: "boolean" },
    },
};
