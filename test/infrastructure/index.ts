import { TestStore } from "../TestStore";
import { testFetchProviderDcs } from "./fetchProviderDcs.test";
import { testFetchServerTags } from "./fetchServerTags.test";

export function testInfrastructure(store: TestStore) {
    describe("Infrastructure", () => {
        testFetchProviderDcs({ store });
        testFetchServerTags({ store });
    });
}
