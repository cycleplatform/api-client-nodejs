import { assert } from "chai";
import { Account, Auth } from "../../src/";
import * as TJS from "typescript-json-schema";

export function testFetchUserAccount(token: Auth.Token, schema: TJS.Definition | null) {
    it("should fetch user account", async () => {
        if (!schema) { 
            throw new Error("Account schema not generated");
        }
        const resp = await Account.getSingle({
            token,
            query: {},
            settings: { url: process.env.API_URL },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        assert.isTrue(resp.ok);
        assert.isObject(resp.value.data);
        assert.jsonSchema(resp.value.data, schema);
    });
}
