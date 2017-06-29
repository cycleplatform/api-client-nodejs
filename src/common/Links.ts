import { makeUrl } from "./Api";
import { Settings } from "./Structs";

export const links = {
    account: (settings?: Settings) => ({
        single: () => `${makeUrl(settings)}/account`,
    }),
    infrastructure: (settings?: Settings) => ({
        providers: () => ({
            list: () => `${makeUrl(settings)}/infrastructure/providers`,
            servers: (provider: string) =>
                `${makeUrl(
                    settings,
                )}/infrastructure/providers/${provider}/servers`,
        }),
    }),
};
