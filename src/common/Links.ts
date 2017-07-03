import { makeUrl } from "./Api";
import { Settings } from "./Structs";

export const links = {
    account: (settings?: Settings) => ({
        single: () => `${makeUrl(settings)}/account`,
    }),

    infrastructure: (settings?: Settings) => ({
        providers: () => ({
            collection: () => `${makeUrl(settings)}/infrastructure/providers`,
            servers: (provider: string) =>
                `${makeUrl(
                    settings,
                )}/infrastructure/providers/${provider}/servers`,
            datacenters: (provider: string) =>
                `${makeUrl(
                    settings,
                )}/infrastructure/providers/${provider}/datacenters`,
        }),
    }),

    projects: (settings?: Settings) => ({
        collection: () => `${makeUrl(settings)}/projects`,
    }),
};
