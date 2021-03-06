import { Container } from "./container";
import { TestContainer } from "./tests";
import { Services } from "./services";
import { ContainerIdentifier } from "../../../../common/structs";

export interface Spec {
  version: string;
  about?: About;
  tests?: TestContainer[];
  services?: Services | {};
  containers: Record<ContainerIdentifier, Container> | null;
  annotations?: Record<string, string>;
}

export interface About {
  version: string;
  description: string;
}
