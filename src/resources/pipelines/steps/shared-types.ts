import { ResourceId } from "../../../common/structs";

/**
 * ### `interface FromStep`
 * The interface used to create the from object used inside of different
 * steps and the `StepExistingResource` type.
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.26 — Grady S
 */
export interface From {
  /**
   * The identifier of the stage which the step you want to reference
   * is inside of.
   *
   * ---
   *
   * ### Important Notes
   * If `stage` is left out, the step is assumed to be inside the current stage
   *
   */
  stage?: string;
  /** The identifier of the step being referenced */
  step: string;
}

/**
 * ### `interface DetailsId`
 * Need to set from to optional and never so if an id is supplied, then TS will throw
 * an error saying both from and id cannot be supplied.
 */
interface DetailsId {
  /**
   * The id of an existing resource. This means the resource exists on the hub
   * before the pipeline has run.
   */
  id: ResourceId;
  from?: never;
}

/** `interface DetailsFrom`
 * Need to set id to optional and never so if an id is supplied, then TS will throw
 * an error saying both from and id cannot be supplied
 */
interface DetailsFrom {
  id?: never;
  /**
   * When wanting to reference a resource created with any previous step use the
   * the from object.
   */
  from: From;
}

/**
 * ### `type ResourceLocation`
 * Meshed existing resource type which will allow for the id of a resource
 * or the from object to be supplied, but not both
 *
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.26 — Grady S
 */
export type ResourceLocation = DetailsId | DetailsFrom;
