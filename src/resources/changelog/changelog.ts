/**
 * @internal
 */
import * as Request from "../../common/api/request";
import {
  Resource,
  CollectionDoc,
  SingleDoc,
  ResourceId,
} from "../../common/structs";
import { links, StandardParams } from "../../common/api";
import { State as StateBase } from "../../common/structs";

/** ### `interface Release`
 * A Changelog release that when published goes to the marketing website, portal, status page
 *
 * Last Updated: 2021.03.29 — Kevin C
 */
export interface Release extends Resource {
  /**
   * @example
   * <year>.<month>.<day>.<build-number>
   * 2021.03.01.1
   * */
  version: string;
  date: string;

  /** Main title of the post for marketing website */
  title: string;
  hero?: Hero;
  changes: Change[];
  state: State;
  email_state?: EmailState;
}

/****************************** Changelog Struct Sub Types ******************************/
export interface Hero {
  /** The intro will be displayed as the main overview of the post */
  intro: string;
  image_url: string;
  image_alt: string;
}

export interface Change {
  title: string;
  description: string;
  notes: string[];
  showcase: boolean;
  type: ChangeType;
  codebase: CodebaseType;
  external_url?: string;
}

export type ChangeType =
  | "added"
  | "fixed"
  | "improvement"
  | "security"
  | "removed"
  | "changed"
  | "deprecated";

export type CodebaseType =
  | "platform"
  | "portal"
  | "cycleos"
  | "api-node-client";

/** ### `type States`
 * Possible changelog release states.
 * Possible states can be the following:
 * - `hidden`
 * - `published`
 * - `deleted`
 *
 *
 * Last Updated: 2021.03.29 — Kevin C
 */
export type States = "hidden" | "published" | "deleted";
export type State = StateBase<States>;

export type EmailStates = "not-sent" | "sent-internal" | "sent-external";
export type EmailState = StateBase<EmailStates>;

/****************************** Metas, Includes, Query, Docs ******************************/
export type Single = SingleDoc<Release>;
export type Collection = CollectionDoc<Release>;

/****************************** Params ******************************/
/** Changelog exists outside of the context of the portal, no hubid needed  */
type StandardParamsNoHubId = Omit<StandardParams, "hubId">;

/** Base Single Params */
type BSP = StandardParamsNoHubId & {
  id: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParamsNoHubId;

type GetSingleParams = BSP;
type GetCollectionParams = BCP;
type CreateParams = BCP & Request.PostParams<CreateValues>;
type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

/****************************** Values ******************************/

export type CreateValues = {
  version: Release["version"];
  title: Release["title"];
  hero?: Hero;
  changes: Change[];
  publish: boolean;
};

export type UpdateValues = Partial<CreateValues>;

/****************************** Functions ******************************/

/** Helper to change the url as this lives on a diff url */
const externalURL = "marketing-api.internal.cycle.io";

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    target: links.changelog().collection(),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    target: links.changelog().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    target: links.changelog().single(params.id),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    target: links.changelog().single(params.id),
  });
}
