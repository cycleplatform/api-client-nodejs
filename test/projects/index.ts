import { testFetchProjectCapabilities } from "./fetchProjectCapabilities.test";
import { TestStore } from "../TestStore";

export function testProjects(store: TestStore) {
    describe("Projects", () => {
        testFetchProjectCapabilities(store);
    });
}
