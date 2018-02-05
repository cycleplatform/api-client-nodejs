import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";

export enum Capability {
    PROJECTS_UPDATE = "projects-update",
    PROJECTS_DELETE = "projects-delete",
    PROJECTS_INVITES_SEND = "projects-invites-send",
    PROJECTS_MEMBERS_MANAGE = "projects-members-manage",
    PROJECTS_MEMBERS_VIEW = "projects-members-view",
    PROJECTS_PIPELINE_LISTEN = "projects-pipeline-listen",
    BILLING_METHODS_MANAGE = "billing-methods-manage",
    BILLING_INVOICES_VIEW = "billing-invoices-view",
    BILLING_INVOICES_PAY = "billing-invoices-pay",
    BILLING_ORDERS_MANAGE = "billing-orders-manage",
    BILLING_SERVICES_VIEW = "billing-services-view",
    ENVIRONMENTS_CREATE = "environments-create",
    ENVIRONMENTS_DELETE = "environments-delete",
    ENVIRONMENTS_VIEW = "environments-view",
    ENVIRONMENTS_UPDATE = "environments-update",
    ENVIRONMENTS_STATE = "environments-state",
    CONTAINERS_DEPLOY = "containers-deploy",
    CONTAINERS_VIEW = "containers-view",
    CONTAINERS_UPDATE = "containers-update",
    CONTAINERS_DELETE = "containers-delete",
    CONTAINERS_STATE = "containers-state",
    CONTAINERS_VOLUMES_VIEW = "containers-volumes-view",
    CONTAINERS_VOLUMES_MANAGE = "containers-volumes-manage",
    STACKS_CREATE = "stacks-create",
    STACKS_DELETE = "stacks-delete",
    STACKS_VIEW = "stacks-view",
    STACKS_BUILDS = "stacks-builds",
    IMAGES_VIEW = "images-view",
    IMAGES_BUILD = "images-build",
    JOBS_VIEW = "jobs-view",
    APIKEYS_MANAGE = "apikeys-manage",
    INFRASTRUCTURE_SERVERS_VIEW = "servers-view",
    INFRASTRUCTURE_SERVERS_UPDATE = "servers-update",
    INFRASTRUCTURE_SERVERS_STATE = "servers-state",
    INFRASTRUCTURE_SERVERS_DECOMMISSION = "servers-decommission",
    DNS_VIEW = "dns-view",
    DNS_MANAGE = "dns-manage",
}

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
