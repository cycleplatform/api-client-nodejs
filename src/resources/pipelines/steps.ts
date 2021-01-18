import { ResourceId } from "../../common/structs";
import { ImageSource } from "../../resources/images";

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
  | StepBase<"container.reimage">
  | StepBase<"container.restart">
  | StepBase<"container.start">
  | StepBase<"container.stop">
  | StepBase<"image.create">
  | StepBase<"image.import">
  | StepBase<"images.prune">
  | StepBase<"sleep">;

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

  // Images
  "image.create": ImageCreate;
  "image.import": ImageImport;
  "images.prune": ImagePrune;

  // Containers
  "container.reimage": ContainerReimage;
  "container.restart": ContainerRestart;
  "container.start": ContainerStart;
  "container.stop": ContainerStop;
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

// Images
export interface ImageCreate {
  name: string;
  source: ImageSource;
}

export type ImageImport = ExistingResource;

export interface ImagePrune {}

// Containers
export type ContainerStart = ExistingResource;

export type ContainerStop = ExistingResource;

export type ContainerRestart = ExistingResource;

export type ContainerReimage = ExistingResource & {
  image: ExistingResource;
};
