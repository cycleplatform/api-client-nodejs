import {
  Resource,
  ResourceId,
  Time,
  CollectionDoc,
} from "../../../common/structs";
import { StandardParams, getRequest, links } from "../../../common/api";

export type Collection = CollectionDoc<Attempt>;

export interface BaseAttempt extends Resource {
  hub_id: ResourceId;
  domains: string[];
  time: Time;
}

export interface SuccessfulAttempt extends BaseAttempt {
  success: true;
}

export interface FailedAttempt extends BaseAttempt {
  success: false;
  error: string;
}

export type Attempt = SuccessfulAttempt | FailedAttempt;

export async function getAttempts(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links
      .dns()
      .tls()
      .collection(),
  });
}
