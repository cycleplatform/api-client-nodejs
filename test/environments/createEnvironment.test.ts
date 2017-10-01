import { assert } from "chai";
import { Environments } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";

interface TestParams {
    store: TestStore;
    schema: TJS.Definition | null;
}

export function testCreateEnvironment({ store, schema }: TestParams) {
    it("should create an environment", async () => {
        if (!schema) {
            throw new Error("Environment schema not generated");
        }

        const { state: { token }, updateActiveId } = store;
        const value: Environments.CreateParams = {
            name: "NodeApi Generated Environment",
            about: {
                description: "This environment was automatically generated during a unit test."
            }
        }

        const resp = await Environments.create({
            token,
            value,
            query: {},
            settings: {
                url: process.env.API_URL,
                project: process.env.PROJECT_ID,
            },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        if (!resp.value.data) {
            throw new Error("data field is empty");
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value.data, schema);
        assert.equal(resp.value.data.name, value.name);
        assert.equal(resp.value.data.about.description, value.about.description);

        updateActiveId("environment", resp.value.data.id);
    });
}
