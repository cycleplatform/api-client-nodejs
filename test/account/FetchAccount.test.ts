import { assert } from "chai";
import { Account } from "../../src/";
import { AccessToken } from "../common";
import { AccountSchema } from "./AccountSchema";

export function testFetchUserAccount() {
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
}
