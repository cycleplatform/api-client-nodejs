import { makeUrl } from "./Api";
import { Settings } from "./Structs";

export const links = {
    account: (settings?: Settings) => ({
        single: () => `${makeUrl(settings)}/account`,
    }),
    infrastructure: (settings?: Settings) => ({
        providers: () => ({
            list: () => `${makeUrl(settings)}/providers/`,
            servers: (name: string) =>
                `${makeUrl(settings)}/providers/${name}/servers`,
        }),
    }),
};
