import { testFetchUserAccount } from "./fetchAccount.test";
// import { testUpdateAccount } from "./UpdateAccount.test";
import { getSchema } from "../tjs";
import { AccessToken } from "../auth/token";

export function testAccounts() {
    const schema = getSchema("resources/accounts/Account.ts", "Account");

    describe("Account", () => {
        testFetchUserAccount(AccessToken, schema);
        // testUpdateAccount();
    });
}
