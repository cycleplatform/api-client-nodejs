import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";

export type Capability =
    | "apikeys-manage"
    | "billing-methods-manage"
    | "billing-invoices-view"
    | "billing-invoices-pay"
    | "billing-orders-manage"
    | "billing-services-view"
    | "containers-deploy"
    | "containers-view"
    | "containers-state"
    | "containers-update"
    | "containers-delete"
    | "environments-create"
    | "environments-delete"
    | "environments-view"
    | "environments-update"
    | "environments-state"
    | "images-view"
    | "images-build"
    | "jobs-view"
    | "projects-update"
    | "projects-delete"
    | "projects-invites-send"
    | "projects-invites-manage"
    | "projects-members-manage"
    | "projects-members-view"
    | "projects-pipeline-listen"
    | "servers-view"
    | "servers-update"
    | "servers-state"
    | "servers-decommission"
    | "stacks-create"
    | "stacks-delete"
    | "stacks-view"
    | "stacks-builds";

export interface CapabilityDoc {
    data: Capability[];
}

export async function getCapabilities({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<CapabilityDoc>({
        target: links.projects().capabilities(),
        query,
        settings,
    });
}
