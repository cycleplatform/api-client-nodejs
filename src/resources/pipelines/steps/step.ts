import * as Other from "./other";
import * as Container from "./container";
import * as Image from "./image";
import * as Stack from "./stack";
import * as Environment from "./environment";
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
  | StepBase<"image.source.create">
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
  /** Unique identifier used identify this step in a future steps from object */
  identifier?: string;
  /**
   * The action this step this step should be. Can be any of the the possible
   * actions returned from @type AllActionKeys
   */
  action: T;
  /** Details for the the given action which is set for the action key */
  details: AllActionsMap[T];
  /** Options associated with a given step */
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
  // Other
  sleep: Other.Sleep;
  "webhook.post": Other.WebhookPost;

  // Containers
  "container.create": Container.Create;
  "container.reimage": Container.Reimage;
  "container.restart": Container.Restart;
  "container.start": Container.Start;
  "container.stop": Container.Stop;
  "container.delete": Container.Delete;

  // Images
  "image.source.create": Image.Source.Create;
  "image.create": Image.Create;
  "image.import": Image.Import;
  "images.prune": Image.Prune;

  // Environments
  "environment.create": Environment.Create;
  "environment.start": Environment.Start;
  "environment.stop": Environment.Stop;
  "environment.delete": Environment.Delete;

  // Stacks
  "stack.build.create": Stack.Build.Create;
  "stack.build.generate": Stack.Build.Generate;
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
