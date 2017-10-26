import { ResourceId } from "./Structs";

export const links = {
    account: () => ({
        single: () => `/account`,
        invites: () => ({
            collection: () => `/invites`,
            tasks: (id: ResourceId) => `/invites/${id}`,
        }),
        memberships: () => `/account/memberships`,
        pipeline: () => `/account/pipeline`,
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
        tasks: (id: ResourceId) => `/containers/${id}/tasks`,
        servers: (id: ResourceId) => `/containers/${id}/servers`,
    }),

    environments: () => ({
        collection: () => `/environments`,
        single: (id: ResourceId) => `/environments/${id}`,
    }),

    images: () => ({
        collection: () => `/images`,
        single: (id: ResourceId) => `/images/${id}`,
        build: () => `/images/build`,
    }),

    infrastructure: () => ({
        servers: () => ({
            collection: () => `/infrastructure/servers`,
            single: (id: ResourceId) => `/infrastructure/servers/${id}`,
            console: (id: ResourceId) =>
                `/infrastructure/servers/${id}/console`,
            telemetry: (id: ResourceId) =>
                `/infrastructure/servers/${id}/telemetry`,
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

    notifications: () => ({
        collection: () => `/notifications`,
    }),

    projects: () => ({
        collection: () => `/projects`,
        single: () => `/projects/current`,
        capabilities: () => `/projects/capabilities`,
        invites: () => ({
            collection: () => `/projects/current/invites`,
        }),
        members: () => ({
            collection: () => `/projects/current/members`,
        }),
        keys: () => ({
            collection: () => `/projects/current/api-keys`,
            single: (id: ResourceId) => `/projects/current/api-keys/${id}`,
        }),
        pipeline: () => `/projects/current/pipeline`,
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
