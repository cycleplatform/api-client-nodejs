import * as chai from "chai";
import * as jsonSchema from "chai-json-schema";
import { config } from "dotenv";
import { testAccount } from "./account";
import { passwordGrant } from "./auth/PasswordGrant";

chai.use(jsonSchema);

config({path: "./config.env"});

passwordGrant();
testAccount();
