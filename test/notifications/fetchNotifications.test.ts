import { assert } from "chai";
import { Notifications } from "../../src/";
import * as TJS from "typescript-json-schema";
import { TestStore } from "../TestStore";
import { getSchema } from "../tjs";

interface TestParams {
    store: TestStore;
}

export function testFetchNotifications({ store }: TestParams) {
    let schema: TJS.Definition | null;
    before(() => {
        schema = getSchema(
            "resources/notifications/Notification.ts",
            "Collection",
        );
    });

    it("should fetch notifications", async () => {
        if (!schema) {
            throw new Error("Notification schema not generated");
        }

        const { state: { token } } = store;

        const resp = await Notifications.getCollection({
            token,
            settings: {
                url: process.env.API_URL || "",
                project: process.env.PROJECT_ID || "",
            },
        });

        if (!resp.ok) {
            throw new Error(resp.error.title);
        }

        assert.isTrue(resp.ok);
        assert.jsonSchema(resp.value, schema);
    });
}
