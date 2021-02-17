import { From } from "./shared-types";

/**
 * ### `interface Sleep`
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

/**
 * ### `interface WebhookPost`
 * Used to send data from a previous step to a post endpoint. The data will be
 * sent as `Content-Type: application/json`.
 */
export interface WebhookPost {
  /** Post endpoint to hit */
  url: string;
  /** The previous step to pull data from and send to the url endpoint */
  from: From;
}
