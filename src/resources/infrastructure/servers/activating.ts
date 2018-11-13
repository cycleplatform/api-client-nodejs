import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, Settings, QueryParams } from "../../../common/api";
import { CollectionDoc, Resource, Time } from "../../../common/structs";
import { ProviderNames } from "../provider";

export type ActivatingCollection = CollectionDoc<ActivatingServer>;

export interface ActivatingServer extends Resource {
  hostname: string;
  provider: ProviderNames;
  created: Time;
}

export async function getActivating({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<ActivatingCollection>({
    query,
    settings,
    token,
    target: links
      .infrastructure()
      .servers()
      .activating(),
  });
}
