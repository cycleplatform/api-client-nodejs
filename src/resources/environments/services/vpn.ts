import { Service } from "./common";
import {
  ResourceId,
  Resource,
  CreatorScope,
  Events,
  CollectionDoc,
  SingleDoc,
  CreatedTask,
  Time,
  Webhook,
} from "../../../common/structs";
import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";

export interface VPNService extends Service {
  config: VPN;
}

export interface VPN {
  auth: VPNAuth;
  allow_internet: boolean;
}

export interface VPNAuth {
  webhook: Webhook | null;
  cycle_accounts: boolean;
  vpn_accounts: boolean;
}

export interface VPNUser extends Resource {
  username: string;
  creator: CreatorScope;
  last_login: Time;
  hub_id: ResourceId;
  environment_id: ResourceId;
  events: Events;
}

export interface VPNLogin extends Resource {
  username: string;
  environment_id: ResourceId;
  ip: string;
  time: Time;
  success: boolean;
}

export interface VPNReconfigureDetails {
  enable?: boolean;
  config?: Partial<VPN>;
  high_availability?: boolean;
}

export type VPNUsersDoc = CollectionDoc<VPNUser>;
export type VPNUserDoc = SingleDoc<VPNUser>;

export type VPNLoginsDoc = CollectionDoc<VPNLogin>;

export interface VPNInfo {
  url: string;
  service: VPNService;
}

export async function getVPNInfo(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<{ data: VPNInfo }>({
    ...params,
    target: links.environments().services().vpn().details(params.environmentId),
  });
}

export async function getVPNLogins(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNLoginsDoc>({
    ...params,
    target: links.environments().services().vpn().logins(params.environmentId),
  });
}

export async function getVPNUsers(
  params: StandardParams & {
    environmentId: ResourceId;
  },
) {
  return Request.getRequest<VPNUsersDoc>({
    ...params,
    target: links.environments().services().vpn().users(params.environmentId),
  });
}

export interface CreateVPNUserParams {
  username: string;
  password: string;
}

export async function createVPNUser(
  params: StandardParams & {
    environmentId: ResourceId;
    value: CreateVPNUserParams;
  },
) {
  return Request.postRequest<VPNUserDoc>({
    ...params,
    target: links.environments().services().vpn().users(params.environmentId),
  });
}

export async function deleteVPNUser(
  params: StandardParams & {
    environmentId: ResourceId;
    userId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .environments()
      .services()
      .vpn()
      .user(params.environmentId, params.userId),
  });
}

export type VPNAction = "reconfigure";

export async function reconfigureVPN(
  params: StandardParams & {
    environmentId: ResourceId;
    value: VPNReconfigureDetails;
  },
) {
  return Request.postRequest<CreatedTask<VPNAction>>({
    ...params,
    target: links.environments().services().vpn().tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
