import { assert } from "chai";
import { Auth } from "../../src/";
import { AccessToken } from "../common";

export function refreshGrant() {
    describe("OAuth Refresh Token Grant", () => {
        it("should fetch and refresh a token", async () => {
            const resp = await Auth.refreshGrant(
                {
                    token: AccessToken,
                },
                { url: process.env.AUTH_URL },
            );

            if (!resp.ok) {
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.isString(resp.value.access_token);
            assert.isString(resp.value.refresh_token);
            assert.isNumber(resp.value.expires_in);
            assert.isString(resp.value.scope);
            assert.equal(resp.value.token_type, "bearer");

            AccessToken.access_token = resp.value.access_token;
        });
    });
}
