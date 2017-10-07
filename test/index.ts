import * as chai from "chai";
import * as jsonSchema from "chai-json-schema";
import { config } from "dotenv";
import { TestStore } from "./TestStore";

chai.use(jsonSchema);
config({ path: "./config.env" });
const store = new TestStore();

// TESTS

import { testPasswordGrant } from "./auth/passwordGrant.test";
testPasswordGrant(store);

import { testAccounts } from "./account";
testAccounts(store);

import { testEnvironments } from "./environments";
testEnvironments(store);

import { testInfrastructure } from "./infrastructure";
testInfrastructure(store);
