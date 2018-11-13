import { Container } from "./container";
import { TestContainer } from "./tests";

export interface Spec {
  name: string;
  version: string;
  description: string;
  containers: Record<string, Container>;
  tests: TestContainer[];
  annotations: Record<string, string>;
}
