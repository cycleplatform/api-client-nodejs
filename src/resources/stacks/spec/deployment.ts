import { Tags } from "./tags";

export interface Deployment {
  required_secrets: string[];
  tags: Tags;
  instances: number;
}
