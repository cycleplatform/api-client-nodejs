import { assert } from "chai";
import { Infrastructure } from "../../src/";

const DataCenterCollectionSchema = {
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
            location: {
                type: "object",
            },
            provider: {
                type: "object",
            },
            features: {
                type: "array",
            },
        },
        required: ["id", "name", "location", "provider", "features"],
    },
};

export function testDataCenters() {
    describe("Infrastructure DataCenters", () => {
        it("should get a list of infrastructure datacenters for Packet.net", async () => {
            const providerResp = await Infrastructure.Providers.getCollection({
                settings: { url: process.env.API_URL },
            });
            if (!providerResp.ok) {
                throw new Error(JSON.stringify(providerResp.error));
            }

            const packet = providerResp.value.data.find(
                p => p.name === "packet",
            );
            if (!packet) {
                throw new Error("Packet.net not in providers collection");
            }

            const resp = await Infrastructure.DataCenters.getCollection({
                provider: packet.id,
                settings: { url: process.env.API_URL },
            });

            if (!resp.ok) {
                throw new Error(JSON.stringify(resp.error));
            }

            assert.isTrue(resp.ok);
            assert.isArray(resp.value.data);
            assert.jsonSchema(resp.value.data, DataCenterCollectionSchema);
        });
    });
}
