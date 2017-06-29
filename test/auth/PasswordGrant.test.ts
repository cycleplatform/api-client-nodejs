import { assert } from "chai";
import { Auth } from "../../src/";
import { AccessToken } from "../common";
import { totp } from "speakeasy";

export function passwordGrant() {
    describe("OAuth Password Grant", () => {
        it("should fetch a token", async () => {
            const totpToken = totp({
                secret: process.env.TOTP_SECRET,
                encoding: "base32",
                // tslint:disable-next-line:no-bitwise
                time: (Date.now() / 1000) | 0, // specified in seconds
            });

            const resp = await Auth.passwordGrant(
                {
                    email: process.env.EMAIL,
                    password: process.env.PASSWORD,
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    totp_passcode: totpToken,
                },
                { url: process.env.AUTH_URL },
            );

            if (!resp.ok) {
                console.log(resp.error);
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.isString(resp.value.access_token);
            assert.isString(resp.value.refresh_token);
            assert.isNumber(resp.value.expires_in);
            assert.isString(resp.value.scope);
            assert.equal(resp.value.token_type, "bearer");

            AccessToken.access_token = resp.value.access_token;
            AccessToken.refresh_token = resp.value.refresh_token;
        });
    });
}
