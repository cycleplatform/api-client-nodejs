import { assert } from "chai";
import { Infrastructure } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";
import { getSchema } from "../tjs";

interface TestParams {
    store: TestStore;
}

export function testFetchProviderDcs({ store }: TestParams) {
    let schema: TJS.Definition | null;
    before(() => {
        schema = getSchema(
            "resources/infrastructure/provider/DataCenter.ts",
            "DataCenter",
        );
    });

    it("should fetch provider datacenters", async () => {
        if (!schema) {
            throw new Error("DC schema not generated");
        }

        console.log(JSON.stringify(schema, null, 2));

        const { active: { provider } } = store.state;

        const resp = await Infrastructure.Providers.DataCenters.getCollection({
            provider,
            query: {},
            settings: { url: process.env.API_URL },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        assert.isTrue(resp.ok);
        resp.value.data.forEach(dc => assert.jsonSchema(dc, schema));
        // TODO change to collection schema validation once errors are resolved
        // assert.jsonSchema(resp.value.data, schema);
    });
}
