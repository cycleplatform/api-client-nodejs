import { BaseTask } from "./index";
import { NewContainer } from "../../../resources/containers";
import { NewEnvironment } from "../../../resources/environments";
import { NewImage, SpecImage } from "../../../resources/images";

export type Tasks = {
  create: Create;
  import: Import;
  start: Start;
  stop: Stop;
  delete: Delete;
  clone: Clone;
  reimage: Reimage;
};

export type Import = {
  image: BaseTask;
};

export type Reimage = {
  image?: BaseTask;
  container?: BaseTask;
};

export type Create = {
  image?: NewImage;
  environment?: NewEnvironment;
  container?: NewContainer;
};

export type CreateImage = SpecImage;

export type Start = {
  container?: BaseTask;
  environment?: BaseTask;
};

export type Stop = {
  container?: BaseTask;
  environment?: BaseTask;
};

export type Clone = {
  container?: BaseTask;
  environment?: BaseTask;
};

export type Delete = {
  image?: BaseTask;
  container?: BaseTask;
  environment?: BaseTask;
};
