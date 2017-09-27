import { ResourceId } from "./Structs";

export const links = {
    account: () => ({
        single: () => `/account`,
        invites: () => ({
            collection: () => `/invites`,
            tasks: (id: ResourceId) => `/invites/${id}`,
        }),
        memberships: () => `/account/memberships`,        
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

    containers: () => ({
        collection: () => `/containers`,
        single: (id: ResourceId) => `/containers/${id}`,
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
        servers: () => ({
            collection: () => `/infrastructure/servers`,
        }),
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
        single: () => `/projects/current`,
        invites: () => ({
            collection: () => `/projects/current/invites`,
        }),
        members: () => ({
            collection: () => `/projects/current/members`,
        }),
        keys: () => ({
            collection: () => `/projects/current/api-keys`,
            single: (id: ResourceId) => `/projects/current/api-keys/${id}`,
        })
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
            tasks: (id: ResourceId) => `/stacks/${stack}/builds/${id}/tasks`,            
        }),
    }),
};
