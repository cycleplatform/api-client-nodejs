import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { Resource, ResourceId, SingleDoc } from "../../common/structs";
export type Single = SingleDoc<Response>;

export interface Response extends Resource {
  survey_id: string;
  account_id: string;
  responses: Responses;
}

export type Responses = Record<string, ResponseSection>;

export type ResponseSection = {
  answers: Record<string, ResponseAnswer>;
};

export type ResponseAnswer = {
  value: string;
  extra: Record<string, string>;
};

export type postResponseParams = {
  survey_id: string;
  account_id: string;
  responses: Responses;
};

export async function postResponse(
  params: StandardParams & {
    value: Response;
  },
) {
  return Request.postRequest<Response>({
    ...params,
    target: links.surveys().single(params.value.survey_id),
  });
}

export async function getResponse(
  params: StandardParams & {
    survey_id: ResourceId;
  },
) {
  return Request.getRequest<Response>({
    ...params,
    target: links.surveys().response(params.survey_id),
  });
}
