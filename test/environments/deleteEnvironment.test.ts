import { assert } from "chai";
import { Environments } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";

interface TestParams {
    store: TestStore;
    schema: TJS.Definition | null;
}

export function testDeleteEnvironment({ store, schema }: TestParams) {
    it("should delete the environment we created", async () => {
        const { token } = store.state;
        const resp = await Environments.remove({
            id: store.state.active.environment,
            token,
            query: {},
            settings: store.state.settings,
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        if (!resp.value.data) {
            throw new Error("data field is empty");
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value.data, schema);
    });
}
