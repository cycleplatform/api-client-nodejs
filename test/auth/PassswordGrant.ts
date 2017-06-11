import { Auth } from "../../src/";
import { expect } from "chai";

describe("Hello function", () => {
    it("should return hello world", async () => {
        const resp = await Auth.passwordGrant({
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        }, {url: process.env.AUTH_URL});

        console.log(resp);
        
        const result = "Hello World!";
        expect(result).to.equal("Hello World!");
    });
});
