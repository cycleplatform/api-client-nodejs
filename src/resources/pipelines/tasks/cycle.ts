import { ActionBase } from "./index";
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
  image: ActionBase;
};

export type Reimage = {
  image?: ActionBase;
  container?: ActionBase;
};

export type Create = {
  image?: NewImage;
  environment?: NewEnvironment;
  container?: NewContainer;
};

export type CreateImage = SpecImage;

export type Start = {
  container?: ActionBase;
  environment?: ActionBase;
};

export type Stop = {
  container?: ActionBase;
  environment?: ActionBase;
};

export type Clone = {
  container?: ActionBase;
  environment?: ActionBase;
};

export type Delete = {
  image?: ActionBase;
  container?: ActionBase;
  environment?: ActionBase;
};
