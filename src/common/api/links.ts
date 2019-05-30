import { ResourceId } from "../structs";

/**
 * All possible endpoints of Cycle's API
 */
export const links = {
  account: () => ({
    single: () => `/account`,
    invites: () => ({
      collection: () => `/account/invites`,
      invite: (id: ResourceId) => `/account/invites/${id}`,
    }),
    memberships: () => `/account/memberships`,
    logins: () => `/account/logins`,
  }),

  audit: () => ({
    entries: () => `/audit/entries`,
  }),

  billing: () => ({
    orders: () => ({
      collection: () => `/billing/orders`,
      single: (id: ResourceId) => `/billing/orders/${id}`,
      tasks: (id: ResourceId) => `/billing/orders/${id}/tasks`,
    }),
    plans: () => ({
      support: () => `/billing/plans/support`,
      tiers: () => `/billing/plans/tiers`,
    }),
    methods: () => ({
      collection: () => `/billing/methods`,
      single: (id: ResourceId) => `/billing/methods/${id}`,
    }),
    invoices: () => ({
      collection: () => `/billing/invoices`,
      single: (id: ResourceId) => `/billing/invoices/${id}`,
      tasks: (id: ResourceId) => `/billing/invoices/${id}/tasks`,
    }),
    services: () => ({
      collection: () => `/billing/services`,
      single: (id: ResourceId) => `/billing/services/${id}`,
      overage: () => `/billing/services/overages`,
    }),
    credits: () => ({
      collection: () => `/billing/credits`,
      single: (id: ResourceId) => `/billing/credits/${id}`,
    }),
  }),

  changelog: () => ({
    collection: () => "/changelog",
  }),

  channels: () => ({
    account: () => "/account/notifications",
    hub: () => "/hubs/current/notifications",
  }),

  containers: () => ({
    collection: () => `/containers`,
    single: (id: ResourceId) => `/containers/${id}`,
    tasks: (id: ResourceId) => `/containers/${id}/tasks`,
    servers: (id: ResourceId) => `/containers/${id}/servers`,
    events: (id: ResourceId) => `/containers/${id}/events`,
    summary: (id: ResourceId) => `/containers/${id}/summary`,
    compatibleImages: (id: ResourceId) => `/containers/${id}/compatible-images`,
    instances: () => ({
      collection: (container: ResourceId) =>
        `/containers/${container}/instances`,
      single: (id: ResourceId, container: ResourceId) =>
        `/containers/${container}/instances/${id}`,
      console: (id: ResourceId, container: ResourceId) =>
        `/containers/${container}/instances/${id}/console`,
      ssh: (instance: ResourceId, container: ResourceId) =>
        `/containers/${container}/instances/${instance}/ssh`,
      volumes: (id: ResourceId, container: ResourceId) =>
        `/containers/${container}/instances/${id}/volumes`,
    }),
    volumes: () => ({
      accounts: (container: ResourceId) =>
        `/containers/${container}/volumes/accounts`,
      account: (id: ResourceId, container: ResourceId) =>
        `/containers/${container}/volumes/accounts/${id}`,
    }),
    telemetry: () => ({
      instances: (id: ResourceId) => `/containers/${id}/telemetry/instances`,
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
    tls: () => ({
      collection: () => `/dns/tls/attempts`,
    }),
  }),

  environments: () => ({
    collection: () => `/environments`,
    single: (id: ResourceId) => `/environments/${id}`,
    events: (id: ResourceId) => `/environments/${id}/events`,
    summary: (id: ResourceId) => `/environments/${id}/summary`,
    tasks: (id: ResourceId) => `/environments/${id}/tasks`,
    services: () => ({
      lb: () => ({
        info: (environment: ResourceId) =>
          `/environments/${environment}/services/lb`,
        tasks: (environment: ResourceId) =>
          `/environments/${environment}/services/lb/tasks`,
        egress: () => ({
          collection: (environment: ResourceId) =>
            `/environments/${environment}/services/lb/egress-gateways`,
          single: (environment: ResourceId, gateway: ResourceId) =>
            `/environments/${environment}/services/lb/egress-gateways/${gateway}`,
        }),
      }),
      vpn: () => ({
        details: (environment: ResourceId) =>
          `/environments/${environment}/services/vpn`,
        users: (environment: ResourceId) =>
          `/environments/${environment}/services/vpn/users`,
        user: (environment: ResourceId, user: ResourceId) =>
          `/environments/${environment}/services/vpn/users/${user}`,
        tasks: (environment: ResourceId) =>
          `/environments/${environment}/services/vpn/tasks`,
        logins: (environment: ResourceId) =>
          `/environments/${environment}/services/vpn/logins`,
      }),
    }),
    telemetry: () => ({
      instances: (id: ResourceId) => `/environments/${id}/telemetry/instances`,
    }),
  }),

  hubs: () => ({
    collection: () => `/hubs`,
    single: () => `/hubs/current`,
    tasks: () => `/hubs/current/tasks`,
    capabilities: () => `/hubs/capabilities`,
    invites: () => ({
      collection: () => `/hubs/current/invites`,
    }),
    members: () => ({
      collection: () => `/hubs/current/members`,
      membership: () => `/hubs/current/membership`,
      single: (id: ResourceId) => `/hubs/current/members/${id}`,
    }),
    keys: () => ({
      collection: () => `/hubs/current/api-keys`,
      single: (id: ResourceId) => `/hubs/current/api-keys/${id}`,
    }),
  }),

  images: () => ({
    collection: () => `/images`,
    single: (id: ResourceId) => `/images/${id}`,
    build: () => `/images/build`,
    containers: (id: ResourceId) => `/images/${id}/containers`,
  }),

  infrastructure: () => ({
    servers: () => ({
      collection: () => `/infrastructure/servers`,
      single: (id: ResourceId) => `/infrastructure/servers/${id}`,
      console: (id: ResourceId) => `/infrastructure/servers/${id}/console`,
      telemetry: (id: ResourceId) => `/infrastructure/servers/${id}/telemetry`,
      instances: (id: ResourceId) => `/infrastructure/servers/${id}/instances`,
      tags: () => `/infrastructure/servers/tags`,
      clusters: () => `/infrastructure/servers/clusters`,
      usage: () => `/infrastructure/servers/usage`,
    }),
    providers: () => ({
      collection: () => `/infrastructure/providers`,
      servers: (provider: ResourceId) =>
        `/infrastructure/providers/${provider}/servers`,
      locations: (provider: ResourceId) =>
        `/infrastructure/providers/${provider}/locations`,
    }),
    ips: () => ({
      pools: () => ({
        collection: () => `/infrastructure/ips/pools`,
        single: (id: ResourceId) => `/infrastructure/ips/pools/${id}`,
        ips: (id: ResourceId) => `/infrastructure/ips/pools/${id}/ips`,
      }),
    }),
  }),

  jobs: () => ({
    collection: () => `/jobs`,
    single: (id: ResourceId) => `/jobs/${id}`,
  }),

  projects: () => ({
    collection: () => `/projects`,
    single: (id: ResourceId) => `/projects/${id}`,
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
    hooks: (stack: ResourceId) => ({
      collection: () => `/stacks/${stack}/hooks`,
      single: (id: ResourceId) => `/stacks/${stack}/hooks/${id}`,
      tasks: (id: ResourceId) => `/stacks/${stack}/hooks/${id}/tasks`,
    }),
  }),
};
