import { assert } from "chai";
import { Infrastructure } from "../../src/";

const ProviderCollectionSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: {
                type: "string",
            },
            name: {
                type: "string",
            },
            website: {
                type: "string",
            },
        },
        required: ["id", "name", "website"],
    },
};

export function testProviders() {
    describe("Infrastructure Providers", () => {
        it("should get a list of infrastructure providers", async () => {
            const resp = await Infrastructure.Providers.getCollection({
                settings: { url: process.env.API_URL },
            });
            if (!resp.ok) {
                throw new Error(JSON.stringify(resp.error));
            }

            assert.isTrue(resp.ok);
            assert.isArray(resp.value.data);
            assert.jsonSchema(resp.value.data, ProviderCollectionSchema);
        });
    });
}
