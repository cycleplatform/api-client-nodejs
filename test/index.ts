import * as chai from "chai";
import * as jsonSchema from "chai-json-schema";
import { config } from "dotenv";
import { testPasswordGrant } from "./auth/passwordGrant.test";
import { testAccounts } from "./account";
import { testEnvironments } from "./environments";
import { TestStore } from "./TestStore";

chai.use(jsonSchema);

config({ path: "./config.env" });

const store = new TestStore();

testPasswordGrant(store);
testAccounts(store);
testEnvironments(store);

