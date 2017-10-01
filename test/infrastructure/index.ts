import { TestStore } from "../TestStore";
import { testFetchProviderDcs } from "./fetchProviderDcs.test";

export function testInfrastructure(store: TestStore) {
    describe("Infrastructure", () => {
        testFetchProviderDcs({ store });
    });
}
