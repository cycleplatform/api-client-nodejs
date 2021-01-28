import { ResourceId, Cluster } from "../../common/structs";
import { ImageSource, Origin } from "../../resources/images";
import { Config } from "../containers/config";
import { VolumeSummary } from "../containers";
import { Instructions, About } from "../../resources/stacks/builds";

/** ### `type Step`
 * Used to create the typing for any step object.
 *
 * ---
 * ### Dev Notes
 *
 * We need to setup the steps this way due to the unpredictability of the k:v inside
 *  the details details object.
 *
 * By setting up steps in this way we can extract the correct details typing for each
 *  individual step based upon the value input into the action. Since we tell TS the
 *  action will always only ever be a keyof our mapped steps type, TS can correctly
 *  infer the data inside the object AFTER action has been supplied in the step object
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
export type Step =
  // Shared
  | StepBase<"sleep">
  | StepBase<"webhook.post">

  // Container
  | StepBase<"container.create">
  | StepBase<"container.reimage">
  | StepBase<"container.restart">
  | StepBase<"container.start">
  | StepBase<"container.stop">
  | StepBase<"container.delete">

  // Image
  | StepBase<"image.create">
  | StepBase<"image.import">
  | StepBase<"images.prune">

  // Environment
  | StepBase<"environment.create">
  | StepBase<"environment.start">
  | StepBase<"environment.stop">
  | StepBase<"environment.delete">

  // Stacks
  | StepBase<"stack.build.create">
  | StepBase<"stack.build.generate">;

/** ### `interface StepBase<T>`
 * The base interface all steps are built on top of.
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
export interface StepBase<T extends AllActionKeys> {
  /**
   * Unique identifier used identify this step in a future steps from object
   */
  identifier?: string;
  /**
   * The action this step this step should be. Can be any of the the possible
   * actions returned from @type AllActionKeys
   */
  action: T;
  /**
   * Details for the the given action which is set for the action key
   */
  details: AllActionsMap[T];
  /**
   * Options associated with a given step
   */
  options?: StepOptions;
}

/** ### `interface StepOptions`
 * Typing for the options object type within the `StepBase<T>` interface
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
export interface StepOptions {
  /**
   * If skip is set to true the current step will be skipped on any subsequent
   * runs after enabling until skip is either removed from the options object, or
   * is explicitly set to false.
   */
  skip?: boolean;
}

/** ### `type AllActionsMap`
 * Map of all available actions for a step. The key is the action name
 * of a given step type, and the value of a given key contains the
 * details of type of the given step.
 *
 * ---
 *
 * ### Dev Notes
 * This type is largely used internally, and necessary to infer the correct
 * details typing when creating a step with the `Step` type.
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
export type AllActionsMap = {
  // Shared
  sleep: Sleep;
  "webhook.post": WebhookPost;

  // Containers
  "container.create": ContainerCreate;
  "container.reimage": ContainerReimage;
  "container.restart": ContainerRestart;
  "container.start": ContainerStart;
  "container.stop": ContainerStop;
  "container.delete": ContainerDelete;

  // Images
  "image.create": ImageCreate;
  "image.import": ImageImport;
  "images.prune": ImagePrune;

  // Environments
  "environment.create": EnvironmentCreate;
  "environment.start": EnvironmentStart;
  "environment.stop": EnvironmentStop;
  "environment.delete": EnvironmentDelete;

  // Stacks
  "stack.build.create": StackBuildCreate;
  "stack.build.generate": StackBuildGenerate;
};

/** ### `type AllActionKeys`
 * Type containing all the possible keys inside of the `AllActionsMap`
 * type. The keys inside the `AllActionsMap` type are all possible
 * actions currently available.
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
export type AllActionKeys = keyof AllActionsMap;

/** ### `interface FromStep`
 * The interface used to create the from object used inside of different
 * steps and the `ExistingResource` type.
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
export interface FromStep {
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
  /**
   * The identifier of the step being referenced
   */
  step: string;
}

/** `interface DetailsId`
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
 *  an error saying both from and id cannot be supplied
 */
interface DetailsFrom {
  id?: never;
  /**
   * When wanting to reference a resource created with any previous step use the
   * the from object.
   */
  from: FromStep;
}

/** ### `type ExistingResource`
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
export type ExistingResource = DetailsId | DetailsFrom;

/**************************** Non Cycle Resource ****************************/

/** ### `interface Sleep`
 * Used to create the typing for a sleep step. A sleep step allows for
 * what could also be considered a delay duration between other steps.
 */
export interface Sleep {
  /**
   * Total duration (seconds) to run this step for, before moving on to the
   * next step
   */
  seconds: number;
}

/** ### `interface WebhookPost`
 * Used to send data from a previous step to a post endpoint. The data will be
 * sent as `Content-Type: application/json`.
 */
export interface WebhookPost {
  /**
   * Post endpoint to hit
   */
  url: string;
  /**
   * The previous step to pull data from and send to the url endpoint
   */
  from: FromStep;
}

/**************************** Images ****************************/
export interface ImageCreate {
  source: ImageSource;
}

export interface ImageCreateSource {
  name: string;
  origin: Origin;
}

export type ImageImport = ExistingResource;

export interface ImagePrune {}

/**************************** Containers ****************************/
export interface ContainerCreate {
  name: string;
  environment: ExistingResource;
  image: ExistingResource;
  stateful: boolean;
  annotations: Record<string, any>;
  config: Config;
  volumes?: VolumeSummary[];
}

export type ContainerStart = ExistingResource;

export type ContainerStop = ExistingResource;

export type ContainerRestart = ExistingResource;

export type ContainerReimage = ExistingResource & {
  image: ExistingResource;
};

export type ContainerDelete = ExistingResource;

/**************************** Containers ****************************/
export interface EnvironmentCreate {
  name: string;
  about?: {
    description: string;
  };
  cluster: Cluster;
  features: {
    legacy_networking: boolean;
  };
  stack_build: ExistingResource;
}

export type EnvironmentStart = ExistingResource;

export type EnvironmentStop = ExistingResource;

export type EnvironmentDelete = ExistingResource;

/**************************** Stacks ****************************/
export interface StackBuildCreate {
  stack: ExistingResource;
  instructions: Instructions;
  about?: About;
}

export type StackBuildGenerate = ExistingResource;
