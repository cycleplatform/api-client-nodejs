import { getSchema } from "../tjs";
import { testCreateEnvironment } from "./createEnvironment.test";
import { testDeleteEnvironment} from "./deleteEnvironment.test";
import { TestStore } from "../TestStore";

export function testEnvironments(store: TestStore) {
    const schema = getSchema("resources/environments/Environment.ts", "Environment");
    const deletedSchema = getSchema("common/Structs.ts", "CreatedTask");
    describe("Environment", () => {
        testCreateEnvironment({store, schema});
        testDeleteEnvironment({store, schema: deletedSchema});
    });
}
