import { ResourceId } from "../structs";

export const links = {
    account: () => ({
        single: () => `/account`,
        invites: () => ({
            collection: () => `/account/invites`,
            tasks: (id: ResourceId) => `/account/invites/${id}/tasks`,
        }),
        memberships: () => `/account/memberships`,
        pipeline: () => `/account/pipeline`,
        logins: () => `/account/logins`,
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
        credits: () => `/billing/credits`,
    }),

    containers: () => ({
        collection: () => `/containers`,
        single: (id: ResourceId) => `/containers/${id}`,
        tasks: (id: ResourceId) => `/containers/${id}/tasks`,
        servers: (id: ResourceId) => `/containers/${id}/servers`,
        events: (id: ResourceId) => `/containers/${id}/events`,
        summary: (id: ResourceId) => `/containers/${id}/summary`,
        compatibleImages: (id: ResourceId) =>
            `/containers/${id}/compatible-images`,
        instances: () => ({
            collection: (container: ResourceId) =>
                `/containers/${container}/instances`,
            single: (id: ResourceId, container: ResourceId) =>
                `/containers/${container}/instances/${id}`,
        }),
    }),

    dns: () => ({
        zones: () => ({
            collection: () => `/dns/zones`,
            single: (id: ResourceId) => `/dns/zones/${id}`,
            tasks: (id: ResourceId) => `/dns/zones/${id}/tasks`,
            records: (id: ResourceId) => `/dns/zones/${id}/records`,
            record: (zoneId: ResourceId, id: ResourceId) =>
                `/dns/zones/${zoneId}/records/${id}`,
        }),
        domains: () => ({
            collection: () => `/dns/domains`,
        }),
    }),

    environments: () => ({
        collection: () => `/environments`,
        single: (id: ResourceId) => `/environments/${id}`,
        events: (id: ResourceId) => `/environments/${id}/events`,
        summary: (id: ResourceId) => `/environments/${id}/summary`,
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
            tags: () => `/infrastructure/servers/tags`,
            activating: () => `/infrastructure/servers/activating`,
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
        tasks: () => `/projects/current/tasks`,
        capabilities: () => `/projects/capabilities`,
        invites: () => ({
            collection: () => `/projects/current/invites`,
        }),
        members: () => ({
            collection: () => `/projects/current/members`,
            single: () => `/projects/current/membership`,
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
            log: (build: ResourceId) => `/stacks/${stack}/builds/${build}/log`,
        }),
    }),
};
