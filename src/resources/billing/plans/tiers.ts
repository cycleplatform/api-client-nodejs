import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Gigabytes,
} from "../../../common/structs";
import { Amount } from "../../billing";
import { Builds } from "resources/stacks";
import { DeploymentStrategy } from "../../stacks/spec/v1/deploy";

export type Collection = CollectionDoc<TierPlan>;
export type Single = SingleDoc<TierPlan>;

export type CapabilititiesLevel = "limited" | "standard" | "advanced";

export interface TierPlan extends Resource {
  name: string;
  code: string;
  price: Amount;
  max_nodes: number | null;
  max_members: number | null;
  max_daily_api_requests: number | null;
  ram: RAM;
  image_storage: ImageStorage;
  builds: Builds;
  features: Features;
  hidden: boolean;
  description: string;
  default?: true;
}

export interface RAM {
  included_gb: Gigabytes;
  additional_gb: Amount;
  hard_cap: boolean;
}

export interface ImageStorage {
  included_gb: Gigabytes;
}

export interface Builds {
  parallel: number;
  cpu_cores: number;
  ram_gb: Gigabytes;
  max_daily_builds: number | null;
}

export interface Features {
  performance_builds: TierFeature;
  infrastructure: InfrastructureFeatures;
  monitoring: MonitoringFeatures;
  support: SupportFeatures;
  security: SecurityFeatures;
  automated_backups: TierFeature;
  continuous_deployments: TierFeature;
}

export interface TierFeature {
  enabled: boolean;
  capabilities?: CapabilititiesLevel;
}

export interface InfrastructureFeatures {
  multi_provider: TierFeature;
  clustering: TierFeature;
  sdn: TierFeature;
  dedicated_cluster: TierFeature;
  deployment_strategies: DeploymentStrategiesFeature;
}

export interface DeploymentStrategiesFeature extends TierFeature {
  strategies: DeploymentStrategy[];
}

export interface MonitoringFeatures {
  infrastructure: TierFeature;
  advanced: TierFeature;
}

export interface SupportFeatures {
  live_chat: LiveChatFeature;
  phone_support: TierFeature;
  slack_community: TierFeature;
}

export interface LiveChatFeature extends TierFeature {
  days?: number;
}

export interface SecurityFeatures {
  audit_log: TierFeature;
  two_factor_auth: TierFeature;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.billing().plans().tiers(),
  });
}
