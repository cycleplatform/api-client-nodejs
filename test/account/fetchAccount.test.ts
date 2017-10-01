import { assert } from "chai";
import { Account } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";

interface TestParams {
    store: TestStore;
    schema: TJS.Definition | null;
}

export function testFetchUserAccount({store, schema}: TestParams) {
    it("should fetch user account", async () => {
        if (!schema) { 
            throw new Error("Account schema not generated");
        }
        const { token } = store.state;

        const resp = await Account.getSingle({
            token,
            query: {},
            settings: { url: process.env.API_URL },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value.data, schema);
    });
}
