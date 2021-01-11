import { StageTaskActionBase } from "./index";
import { NewContainer } from "../../containers";
import { NewEnvironment } from "../../environments";
import { NewImage, SpecImage } from "../../images";

export type StageTasks = {
  create: Create;
  import: Import;
  start: Start;
  stop: Stop;
  delete: Delete;
  clone: Clone;
  reimage: Reimage;
};

export type Import = {
  image: StageTaskActionBase;
};

export type Reimage = {
  image?: StageTaskActionBase;
  container?: StageTaskActionBase;
};

export type Create = {
  image?: NewImage;
  environment?: NewEnvironment;
  container?: NewContainer;
};

export type CreateImage = SpecImage;

export type Start = {
  container?: StageTaskActionBase;
  environment?: StageTaskActionBase;
};

export type Stop = {
  container?: StageTaskActionBase;
  environment?: StageTaskActionBase;
};

export type Clone = {
  container?: StageTaskActionBase;
  environment?: StageTaskActionBase;
};

export type Delete = {
  image?: StageTaskActionBase;
  container?: StageTaskActionBase;
  environment?: StageTaskActionBase;
};
