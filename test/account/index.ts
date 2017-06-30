import { testFetchUserAccount } from "./FetchAccount.test";
import { testUpdateAccount } from "./UpdateAccount.test";

export function testAccount() {
    describe("Account", () => {
        testFetchUserAccount();
        testUpdateAccount();
    });
}
