import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Settings, Resource } from "../../common/Structs";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<Provider>;

export interface Provider extends Resource {
    id: string;
    name: ProviderName;
    website: string;
}

export type ProviderName = "packet";

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>(
        links.infrastructure(settings).providers().collection(),
        query,
    );
}
