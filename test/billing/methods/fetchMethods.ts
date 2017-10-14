import { assert } from "chai";
import { Billing } from "../../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../../TestStore";
import { getSchema } from "../../tjs";

interface TestParams {
    store: TestStore;
}

export function testFetchMethods({ store }: TestParams) {
    let schema: TJS.Definition | null;
    before(() => {
        schema = getSchema("resources/billing/Method.ts", "Collection");
    });

    it("should fetch payment methods", async () => {
        if (!schema) {
            throw new Error("Method schema not generated");
        }

        const { state: { token } } = store;

        const resp = await Billing.Methods.getCollection({
            token,
            query: {},
            settings: {
                url: process.env.API_URL || "",
                project: process.env.PROJECT_ID || "",
            },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        if (!resp.value.data) {
            throw new Error("data field is empty");
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value, schema);
    });
}
