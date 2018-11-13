import { assert } from "chai";
import { Account } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";

interface TestParams {
  store: TestStore;
  schema: TJS.Definition | null;
}

export function testUpdateAccount({ store, schema }: TestParams) {
  it("should update account name and revert it back", async () => {
    const { token } = store.state;
    const originalResp = await Account.getSingle({
      token,
      settings: { url: process.env.API_URL },
    });

    if (!originalResp.ok) {
      throw new Error(originalResp.error.title);
    }

    if (!originalResp.value.data) {
      throw new Error("data field is null");
    }

    const value = {
      name: {
        first: "Mike",
        last: "Wizowsky",
      },
    };

    const resp = await Account.update({
      token,
      value,
      query: {},
      settings: { url: process.env.API_URL },
    });

    if (!resp.ok) {
      throw new Error(resp.error.title);
    }

    assert.isTrue(resp.ok);
    assert.jsonSchema(resp.value.data, schema);
    assert.deepPropertyVal(resp.value.data, "name", {
      first: "Mike",
      last: "Wizowsky",
    });

    const revertUpdate = { name: originalResp.value.data.name };
    const revertResp = await Account.update({
      token,
      query: {},
      value: revertUpdate,
      settings: { url: process.env.API_URL },
    });

    if (!revertResp.ok) {
      throw new Error(revertResp.error.title);
    }

    assert.deepPropertyVal(revertResp.value.data, "name", revertUpdate.name);
  });
}
