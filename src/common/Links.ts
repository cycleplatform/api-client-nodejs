import { ResourceId } from "./Structs";

export const links = {
    account: () => ({
        single: () => `/account`,
    }),

    billing: () => ({
        orders: () => ({
            collection: () => `/orders`,
            single: (id: ResourceId) => `/orders/${id}`,
            tasks: (id: ResourceId) => `/orders/${id}/tasks`,
        }),
        methods: () => ({
            collection: () => `/billing/methods`,
        }),
        invoices: () => ({
            collection: () => `/billing/invoices`,
            single: (id: ResourceId) => `/billing/invoices/${id}`,
        }),
    }),

    environments: () => ({
        collection: () => `/environments`,
        single: (id: ResourceId) => `/environments/${id}`,
    }),

    images: () => ({
        collection: () => `/images`,
        single: (id: ResourceId) => `/images/${id}`,
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

    jobs: () => ({
        collection: () => `/jobs`,
        single: (id: ResourceId) => `/jobs/${id}`,
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
        tasks: (id: ResourceId) => `/stacks/${id}/tasks`,
        builds: (stack: ResourceId) => ({
            collection: () => `/stacks/${stack}/builds`,
            single: (id: ResourceId) => `/stacks/${stack}/builds/${id}`,
        }),
    }),
};
