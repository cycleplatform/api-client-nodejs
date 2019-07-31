import { postRequest } from "common/api/request";
import { links, StandardParams } from "common/api";
import { ResourceId, Task, CreatedTask } from "common/structs";

export type InvoiceAction = "pay";

export async function pay(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "pay",
    },
  });
}

export async function task(
  params: StandardParams & {
    id: ResourceId;
    value: Task<InvoiceAction>;
  },
) {
  return postRequest<CreatedTask<InvoiceAction>>({
    ...params,
    target: links
      .billing()
      .invoices()
      .tasks(params.id),
  });
}
