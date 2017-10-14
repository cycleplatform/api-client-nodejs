import { testFetchInvoices } from "./invoices";
import { testFetchMethods } from "./methods";
import { TestStore } from "../TestStore";

export function testInvoices(store: TestStore) {
    describe("Invoices", () => {
        testFetchInvoices({ store });
    });
}

export function testMethods(store: TestStore) {
    describe("Methods", () => {
        testFetchMethods({ store });
    });
}
