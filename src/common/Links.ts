import { ResourceId } from "./Structs";

export const links = {
    account: () => ({
        single: () => `/account`,
    }),

    billing: () => ({
        orders: () => ({
            collection: () => `/orders`,
            single: (id: ResourceId) => `/orders/${id}`,
        }),
        methods: () => ({}),
    }),

    infrastructure: () => ({
        providers: () => ({
            collection: () => `/infrastructure/providers`,
            servers: (provider: ResourceId) =>
                `/infrastructure/providers/${provider}/servers`,
            datacenters: (provider: ResourceId) =>
                `/infrastructure/providers/${provider}/datacenters`,
        }),
    }),

    projects: () => ({
        collection: () => `/projects`,
    }),

    support: () => ({
        plans: () => `/support/plans`,
    }),
};
