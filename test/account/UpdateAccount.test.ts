import { assert } from "chai";
import { Account } from "../../src/";
import { AccessToken } from "../common";
import { AccountSchema } from "./AccountSchema";

export function testUpdateAccount() {
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

        const value = {
            name: {
                first: "Mike",
                last: "Wizowsky",
            },
        };

        const resp = await Account.update({
            token: AccessToken,
            query: {},
            value,
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
            value: revertUpdate,
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
}
