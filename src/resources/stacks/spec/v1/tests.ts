import { Config } from "./config";
import { SpecImage } from "./image";

export interface TestContainer {
  name: string;
  image: SpecImage;
  config: TestConfig;
}

interface TestConfig {
  runtime: Config["runtime"];
  resources: Config["resources"];
}
