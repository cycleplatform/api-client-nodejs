import { Image } from "./image";
import { Runtime } from "./runtime";
import { Resources } from "./resources";

export interface TestContainer {
  name: string;
  image: Image;
  config: TestConfig;
}

interface TestConfig {
  runtime: Runtime;
  resources: Resources;
}
