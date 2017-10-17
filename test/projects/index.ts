import { testFetchProjectCapabilities } from "./fetchProjectCapabilities.test";

export function testProjects() {
    describe("Projects", () => {
        testFetchProjectCapabilities();
    });
}
