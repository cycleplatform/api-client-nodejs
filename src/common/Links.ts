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
        methods: () => ({
            collection: () => `/billing/methods`,
        }),
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
        invites: () => ({
            collection: () => `/projects/invites`,
            tasks: (id: ResourceId) => `/projects/invites/${id}/tasks`,
        }),
        members: () => ({
            collection: () => `/projects/members`,
            memberships: () => `/projects/memberships`,
        }),
    }),

    support: () => ({
        plans: () => `/support/plans`,
    }),
};
