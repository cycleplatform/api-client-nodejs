import { testFetchNotifications } from "./fetchNotifications.test";
import { TestStore } from "../TestStore";

export function testNotifications(store: TestStore) {
    describe("Notifications", () => {
        testFetchNotifications({ store });
    });
}
