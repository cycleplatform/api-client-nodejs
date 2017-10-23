import { connectProjectPipeline } from "./connectProjectPipeline.test";
import { TestStore } from "../TestStore";

export function testSuggestionPipeline(store: TestStore) {
    describe("Suggestion Pipeline", () => {
        connectProjectPipeline({ store });
    });
}
