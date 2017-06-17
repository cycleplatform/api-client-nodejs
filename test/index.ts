import * as chai from "chai";
import * as jsonSchema from "chai-json-schema";
import { config } from "dotenv";
import { testAccount } from "./account";
import { passwordGrant } from "./auth/PasswordGrant";
import { refreshGrant } from "./auth/RefreshGrant";

chai.use(jsonSchema);

config({ path: "./config.env" });

passwordGrant();
refreshGrant();
testAccount();
