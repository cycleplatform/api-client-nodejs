import { assert } from "chai";
import { Account } from "../../src/";
import { AccessToken } from "../common";

const AccountSchema = {
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
        email: {$ref: "#/definitions/email"},
        temp: { type: "boolean" },
    },
};

export function testAccount() {
    describe("Account", () => {
        it("should fetch user account", async () => {
            const resp = await Account.getSingle(AccessToken, {}, { url: process.env.API_URL });
            if (!resp.ok) {
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.isObject(resp.value.data);
            assert.jsonSchema(resp.value.data, AccountSchema);
        });
    });
}
