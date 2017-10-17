import { assert } from "chai";
import { Projects } from "../../src/";
import * as TJS from "typescript-json-schema";
import { getSchema } from "../tjs";

export function testFetchProjectCapabilities() {
    let schema: TJS.Definition | null;
    before(() => {
        schema = getSchema("resources/projects/Capability.ts", "CapabilityDoc");
    });

    it("should fetch project capabilities", async () => {
        if (!schema) {
            throw new Error("Capabilities schema not generated");
        }

        const resp = await Projects.getCapabilities({
            settings: { url: process.env.API_URL },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value, schema);
    });
}
