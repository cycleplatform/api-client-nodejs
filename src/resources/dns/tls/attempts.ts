import {
  Resource,
  ResourceId,
  Time,
  CollectionDoc,
} from "../../../common/structs";
import { StandardParams, getRequest, links } from "../../../common/api";

export type Collection = CollectionDoc<Attempt>;

/**
 * Information for TLS certificate generation
 */
export interface BaseAttempt extends Resource {
  /** The hub this attempt too place on */
  hub_id: ResourceId;
  /** The domains included in the attempt */
  domains: string[];
  time: Time;
}
/**
 * Information for a successful TLS certificate generation
 */
export interface SuccessfulAttempt extends BaseAttempt {
  /** A true value, indicating the attempt was successful */
  success: true;
}

/** Information for a failed TLS certificate generation */
export interface FailedAttempt extends BaseAttempt {
  /** A false value, indicating the attempt failed */
  success: false;
  /** The error produced by the failure to generate a TLS certificate */
  error: string;
}

export type Attempt = SuccessfulAttempt | FailedAttempt;

export async function getAttempts(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links.dns().tls().collection(),
  });
}
