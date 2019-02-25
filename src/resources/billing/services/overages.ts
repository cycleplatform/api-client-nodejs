import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";
import { Term } from "../term";

export interface Overage {
  term: Term;
  ram: {
    gb_hours: number;
    cost: number;
  };
}

export async function getOverages(params: StandardParams) {
  return Request.getRequest<{ data: Overage }>({
    ...params,
    target: links
      .billing()
      .services()
      .overage(),
  });
}
