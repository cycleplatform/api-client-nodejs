import * as chai from "chai";
import * as jsonSchema from "chai-json-schema";
import { config } from "dotenv";
import { testAccount } from "./account/Account.test";
import { passwordGrant } from "./auth/PasswordGrant.test";
import { refreshGrant } from "./auth/RefreshGrant.test";
import { testProviders } from "./infrastructure/Providers.test";
import { testServers } from "./infrastructure/Servers.test";

chai.use(jsonSchema);

config({ path: "./config.env" });

passwordGrant();
refreshGrant();
testAccount();
testProviders();
testServers();
