import { Resource, SingleDoc, State } from "../../common/structs";
import { ContainerState } from "../containers/container";
// import { Token } from "../../auth";
// import { Settings, links } from "../../common/api";
// import * as Request from "../../common/api/request";
import { CondensedImage, CondensedEnvironment } from "./container";

export type ContainerSummaryDoc = SingleDoc<ContainerSummary>;

export interface ContainerSummary extends Resource {
    name: string;
    state: State<ContainerState>;
    image: CondensedImage;
    environment: CondensedEnvironment;
}

// export async function getSummary({
//     id,
//     token,
//     settings,
// }: {
//     id: ResourceId;
//     token: Token;
//     settings?: Settings;
// }) {
//     return Request.getRequest<ContainerSummaryDoc>({
//         target: links.containers().summary(id),
//         token,
//         settings,
//     });
// }
