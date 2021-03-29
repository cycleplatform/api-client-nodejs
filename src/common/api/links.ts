import { ResourceId } from "../structs";

/**
 * All possible endpoints of Cycle's API
 */
export const links = {
  // Account
  account: () => ({
    single: () => `/account`,
    invites: () => ({
      collection: () => `/account/invites`,
      invite: (id: ResourceId) => `/account/invites/${id}`,
    }),
    memberships: () => `/account/memberships`,
    logins: () => `/account/logins`,
  }),

  // Announcements
  announcements: () => ({
    collection: () => `/announcements`,
  }),

  // Audit
  audit: () => ({
    entries: () => `/audit/entries`,
  }),

  // Billing
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

  // Changelog
  changelog: () => ({
    single: (id: ResourceId) => `/changelogs/${id}`,
    collection: () => "/changelogs",
  }),

  // Notification Channels
  channels: () => ({
    account: () => "/account/notifications",
    hub: () => "/hubs/current/notifications",
  }),

  // Containers
  containers: () => ({
    collection: () => `/containers`,
    single: (id: ResourceId) => `/containers/${id}`,
    tasks: (id: ResourceId) => `/containers/${id}/tasks`,
    servers: (id: ResourceId) => ({
      list: () => `/containers/${id}/servers`,
      usable: () => `/containers/${id}/servers/usable`,
    }),
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
      tasks: (id: ResourceId, container: ResourceId) =>
        `/containers/${container}/instances/${id}/tasks`,
      telemetry: () => ({
        resourcesReport: (id: ResourceId, container: ResourceId) =>
          `/containers/${container}/instances/${id}/telemetry/resources/report`,
        resourcesStream: (id: ResourceId, container: ResourceId) =>
          `/containers/${container}/instances/${id}/telemetry/resources/stream`,
      }),
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

  // DNS
  dns: () => ({
    zones: () => ({
      collection: () => `/dns/zones`,
      single: (id: ResourceId) => `/dns/zones/${id}`,
      tasks: (id: ResourceId) => `/dns/zones/${id}/tasks`,
      records: (id: ResourceId) => `/dns/zones/${id}/records`,
      record: (zoneId: ResourceId, id: ResourceId) =>
        `/dns/zones/${zoneId}/records/${id}`,
      recordTasks: (zoneId: ResourceId, id: ResourceId) =>
        `/dns/zones/${zoneId}/records/${id}/tasks`,
    }),
    domains: () => ({
      collection: () => `/dns/domains`,
    }),
    tls: () => ({
      collection: () => `/dns/tls/attempts`,
    }),
  }),

  // Environments
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
      discovery: () => ({
        tasks: (environment: ResourceId) =>
          `/environments/${environment}/services/discovery/tasks`,
      }),
    }),
    telemetry: () => ({
      instances: (id: ResourceId) => `/environments/${id}/telemetry/instances`,
    }),
  }),

  // Hubs
  hubs: () => ({
    collection: () => `/hubs`,
    single: () => `/hubs/current`,
    tasks: () => `/hubs/current/tasks`,
    activity: () => `/hubs/current/activity`,
    capabilities: () => `/hubs/capabilities`,
    tier: () => `/hubs/current/tier`,
    invites: () => ({
      single: (id: ResourceId) => `/hubs/current/invites/${id}`,
      collection: () => `/hubs/current/invites`,
    }),
    members: () => ({
      collection: () => `/hubs/current/members`,
      membership: () => `/hubs/current/membership`,
      single: (id: ResourceId) => `/hubs/current/members/${id}`,
      account: (id: ResourceId) => `/hubs/current/members/account/${id}`,
    }),
    keys: () => ({
      collection: () => `/hubs/current/api-keys`,
      single: (id: ResourceId) => `/hubs/current/api-keys/${id}`,
    }),
  }),

  // Images
  images: () => ({
    collection: () => `/images`,
    single: (id: ResourceId) => `/images/${id}`,
    containers: (id: ResourceId) => `/images/${id}/containers`,
    buildLog: (id: ResourceId) => `/images/${id}/build-log`,
    collectionTasks: () => `/images/tasks`,
    imageTasks: (id: ResourceId) => `/images/${id}/tasks`,
    sources: () => ({
      collection: () => `/images/sources`,
      single: (id: ResourceId) => `/images/sources/${id}`,
      tasks: (id: ResourceId) => `/images/sources/${id}/tasks`,
    }),
  }),

  // Infrastructure
  infrastructure: () => ({
    summary: () => `/infrastructure/summary`,
    servers: () => ({
      collection: () => `/infrastructure/servers`,
      single: (id: ResourceId) => `/infrastructure/servers/${id}`,
      console: (id: ResourceId) => `/infrastructure/servers/${id}/console`,
      telemetry: (id: ResourceId) => `/infrastructure/servers/${id}/telemetry`,
      instances: (id: ResourceId) => `/infrastructure/servers/${id}/instances`,
      tasks: (id: ResourceId) => `/infrastructure/servers/${id}/tasks`,
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
      features: () => `/infrastructure/locations/features`,
    }),
    ips: () => ({
      pools: () => ({
        collection: () => `/infrastructure/ips/pools`,
        single: (id: ResourceId) => `/infrastructure/ips/pools/${id}`,
        ips: (id: ResourceId) => `/infrastructure/ips/pools/${id}/ips`,
      }),
    }),
    strategies: () => `/infrastructure/deployment-strategies`,
  }),

  // Jobs
  jobs: () => ({
    collection: () => `/jobs`,
    single: (id: ResourceId) => `/jobs/${id}`,
    latest: () => `/jobs/latest`,
  }),

  // SDN
  sdn: () => ({
    networks: () => ({
      collection: () => `/sdn/networks`,
      single: (id: ResourceId) => `/sdn/networks/${id}`,
      tasks: (id: ResourceId) => `/sdn/networks/${id}/tasks`,
    }),
  }),

  // Stacks
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

  // Pipelines
  pipelines: () => ({
    collection: () => `/pipelines`,
    single: (id: ResourceId) => `/pipelines/${id}`,
    runs: (id: ResourceId) => `/pipelines/${id}/runs`,
    tasks: (id: ResourceId) => `/pipelines/${id}/tasks`,
    trigger: (id: ResourceId) => `/pipelines/${id}/trigger`,
    keys: (pipeline: ResourceId) => ({
      collection: () => `/pipelines/${pipeline}/keys`,
      single: (key: ResourceId) => `/pipelines/${pipeline}/keys/${key}`,
    }),
  }),

  // Surveys
  surveys: () => ({
    single: (id: ResourceId) => `/survey/${id}`,
    response: (id: ResourceId) => `/survey/${id}/response`,
  }),
};
