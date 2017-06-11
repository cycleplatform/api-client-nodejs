import { assert } from "chai";
import { Auth } from "../../src/";
import { AccessToken } from "../common";

export function passwordGrant() {
    describe("OAuth Password Grant", () => {
        it("should fetch a token", async () => {
            const resp = await Auth.passwordGrant({
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            }, { url: process.env.AUTH_URL });

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
