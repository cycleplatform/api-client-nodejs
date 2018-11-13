import { assert } from "chai";
import { Billing } from "../../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../../TestStore";
import { getSchema } from "../../tjs";

interface TestParams {
  store: TestStore;
}

export function testFetchInvoices({ store }: TestParams) {
  let schema: TJS.Definition | null;
  before(() => {
    schema = getSchema("resources/billing/Invoice.ts", "Collection");
  });

  it("should fetch invoices", async () => {
    if (!schema) {
      throw new Error("Invoice schema not generated");
    }

    const { state: { token } } = store;

    const resp = await Billing.Invoices.getCollection({
      token,
      query: {},
      settings: {
        url: process.env.API_URL || "",
        project: process.env.PROJECT_ID || "",
      },
    });

    if (!resp.ok) {
      throw new Error(resp.error.title);
    }

    if (!resp.value.data) {
      throw new Error("data field is empty");
    }

    assert.isTrue(resp.ok);
    assert.jsonSchema(resp.value, schema);
  });
}
