import { ResourceId, Cluster } from "../../common/structs";
import { ImageSource } from "../../resources/images";
import { Config } from "../containers/config";
import { VolumeSummary } from "../containers";

/**
 * We need to setup the steps this way due to the unpredictability of the k:v inside
 *  the details details object.
 *
 * By setting up steps in this way we can extract the correct details typing for each
 *  individual step based upon the value input into the action. Since we tell TS the
 *  action will always only ever be a keyof our mapped steps type, TS can correctly
 *  infer the data inside the object AFTER action has been supplied in the step object
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

  // Image
  | StepBase<"image.create">
  | StepBase<"image.import">
  | StepBase<"images.prune">

  // Environment
  | StepBase<"environment.create">
  | StepBase<"environment.start">
  | StepBase<"environment.stop">;

export interface StepBase<T extends AllActionKeys> {
  /**
   * Unique identifier used identify this step in a future steps from object
   */
  identifier?: string;
  action: T;
  details: AllActionsMap[T];
  options?: StepOptions;
}

export interface StepOptions {
  skip?: boolean;
}

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

  // Images
  "image.create": ImageCreate;
  "image.import": ImageImport;
  "images.prune": ImagePrune;

  // Environments
  "environment.create": EnvironmentCreate;
  "environment.start": EnvironmentStart;
  "environment.stop": EnvironmentStop;
};

export type AllActionKeys = keyof AllActionsMap;

/**
 * Need to set from to optional and never so if an id is supplied, then TS will throw
 *  an error saying both from and id cannot be supplied
 */
interface DetailsId {
  id: ResourceId;
  from?: never;
}

/**
 * Need to set id to optional and never so if an id is supplied, then TS will throw
 *  an error saying both from and id cannot be supplied
 */
interface DetailsFrom {
  id?: never;
  from: FromStep;
}

export interface FromStep {
  stage?: string;
  step: string;
}

/**
 * Meshed existing resource type which will allow for id or the from obj, but not both
 */
export type ExistingResource = DetailsId | DetailsFrom;

// Shared
export interface Sleep {
  seconds: number;
}

export interface WebhookPost {
  url: string;
  from: FromStep;
}

// Images
export interface ImageCreate {
  name: string;
  source: ImageSource;
}

export type ImageImport = ExistingResource;

export interface ImagePrune {}

// Containers
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

// Environments
export interface EnvironmentCreate {
  name: string;
  about: {
    description: string;
  };
  features: {
    legacy_networking: boolean;
  };
  stack_build: ExistingResource;
}

export type EnvironmentStart = ExistingResource;

export type EnvironmentStop = ExistingResource;
