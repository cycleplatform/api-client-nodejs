import { testFetchUserAccount } from "./fetchAccount.test";
// import { testUpdateAccount } from "./updateAccount.test";
import { getSchema } from "../tjs";
import { TestStore } from "../TestStore";

export function testAccounts(store: TestStore) {
  const schema = getSchema("resources/accounts/Account.ts", "Account");

  describe("Account", () => {
    testFetchUserAccount({ store, schema });
    // testUpdateAccount({ store, schema });
  });
}
