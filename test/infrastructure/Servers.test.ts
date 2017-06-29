import { assert } from "chai";
import { Infrastructure } from "../../src/";

const ServerCollectionSchema = {
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
            description: {
                type: "string",
            },
            specs: {
                type: "object",
            },
        },
        required: ["id", "name", "description", "specs"],
    },
};

export function testServers() {
    describe("Infrastructure Servers", () => {
        it("should get a list of servers per provider", async () => {
            const providerResp = await Infrastructure.Providers.getCollection({
                settings: { url: process.env.API_URL },
            });
            if (!providerResp.ok) {
                throw new Error(JSON.stringify(providerResp.error));
            }

            const promises: Array<Promise<any>> = [];

            providerResp.value.data.forEach(provider => {
                promises.push(
                    (async () => {
                        const resp = await Infrastructure.Servers.getCollection(
                            {
                                provider: provider.id,
                                settings: { url: process.env.API_URL },
                            },
                        );

                        if (!resp.ok) {
                            throw new Error(JSON.stringify(resp.error));
                        }
                        assert.isTrue(resp.ok);
                        assert.isArray(resp.value.data);
                        assert.jsonSchema(
                            resp.value.data,
                            ServerCollectionSchema,
                        );
                    })(),
                );
            });

            await Promise.all(promises);
        });
    });
}
