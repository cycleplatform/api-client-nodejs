import * as Request from "../../common/api/request";
import { Resource, ResourceId, SingleDoc } from "../../common/structs";
import { links, StandardParams } from "../../common/api";
import { Response } from "./response";

export type SurveySingle = SingleDoc<Survey>;
export type SendResponseParams = Response;

export interface Survey extends Resource {
  hub_scoped: ResourceId;
  identifier: string;
  active: boolean;
  title: string;
  reward?: Reward;
  sections: Section[];
}

export interface Section {
  title: string;
  key: string;
  questions: Question[];
}

export interface Question {
  caption: string;
  key: string;
  default?: string;
  checkbox?: boolean;
  dropdown?: Record<string, string>;
  required?: boolean;
  conditional_questions?: Record<string, Question[]>;
}

export interface Reward {
  credit?: number;
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<SurveySingle>({
    ...params,
    target: links.surveys().single(params.id),
  });
}
