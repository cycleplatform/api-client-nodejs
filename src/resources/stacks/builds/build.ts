import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  StatefulCounts,
  Time,
  StandardEvents,
} from "../../../common/structs";
import { Spec } from "../spec";
import { ContainerState } from "../../containers";

export * from "./tasks/build";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;
export type BuildState =
  | "new"
  | "importing"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deploying"
  | "deleting"
  | "deleted";

export type BuildsQuery = QueryParams<string, keyof BuildMetas>;

export interface Build extends Resource<BuildMetas> {
  stack_id: ResourceId;
  hub_id: ResourceId;
  source: Source;
  label: string | null;
  version: string | null;
  events: StandardEvents;
  state: State<BuildState>;
}

export interface Source {
  hook_id: ResourceId | null;
  repo: RepoVersion | null;
  spec: Spec;
}

export interface RepoVersion {
  url: string;
  tag: string;
  commit: GitCommit | null;
}

export interface GitCommit {
  id: string;
  message: string;
  timestamp: Time;
  url: string;
  author: {
    name: string;
    email: string;
  };
  added: string[];
  modified: string[];
  removed: string[];
}

export interface BuildMetas {
  container_counts: StatefulCounts<ContainerState>;
}

export async function getCollection(
  params: StandardParams<BuildsQuery> & {
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<BuildsQuery> & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .single(params.id),
  });
}
