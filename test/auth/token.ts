import { Token } from "../../src/auth";
export const AccessToken: Token = {
    access_token: process.env.TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    expires_in: 0,
    scope: "",
    created: 0,
    token_type: "bearer",
};
