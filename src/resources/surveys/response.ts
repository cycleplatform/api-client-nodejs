import * as Request from "../../common/api/request";
// import { Resource, SingleDoc } from "../../common/structs";
import { links, StandardParams } from "../../common/api";
import { Resource, SingleDoc } from "common/structs";
export type Single = SingleDoc<Response>;

export interface Response extends Resource {
  survey_id: string;
  account_id: string;
  responses: Responses;
}

export type Responses = Record<string, Record<string, Record<string, string>>>;

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
