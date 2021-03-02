import { Resource, SingleDoc, ResourceId } from "../../../common/structs";

/**
 * @deprecated stack build logs have been deprecated in favor of
 * image build logs. Single will be removed in April, 2021
 */
export type Single = SingleDoc<BuildLog>;

/**
 * @deprecated stack build logs have been deprecated in favor of
 * image build logs. The BuildLog interface will be removed in April, 2021
 */
export interface BuildLog extends Resource {
  stack_id: ResourceId;
  hub_id: ResourceId;
  build_id: ResourceId;
  log: string;
}
