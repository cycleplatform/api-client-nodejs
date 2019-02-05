import { Container } from "./container";
import { TestContainer } from "./tests";
import { Services } from "./services";

export interface Spec {
  version: string;
  about: About;
  tests: TestContainer[];
  services: Services;
  containers: Record<string, Container>;
  annotations: Record<string, string>;
}

export interface About {
  version: string;
  description: string;
}
