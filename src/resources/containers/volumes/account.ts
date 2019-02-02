import { ResourceId, Resource, CollectionDoc } from "../../../common/structs";
import { Token } from "../../../auth";
import {
  QueryParams,
  Settings,
  links,
  StandardParams,
} from "../../../common/api";
import * as Request from "../../../common/api/request";

export type AccountsCollection = CollectionDoc<VolumeAccount>;

export interface VolumeAccount extends Resource {
  username: string;
  readonly: boolean;
  container_id: ResourceId;
  hub_id: ResourceId;
  container_volume_id: ResourceId;
}

export async function getAccounts(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<AccountsCollection>({
    ...params,
    target: links
      .containers()
      .volumes()
      .accounts(params.id),
  });
}

export interface CreateAccountParams {
  username: string;
  password: string;
  readonly: boolean;
  container_volume_id: ResourceId;
}

export async function createAccount(params: {
  id: ResourceId;
  value: CreateAccountParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<AccountsCollection>({
    ...params,
    target: links
      .containers()
      .volumes()
      .accounts(params.id),
  });
}

export interface UpdateAccountParams {
  username?: string;
  password?: string;
  readonly?: boolean;
}

export async function updateAccount(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
    value: UpdateAccountParams;
  },
) {
  return Request.patchRequest<AccountsCollection>({
    ...params,
    target: links
      .containers()
      .volumes()
      .account(params.id, params.containerId),
  });
}
