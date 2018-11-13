import { assert } from "chai";
import { Infrastructure } from "../../src/";
import { TestStore } from "../TestStore";

interface TestParams {
  store: TestStore;
}

export function testFetchServerTags({ store }: TestParams) {
  it("should fetch a list of infrastructure tags", async () => {
    const { token } = store.state;

    const resp = await Infrastructure.Servers.getTags({
      token,
      query: {},
      settings: store.state.settings,
    });

    if (!resp.ok) {
      throw new Error(resp.error.title);
    }

    assert.isTrue(resp.ok);
    assert.isArray(resp.value.data);
  });
}
