import * as Request from "../../common/api/request";
import { Events, Resource, SingleDoc } from "../../common/structs";
import { links, StandardParams } from "../../common/api";

export type ResponseSingle = SingleDoc<Response>;

export interface Response extends Resource {
  survey_id: string;
  identifier: string;
  account_id: string;
  events: Events;
  responses: Responses;
}

export type Responses = Record<string, Record<string, Record<string, string>>>;

export async function postResponse(
  params: StandardParams & {
    value: Response;
  },
) {
  return Request.postRequest<ResponseSingle>({
    ...params,
    target: links.surveys().single(params.value.survey_id),
  });
}
