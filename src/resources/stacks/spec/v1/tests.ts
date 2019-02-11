import { Config } from "./config";
import { Image } from "./image";

export interface TestContainer {
  name: string;
  image: Image;
  config: TestConfig;
}

interface TestConfig {
  runtime: Config["runtime"];
  resources: Config["resources"];
}
