import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import * as Structs from "../../common/Structs";
import * as Memberships from "../projects/Membership";

export async function getMemberships({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Structs.Settings;
}) {
    return API.getRequest<Memberships.Collection>({
        target: links.account().memberships(),
        query,
        token,
        settings,
    });
}