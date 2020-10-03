import * as Request from "../../common/api/request";
// import { Resource, SingleDoc } from "../../common/structs";
import { links, StandardParams } from "../../common/api";

export interface Response {
  survey_id: string;
  account_id: string;
  responses: Responses;
}

export type Responses = Record<string, Record<string, Record<string, string>>>;

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
