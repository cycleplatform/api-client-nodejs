import { assert } from "chai";
import { Auth } from "../../src/";
import { totp } from "speakeasy";
import { getSchema } from "../tjs";
import { TestStore } from "../TestStore";

export function testPasswordGrant(store: TestStore) {
    let schema: any;
    describe("OAuth Password Grant", () => {
        before(() => {
            schema = getSchema("auth/token.ts", "Token");
        });

        it("should fetch a token", async () => {
            const totpToken = totp({
                secret: process.env.TOTP_SECRET,
                encoding: "base32",
                // tslint:disable-next-line:no-bitwise
                time: (Date.now() / 1000) | 0, // specified in seconds
            });

            const resp = await Auth.passwordGrant(
                {
                    email: process.env.EMAIL || "",
                    password: process.env.PASSWORD || "",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    totp_passcode: totpToken,
                },
                {
                    url: process.env.AUTH_URL,
                    noVersion: true,
                    useHttp: store.state.settings.useHttp,
                },
            );

            if (!resp.ok) {
                throw new Error(resp.error.title);
            }

            assert.isTrue(resp.ok);
            assert.jsonSchema(resp.value, schema);

            // use this token for subsequent requests
            store.updateToken(resp.value);
        });
    });
}
