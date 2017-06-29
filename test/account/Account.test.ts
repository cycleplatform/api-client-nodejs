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
        email: { $ref: "#/definitions/email" },
        temp: { type: "boolean" },
    },
};

export function testAccount() {
    describe("Account", () => {
        it("should fetch user account", async () => {
            const resp = await Account.getSingle({
                token: AccessToken,
                query: {},
                settings: { url: process.env.API_URL },
            });

            if (!resp.ok) {
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.isObject(resp.value.data);
            assert.jsonSchema(resp.value.data, AccountSchema);
        });

        it("should update account info", async () => {
            const originalResp = await Account.getSingle({
                token: AccessToken,
                settings: { url: process.env.API_URL },
            });
            if (!originalResp.ok) {
                throw new Error(originalResp.error.title);
            }
            if (!originalResp.value.data) {
                throw new Error("data field is null");
            }

            const update = {
                name: {
                    first: "Mike",
                    last: "Wizowsky",
                },
            };

            const resp = await Account.update({
                token: AccessToken,
                query: {},
                update,
                settings: { url: process.env.API_URL },
            });
            if (!resp.ok) {
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.isObject(resp.value.data);
            assert.jsonSchema(resp.value.data, AccountSchema);
            assert.deepPropertyVal(resp.value.data, "name.first", "Mike");
            assert.deepPropertyVal(resp.value.data, "name.last", "Wizowsky");

            const revertUpdate = { name: originalResp.value.data.name };

            const revertResp = await Account.update({
                token: AccessToken,
                query: {},
                update,
                settings: { url: process.env.API_URL },
            });
            if (!revertResp.ok) {
                throw new Error(revertResp.error.title);
            }

            assert.deepPropertyVal(
                resp.value.data,
                "name.first",
                revertUpdate.name.first,
            );
            assert.deepPropertyVal(
                resp.value.data,
                "name.last",
                revertUpdate.name.last,
            );
        });
    });
}
