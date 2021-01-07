import { BaseAction } from "./index";
import { NewContainer } from "../../../resources/containers";
import { NewEnvironment } from "../../../resources/environments";
import { NewImage, SpecImage } from "../../../resources/images";

export type Actions = {
  create: Create;
  import: Import;
  start: Start;
  stop: Stop;
  delete: Delete;
  clone: Clone;
  reimage: Reimage;
};

export type Import = {
  image: BaseAction;
};

export type Reimage = {
  image?: BaseAction;
  container?: BaseAction;
};

export type Create = {
  image?: NewImage;
  environment?: NewEnvironment;
  container?: NewContainer;
};

export type CreateImage = SpecImage;

export type Start = {
  container?: BaseAction;
  environment?: BaseAction;
};

export type Stop = {
  container?: BaseAction;
  environment?: BaseAction;
};

export type Clone = {
  container?: BaseAction;
  environment?: BaseAction;
};

export type Delete = {
  image?: BaseAction;
  container?: BaseAction;
  environment?: BaseAction;
};
