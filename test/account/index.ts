// import { assert } from "chai";
import { Account } from "../../src/";
import { AccessToken } from "../common";

export function testAccount() {
    describe("Account", () => {
        it("should fetch user account", async () => {
            const resp = await Account.getSingle(AccessToken, {}, {url: process.env.API_URL});
            console.log(resp);
        });
    });
}
