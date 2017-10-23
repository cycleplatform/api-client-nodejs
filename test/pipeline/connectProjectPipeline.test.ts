import { SuggestionPipeline } from "../../src/";
import { TestStore } from "../TestStore";

interface TestParams {
    store: TestStore;
}

export function connectProjectPipeline({ store }: TestParams) {
    it("should connect to project pipeline", async () => {
        const { state: { token } } = store;

        const resp = await SuggestionPipeline.Project.connectToProjectPipeline({
            token,
            settings: store.state.settings,
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }
    });
}
