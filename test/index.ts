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

// import { testEnvironments } from "./environments";
// testEnvironments(store);

// import { testInfrastructure } from "./infrastructure";
// testInfrastructure(store);

// import { testInvoices } from "./billing";
// testInvoices(store);

// import { testMethods } from "./billing";
// testMethods(store);

// import { testProjects } from "./projects";
// testProjects(store);

// import { testSuggestionPipeline } from "./pipeline";
// testSuggestionPipeline(store);
