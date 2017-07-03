import { makeUrl } from "./Api";
import { Settings, ResourceId } from "./Structs";

export const links = {
    account: (settings?: Settings) => ({
        single: () => `${makeUrl(settings)}/account`,
    }),

    billing: (settings?: Settings) => ({
        orders: () => ({
            collection: () => `${makeUrl(settings)}/orders`,
            single: (id: ResourceId) => `${makeUrl(settings)}/orders/${id}`,
        }),
        methods: () => ({}),
    }),

    infrastructure: (settings?: Settings) => ({
        providers: () => ({
            collection: () => `${makeUrl(settings)}/infrastructure/providers`,
            servers: (provider: ResourceId) =>
                `${makeUrl(
                    settings,
                )}/infrastructure/providers/${provider}/servers`,
            datacenters: (provider: ResourceId) =>
                `${makeUrl(
                    settings,
                )}/infrastructure/providers/${provider}/datacenters`,
        }),
    }),

    projects: (settings?: Settings) => ({
        collection: () => `${makeUrl(settings)}/projects`,
    }),
};
