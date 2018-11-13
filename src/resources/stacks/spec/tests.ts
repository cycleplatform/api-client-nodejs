import { Config } from "./config";
import { Image } from "./image";

export interface TestContainer {
  name: string;
  image: Image;
  config: Config;
}
