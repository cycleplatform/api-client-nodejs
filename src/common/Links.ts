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

    environments: () => ({
        collection: () => `/environments`,
        single: (id: ResourceId) => `/environments/${id}`,
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
        single: (id: ResourceId) => `/projects/${id}`,
        invites: (project: ResourceId) => ({
            collection: () => `/projects/${project}/invites`,
            tasks: (id: ResourceId) => `/projects/invites/${id}/tasks`,
        }),
        members: () => ({
            collection: () => `/projects/members`,
            memberships: () => `/projects/memberships`,
        }),
    }),

    plans: () => ({
        support: () => `/plans/support`,
        ips: () => `/plans/ips`,
        bandwidth: () => `/plans/bandwidth`,
    }),

    stacks: () => ({
        collection: () => `/stacks`,
        single: (id: ResourceId) => `/stacks/${id}`,
    }),
};
