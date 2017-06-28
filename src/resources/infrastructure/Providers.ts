import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Settings } from "../../common/Structs";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<ProviderName>;

export type ProviderName = "packet";

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>(
        links.infrastructure(settings).providers().list(),
        query,
    );
}
