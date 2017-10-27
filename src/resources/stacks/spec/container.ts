import { Image } from "./image";
import { Config } from "./config";

export interface Container {
    name: string;
    image: Image;
    config: Config;
}
